import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  Surface,
  Text,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  List,
  Avatar,
  Button,
} from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const response = await axios.get(`${process.env.API_URL}/api/dashboard`, {
        params: {
          role: user.role,
          region: user.region,
        },
      });
      setDashboardData(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
        <Button mode="contained" onPress={fetchDashboardData}>
          Retry
        </Button>
      </View>
    );
  }

  const renderSuperAdminDashboard = () => (
    <>
      <Card style={styles.card}>
        <Card.Content>
          <Title>System Overview</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.totalHospitals}</Text>
              <Text style={styles.statLabel}>Hospitals</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.totalDepartments}</Text>
              <Text style={styles.statLabel}>Departments</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.activeSchemes}</Text>
              <Text style={styles.statLabel}>Active Schemes</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Performance Metrics</Title>
          <LineChart
            data={dashboardData.performanceData}
            width={Dimensions.get('window').width - 48}
            height={220}
            chartConfig={{
              backgroundColor: theme.colors.surface,
              backgroundGradientFrom: theme.colors.surface,
              backgroundGradientTo: theme.colors.surface,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => theme.colors.text,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Recent Activities</Title>
          <List.Section>
            {dashboardData.recentActivities.map((activity, index) => (
              <List.Item
                key={index}
                title={activity.title}
                description={activity.description}
                left={props => (
                  <Avatar.Icon
                    {...props}
                    icon={activity.icon}
                    backgroundColor={theme.colors.primary}
                  />
                )}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>
    </>
  );

  const renderHospitalAdminDashboard = () => (
    <>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Hospital Statistics</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.totalPatients}</Text>
              <Text style={styles.statLabel}>Patients</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.occupancyRate}%</Text>
              <Text style={styles.statLabel}>Occupancy</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dashboardData.activeStaff}</Text>
              <Text style={styles.statLabel}>Staff</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Department Performance</Title>
          <BarChart
            data={dashboardData.departmentData}
            width={Dimensions.get('window').width - 48}
            height={220}
            chartConfig={{
              backgroundColor: theme.colors.surface,
              backgroundGradientFrom: theme.colors.surface,
              backgroundGradientTo: theme.colors.surface,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => theme.colors.text,
            }}
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Active Health Schemes</Title>
          <List.Section>
            {dashboardData.activeSchemes.map((scheme, index) => (
              <List.Item
                key={index}
                title={scheme.name}
                description={`Beneficiaries: ${scheme.beneficiaries}`}
                left={props => (
                  <List.Icon {...props} icon="heart-pulse" />
                )}
                right={props => (
                  <Text style={{ color: theme.colors.primary }}>
                    {scheme.status}
                  </Text>
                )}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>
    </>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.colors.primary }]}>
          Welcome back,
        </Text>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {user.name}
        </Text>
      </View>

      {user.role === 'super_admin'
        ? renderSuperAdminDashboard()
        : renderHospitalAdminDashboard()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    marginBottom: 16,
    textAlign: 'center',
  },
  header: {
    padding: 16,
  },
  greeting: {
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  card: {
    margin: 8,
    elevation: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default HomeScreen; 