import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const theme = useTheme();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    theme: 'light',
    language: 'en'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        if (response.data.data.settings) {
          setSettings(response.data.data.settings);
        }
      } catch (error) {
        // setError('Failed to load settings');
      }
    };

    fetchSettings();
  }, []);

  const handleNotificationChange = (type) => (event) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: event.target.checked
      }
    }));
  };

  const handleThemeChange = (event) => {
    setSettings(prev => ({
      ...prev,
      theme: event.target.value
    }));
  };

  const handleLanguageChange = (event) => {
    setSettings(prev => ({
      ...prev,
      language: event.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put('/api/users/settings', settings);
      setUser(prev => ({
        ...prev,
        settings: response.data.data
      }));
      setSuccess('Settings updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Application Settings
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.email}
                      onChange={handleNotificationChange('email')}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.push}
                      onChange={handleNotificationChange('push')}
                    />
                  }
                  label="Push Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.sms}
                      onChange={handleNotificationChange('sms')}
                    />
                  }
                  label="SMS Notifications"
                />
              </FormGroup>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Appearance
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={settings.theme}
                  label="Theme"
                  onChange={handleThemeChange}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Language
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.language}
                  label="Language"
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                  <MenuItem value="hi">Hindi</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Save Settings'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings; 