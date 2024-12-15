import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react-native";
import { useAuth } from "@/src/contexts/AuthContext";
import { Container, FullHeight, Layout } from "@/src/components/base/Layout";
import { Text } from "@/src/components/base/CustomText";
import { Input } from "@/src/components/base/Input";
import { Button } from "@/src/components/base/Button";
import { showToast } from "@/src/constants/toastMessage";
import { Link, router, useNavigation } from "expo-router";
import { useAppTheme } from "../constants/theme";

const LoginScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("mohakgofficial@gmail.com");
  const [password, setPassword] = useState("Mohakgupta02#");
  const [emailError, setEmailError] = useState("");
  const theme = useAppTheme();
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
    try {
      await signIn(email, password);
      showToast({
        title: "Successfully Logged In",
        message: "",
      });

      router.push("/(app)/(tabs)");
    } catch (err) {
      console.log(err);
      showToast({
        type: "error",
        title: "Error logging you in",
        message: "",
      });
    }
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
      <Text style={{ marginBottom: theme.spacing.base, textAlign: "center" }}>
        New here?{" "}
        <Link
          href={"/register"}
          style={{
            color: theme.colors.accent,
            textDecorationLine: "underline",
          }}
        >
          Register
        </Link>
      </Text>
      <Button variant="primary" size="lg" fullWidth onPress={handleSignIn}>
        Login
      </Button>
    </Layout>
  );
};

export default LoginScreen;
