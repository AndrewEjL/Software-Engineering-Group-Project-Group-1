import React, { useState } from "react";
import { View, Text, StyleSheet , Dimensions} from "react-native";
import { TextInput, Button} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";


const { width, height } = Dimensions.get("window");

const OrgRegistrationScreen2 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handlePhoneInput = (text) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setPhoneNumber(numericText);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Names-Partner</Text>
      <Text style={styles.subtitle}>Sign up with a company and select your role.</Text>

      <TextInput
        label="Company Email Address"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Company Phone Number"
        mode="outlined"
        value={`+60${phoneNumber}`}
        onChangeText={(text) => {
          if (text.startsWith("+60")) {
            handlePhoneInput(text.slice(3)); //
          }
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Set Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? "eye-off" : "eye"}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />}
        style={styles.input}
      />
      <TextInput
        label="Set Confirm Password"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!isConfirmPasswordVisible}
        right={
          <TextInput.Icon
            icon={isConfirmPasswordVisible ? "eye-off" : "eye"}
            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          />}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => navigation.navigate("CompanyInformationRequest")} style={styles.nextButton}>
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
     flex: 1,
     width: "100%",
     justifyContent: "flex-start",
     alignItems: "center",
     backgroundColor: "#f8f9fa",
     paddingTop: height * 0.01,
   },
   title: {
     fontSize: width * 0.07,
     fontWeight: "bold",
     marginBottom: height * 0.08,
     color: "#0a0a0a",
   },
   subtitle: {
     fontSize: width * 0.05,
     fontWeight: "bold",
     color: "#555",
     width: "80%",
     textAlign: "center",
     marginBottom: height * 0.07,
   },
  input: {
    width: "80%",
    maxWidth: 450,
    backgroundColor: "white",
    marginBottom: height * 0.02,
  },
  nextButton: {
    width: "50%",
    maxWidth: 400,
    marginTop: height * 0.04,
  },


});

export default OrgRegistrationScreen2;