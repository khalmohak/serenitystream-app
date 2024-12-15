import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  User,
  Calendar,
  Tag,
  Globe,
  Check,
} from "lucide-react-native";
import { useAuth } from "@/src/contexts/AuthContext";
import { Container, FullHeight, Layout } from "@/src/components/base/Layout";
import { Text } from "@/src/components/base/CustomText";
import { Input } from "@/src/components/base/Input";
import { Button } from "@/src/components/base/Button";
import { showToast } from "@/src/constants/toastMessage";
import { Link, router } from "expo-router";
import { useAppTheme } from "../constants/theme";
import CountryPicker from "react-native-country-picker-modal";
import { MultiSelect } from "react-native-element-dropdown";
import ProgressBar from "../components/base/ProgressBar";
import { Feather } from "@expo/vector-icons";

const interestTags = [
  { label: "Yoga", value: "yoga", icon: "activity" }, // Feather/Lucide: Activity
  { label: "Meditation", value: "meditation", icon: "headphones" }, // Feather: Headphones
  { label: "Therapy", value: "therapy", icon: "heart" }, // Feather/Lucide: Heart
  { label: "Mindfulness", value: "mindfulness", icon: "sun" }, // Feather/Lucide: Sun
  { label: "Relaxation", value: "relaxation", icon: "cloud" }, // Feather: Cloud
  { label: "Breathing Exercises", value: "breathing", icon: "wind" }, // Lucide: Wind
  { label: "Nature Sounds", value: "nature_sounds", icon: "feather" }, // Feather/Lucide: Feather
  { label: "Self-Care", value: "self_care", icon: "smile" }, // Feather/Lucide: Smile
  { label: "Sleep", value: "sleep", icon: "moon" }, // Feather: Moon
  { label: "Stress Relief", value: "stress_relief", icon: "zap" }, // Feather: Zap
];

const RegisterScreen: React.FC = () => {
  const theme = useAppTheme();
  const { signUp } = useAuth();

  // Step 1 State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  // Step 2 State
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Step 3 State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Step 4 State
  const [birthYear, setBirthYear] = useState("");

  // Step 5 State
  const [interests, setInterests] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Registration Flow State
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const CustomCheckbox = ({
    checked,
    onPress,
  }: {
    checked: boolean;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 24,
          height: 24,
          borderWidth: 2,
          borderColor: theme.colors.primary,
          backgroundColor: checked ? theme.colors.primary : "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {checked && <Check color="white" size={16} />}
      </TouchableOpacity>
    );
  };

  const validatePhoneNumber = () => {
    return phoneNumber.length > 8; // Basic validation
  };

  const validateOTP = () => {
    return otp.length === 6; // Assuming 6-digit OTP
  };

  const validateNames = () => {
    return firstName.trim().length > 1 && lastName.trim().length > 1;
  };

  const validateBirthYear = () => {
    const year = parseInt(birthYear);
    return year > 1900 && year < new Date().getFullYear() - 13;
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendOTP = async () => {
    if (!validatePhoneNumber()) {
      showToast({
        type: "error",
        title: "Invalid Phone Number",
        message: "Please enter a valid phone number",
      });
      return;
    }

    try {
      setOtpSent(true);
      showToast({
        title: "OTP Sent",
        message: "Check your phone for the OTP",
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "OTP Send Failed",
        message: "Unable to send OTP",
      });
    }
  };

  const handleVerifyOTP = () => {
    if (!validateOTP()) {
      showToast({
        type: "error",
        title: "Invalid OTP",
        message: "Please enter a valid 6-digit OTP",
      });
      return;
    }
  };

  const handleNextStep = () => {
    switch (currentStep) {
      case 1:
        if (handleSendOTP()) {
          setCurrentStep(2);
        }
        break;
      case 2:
        handleVerifyOTP();
        setCurrentStep(3);

        break;
      case 3:
        if (!validateNames()) {
          showToast({
            type: "error",
            title: "Invalid Name",
            message:
              "Please enter valid first and last names (at least 2 characters)",
          });
          return;
        }
        if (!validateEmail(email)) {
          showToast({
            type: "error",
            title: "Invalid Email",
            message: "Please enter a valid email address",
          });
          return;
        }
        setCurrentStep(4);
        break;
      case 4:
        if (!validateBirthYear()) {
          showToast({
            type: "error",
            title: "Invalid Birth Year",
            message: "Please enter a valid birth year (13+ years old)",
          });
          return;
        }
        setCurrentStep(5);
        break;
      case 5:
        handleFinalSubmit();
        break;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => setCountryPickerVisible(true)}
                style={{
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  padding: 10,
                  borderRadius: theme.borderRadius.base,
                  marginBottom: theme.spacing.base,
                  width: "100%",
                }}
              >
                <Text>{countryCode ? countryCode : "Select a country"}</Text>
              </TouchableOpacity>
              <Input
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                leftIcon={<Phone color={theme.colors.icon} />}
                containerStyle={{ flex: 1 }}
                maxLength={10}
              />
            </View>

            {countryPickerVisible && (
              //@ts-ignore
              <CountryPicker
                withCallingCode
                withFilter
                visible={countryPickerVisible}
                onSelect={(country) => {
                  setCountryCode(`+${country.callingCode[0]}`);
                  setCountryPickerVisible(false);
                }}
                onClose={() => setCountryPickerVisible(false)}
              />
            )}
          </>
        );

      case 2:
        return (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {otpSent && (
                <Input
                  value={otp}
                  onChangeText={setOtp}
                  placeholder="Enter OTP"
                  keyboardType="numeric"
                  leftIcon={<Lock color={theme.colors.icon} />}
                  maxLength={6}
                />
              )}
            </View>
          </>
        );

      case 3:
        return (
          <>
            <Input
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
              leftIcon={<User color={theme.colors.icon} />}
            />

            <Input
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
              leftIcon={<User color={theme.colors.icon} />}
              containerStyle={{ marginTop: theme.spacing.xs }}
            />

            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              keyboardType="email-address"
              leftIcon={<Mail color={theme.colors.icon} />}
              containerStyle={{ marginTop: theme.spacing.xs }}
            />
          </>
        );

      case 4:
        return (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Input
              value={birthYear}
              onChangeText={setBirthYear}
              placeholder="Birth Year"
              keyboardType="numeric"
              leftIcon={<Calendar color={theme.colors.icon} />}
              maxLength={4}
            />
          </View>
        );

      case 5:
        return (
          <>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              Select Up to 5 Interests
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {interestTags.map((interest) => {
                return (
                  <TouchableOpacity
                    key={interest.value}
                    onPress={() => toggleInterest(interest.value)}
                    style={{
                      backgroundColor: interests.includes(interest.value)
                        ? theme.colors.primary
                        : theme.colors.background,
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      borderRadius: 10,
                      padding: 10,
                      width: "30%",
                      alignItems: "center",
                      marginBottom: 10,
                      justifyContent: "center",
                    }}
                  >
                    <Feather
                      //@ts-ignore
                      name={interest.icon}
                      size={24}
                      color={
                        interests.includes(interest.value)
                          ? "white"
                          : theme.colors.text
                      }
                    />
                    <Text
                      style={{
                        color: interests.includes(interest.value)
                          ? "white"
                          : theme.colors.text,
                        marginTop: 5,
                      }}
                    >
                      {interest.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        );
    }
  };

  const handleFinalSubmit = async () => {
    if (interests.length === 0) {
      showToast({
        type: "error",
        title: "Interests Required",
        message: "Please select at least one interest",
      });
      return;
    }

    if (!agreedToTerms) {
      showToast({
        type: "error",
        title: "Terms Not Agreed",
        message: "Please agree to the terms and services",
      });
      return;
    }

    try {
      await signUp({
        firstName,
        lastName,
        email,
        countryCode,
        phoneNumber,
        // interests,
        role: "student",
      });

      showToast({
        title: "Registration Successful",
        message: "Welcome aboard!",
      });

      router.push("/(app)/(tabs)");
    } catch (error) {
      showToast({
        type: "error",
        title: "Registration Failed",
        message: "Unable to complete registration",
      });
    }
  };

  const toggleInterest = (value: string) => {
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : prev.length < 5
          ? [...prev, value]
          : prev,
    );
  };

  const getTitles = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return "Verify Your Phone";
      case 2:
        return "Confirm OTP";
      case 3:
        return "Personal Details";
      case 4:
        return "Your Birth Year";
      case 5:
        return "Select Your Interests";
    }
  };

  const getSubTitles = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return "Enter your phone number to get started";
      case 2:
        return "Enter the 6-digit code sent to your phone";
      case 3:
        return "Help us personalize your experience";
      case 4:
        return "We use this to provide age-appropriate content";
      case 5:
        return "Select up to 5 interests to personalize your feed";
    }
  };

  const getButtonTitle = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return "Send OTP";
      case 2:
        return "Verify OTP";
      case 3:
        return "Continue";
      case 4:
        return "Next";
      default:
        return "Complete Registration";
    }
  };

  return (
    <Layout safe scroll>
      <FullHeight
        definedUnderLayout
        style={{
          flexGrow: 1,
          justifyContent: "space-between",
          paddingTop: 40,
        }}
      >
        <ProgressBar
          width="50%"
          currentStep={currentStep}
          totalSteps={totalSteps}
          onBackPress={currentStep > 1 ? () => {} : undefined}
          withBackButton
        />

        <Container style={{ flex: 1, marginTop: theme.spacing.xl }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            {getTitles(currentStep)}
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {getSubTitles(currentStep)}
          </Text>

          {renderStep()}
        </Container>
        {currentStep === 4 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginBottom: theme.spacing.base,
            }}
          >
            <CustomCheckbox
              checked={agreedToTerms}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            />
            <Text style={{ marginLeft: theme.spacing.base }}>
              By checking this box, I agree to Serernity Stream's{" "}
              <Link
                href={"/"}
                style={{
                  color: theme.colors.accent,
                  textDecorationLine: "underline",
                }}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href={"/"}
                style={{
                  color: theme.colors.accent,
                  textDecorationLine: "underline",
                }}
              >
                Privacy Policy
              </Link>
            </Text>
          </View>
        )}

        {currentStep === 1 && (
          <Text style={{ marginBottom: theme.spacing.base }}>
            Already Registered?{" "}
            <Link
              href={"/login"}
              style={{
                color: theme.colors.accent,
                textDecorationLine: "underline",
              }}
            >
              Login
            </Link>
          </Text>
        )}

        <Button onPress={handleNextStep} style={{ width: "100%" }}>
          {getButtonTitle(currentStep)}
        </Button>
      </FullHeight>
    </Layout>
  );
};

export default RegisterScreen;
