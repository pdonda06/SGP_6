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
  IconButton,
} from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';

const ForgotPasswordScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Call the password reset API
      await axios.post(`${process.env.API_URL}/api/auth/forgot-password`, {
        email,
      });

      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send reset instructions');
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
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />

        <Surface style={[styles.surface, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Reset Password
          </Text>

          {!success ? (
            <>
              <Text style={[styles.description, { color: theme.colors.text }]}>
                Enter your email address and we'll send you instructions to reset your
                password.
              </Text>

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

              {error ? (
                <HelperText type="error" visible={!!error}>
                  {error}
                </HelperText>
              ) : null}

              <Button
                mode="contained"
                onPress={handleResetPassword}
                loading={loading}
                disabled={loading}
                style={styles.button}
              >
                Send Reset Instructions
              </Button>
            </>
          ) : (
            <>
              <View style={styles.successContainer}>
                <IconButton
                  icon="check-circle"
                  size={64}
                  color={theme.colors.success}
                />
                <Text style={[styles.successTitle, { color: theme.colors.success }]}>
                  Check Your Email
                </Text>
                <Text style={[styles.successText, { color: theme.colors.text }]}>
                  We've sent password reset instructions to your email address.
                </Text>
              </View>

              <Button
                mode="contained"
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
              >
                Back to Login
              </Button>
            </>
          )}
        </Surface>
      </ScrollView>
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
  backButton: {
    marginBottom: 16,
  },
  surface: {
    padding: 20,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
    padding: 4,
  },
  successContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  successText: {
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default ForgotPasswordScreen; 