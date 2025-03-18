import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface,
  HelperText,
  Divider,
  List,
  Portal,
  Dialog,
  RadioButton,
} from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const roles = [
  { label: 'Hospital Admin', value: 'hospital_admin' },
  { label: 'Department User', value: 'department_user' },
  { label: 'District Admin', value: 'district_admin' },
  { label: 'Sub-district Admin', value: 'sub_district_admin' },
  { label: 'State Admin', value: 'state_admin' },
];

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [region, setRegion] = useState({
    state: '',
    district: '',
    subDistrict: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [showRoleDialog, setShowRoleDialog] = useState(false);

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword || !role) {
      setError('Please fill in all required fields');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');

      const userData = {
        name,
        email,
        password,
        role,
        region,
      };

      await register(userData);
      navigation.replace('MainApp');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Surface style={[styles.surface, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Create Account
          </Text>

          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={secureTextEntry}
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? 'eye' : 'eye-off'}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
          />

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            secureTextEntry={secureTextEntry}
            style={styles.input}
            left={<TextInput.Icon icon="lock-check" />}
          />

          <List.Item
            title="Select Role"
            description={role ? roles.find(r => r.value === role)?.label : 'Required'}
            left={props => <List.Icon {...props} icon="account-cog" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => setShowRoleDialog(true)}
            style={styles.roleSelector}
          />

          {role === 'state_admin' && (
            <TextInput
              label="State"
              value={region.state}
              onChangeText={text => setRegion({ ...region, state: text })}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="map-marker" />}
            />
          )}

          {(role === 'district_admin' || role === 'sub_district_admin') && (
            <>
              <TextInput
                label="State"
                value={region.state}
                onChangeText={text => setRegion({ ...region, state: text })}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="map-marker" />}
              />
              <TextInput
                label="District"
                value={region.district}
                onChangeText={text => setRegion({ ...region, district: text })}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="map-marker" />}
              />
            </>
          )}

          {role === 'sub_district_admin' && (
            <TextInput
              label="Sub-district"
              value={region.subDistrict}
              onChangeText={text => setRegion({ ...region, subDistrict: text })}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="map-marker" />}
            />
          )}

          {error ? (
            <HelperText type="error" visible={!!error}>
              {error}
            </HelperText>
          ) : null}

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Register
          </Button>

          <View style={styles.loginContainer}>
            <Text style={{ color: theme.colors.text }}>Already have an account? </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.textButton}
            >
              Login
            </Button>
          </View>
        </Surface>
      </ScrollView>

      <Portal>
        <Dialog visible={showRoleDialog} onDismiss={() => setShowRoleDialog(false)}>
          <Dialog.Title>Select Role</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={value => {
              setRole(value);
              setShowRoleDialog(false);
            }} value={role}>
              {roles.map(({ label, value }) => (
                <RadioButton.Item
                  key={value}
                  label={label}
                  value={value}
                  style={styles.radioItem}
                />
              ))}
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  surface: {
    padding: 20,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  roleSelector: {
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
    padding: 4,
  },
  textButton: {
    marginVertical: 4,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  radioItem: {
    paddingVertical: 8,
  },
});

export default RegisterScreen; 