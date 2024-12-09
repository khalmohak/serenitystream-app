import React, { useState } from 'react';
import { View } from 'react-native';
import { useAppTheme } from '../../constants/theme';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { Input } from '@/components/base/Input';
import { Button } from '@/components/base/Button';
import { Layout } from '@/components/base/Layout';

 const LoginScreen: React.FC = () => {
  const theme = useAppTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <Layout
      
    >
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          onBlur={() => validateEmail(email)}
          error={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={
            <Mail
              size={20}
              color={emailError ? theme.colors.danger : theme.colors.textLight}
            />
          }
        />
  
        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          leftIcon={
            <Lock
              size={20}
              color={theme.colors.textLight}
            />
          }
          rightIcon={
            showPassword ? (
              <EyeOff
                size={20}
                color={theme.colors.textLight}
              />
            ) : (
              <Eye
                size={20}
                color={theme.colors.textLight}
              />
            )
          }
          onPressRightIcon={() => setShowPassword(!showPassword)}
          helper="Must be at least 8 characters"
        />
  
        <Button 
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => console.log('Login pressed')}
        >
          Login
        </Button>
    </Layout>
  );
};
 
export default LoginScreen;