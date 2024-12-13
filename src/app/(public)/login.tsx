import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react-native";
import { useAuth } from "@/src/contexts/AuthContext";
import { useAppTheme } from "@/src/constants/theme";
import { Container, FullHeight, Layout } from "@/src/components/base/Layout";
import { Text } from "@/src/components/base/CustomText";
import { Input } from "@/src/components/base/Input";
import { Button } from "@/src/components/base/Button";
import { View } from "react-native";

const LoginScreen: React.FC = () => {
  const theme = useAppTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("mohakgofficial@gmail.com");
  const [password, setPassword] = useState("Password1234#");
  const [emailError, setEmailError] = useState("");
  const { signIn, isAuthenticated, user } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSignIn = async () => {
    console.log("logging in");
    await signIn(email, password);
  };

  return (
    <Layout scroll={false} safe={true}>
      <Text
        variant="4xl"
        align="center"
        weight="bold"
        color={theme.colors.primary}
      >
        Login
      </Text>
      <FullHeight>
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
          leftIcon={<Lock size={20} color={theme.colors.textLight} />}
          rightIcon={
            showPassword ? (
              <EyeOff size={20} color={theme.colors.textLight} />
            ) : (
              <Eye size={20} color={theme.colors.textLight} />
            )
          }
          onPressRightIcon={() => setShowPassword(!showPassword)}
          helper="Must be at least 8 characters"
        />
      </FullHeight>
      <Button variant="primary" size="lg" fullWidth onPress={handleSignIn}>
        Login
      </Button>
    </Layout>
  );
};

export default LoginScreen;
