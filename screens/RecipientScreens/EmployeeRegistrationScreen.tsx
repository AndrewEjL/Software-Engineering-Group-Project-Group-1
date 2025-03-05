import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { TextInput, Button, HelperText} from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");// Get the device screen size
//dummy data for recipient companies
const companies = [
  { name: 'Kualiti Alam', id: '1' },
  { name: 'ECO eWaste Solutions', id: '2' },
  { name: 'Meriahtek (M) Sdn Bhd', id: '3' },
  { name: 'Safe & Clean Disposal', id: '4' },
  { name: 'Ewaste Recycling Malaysia', id: '5' },
  { name: 'Pentas Flora', id: '6' },
  { name: '3R Quest', id: '7' },
  { name: 'Reclaimtek (M) Sdn Bhd', id: '8' },
];


const EmployeeRegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [company, setCompany] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [passKey,setPassKey] = useState("")

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App name-Partner</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={companies}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder={!isFocus ? 'Select Your Company' : '...'}
        searchPlaceholder="Search... "
        value={company}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCompany(item.id);
          setIsFocus(false);
        }}
      />
       <TextInput
         label="Organization passkey"
         mode="outlined"
         value={passKey}
         onChangeText={setPassKey}
         style={styles.passkeyInput}
       />
      <HelperText type="info" visible={true} style={styles.helperText}>
        Get your passkey from your organization admin.
      </HelperText>
      <TextInput
        label="Email Address"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isVisible}
        right={
          <TextInput.Icon
            icon={isVisible ? "eye-off" : "eye"}
            onPress={() => setIsVisible(!isVisible)}
          />}
        style={styles.input}
      />

      <Button mode="contained" onPress={() => console.log("Login")} style={styles.loginButton}>
        Submit Registration
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
    marginTop: height * 0.08,
    marginBottom: height * 0.08,
    color: "#0a0a0a",
  },

  dropdown: {
    height: height * 0.06,
    width: "80%",
    borderColor: "#0a0a0a",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginBottom: height * 0.03,
  },
  itemTextStyle: {
    color: "#000",
    fontSize: width*0.04,
  },
  placeholderStyle: {
    color: "#161717",
    fontSize: width * 0.04,
  },
  selectedTextStyle: {
    color: "#2645f0",
    fontSize: width * 0.04,
  },
  inputSearchStyle: {
    color: "#000",
    fontSize: 14,
  },
  input: {
    width: "80%",
    maxWidth: 450,
    backgroundColor: "white",
    marginBottom: height * 0.02,
  },
  passkeyInput: {
      width: "80%",
      maxWidth: 450,
      backgroundColor: "white",
  },
  loginButton: {
    width: "60%",
    maxWidth: 400,
    marginTop: height * 0.04,
  },

  helperText: {
    fontSize:   width*0.03,
    alignSelf: "flex-start",
    paddingHorizontal:width*0.1,
    marginBottom : width*0.02,
  },
});

export default EmployeeRegistrationScreen;