import React, { useState } from 'react';
import { Text } from 'react-native';
import { useAppTheme } from '../constants/theme';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { Input } from '@/components/base/Input';
import { Button } from '@/components/base/Button';
import { Layout } from '@/components/base/Layout';
import { useAuth } from '@/contexts/AuthContext';

 const LoginScreen: React.FC = () => {
  const theme = useAppTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('mohakgofficial@gmail.com');
  const [password, setPassword] = useState('Password1234#');
  const [emailError, setEmailError] = useState('');
  const { signIn, isAuthenticated , user} = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };
  
  const handleSignIn = async ()=>{
    console.log("logging in")
     await signIn(email, password)
  }

  return (
    <Layout
      
    >
      {
        isAuthenticated ? <Text>LoggedIN</Text> : <Text>{JSON.stringify(user)}</Text>
      }
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
          onPress={handleSignIn}
        >
          Login
        </Button>
    </Layout>
  );
};
 
export default LoginScreen;