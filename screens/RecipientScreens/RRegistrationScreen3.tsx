import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, TouchableWithoutFeedback  } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");
//malaysia business registration types
const registrationTypes = [
  { label: "Company Registration Number Old", value: "company_old" },
  { label: "Business Registration Number Old", value: "business_old" },
  { label: "Company Registration Number New", value: "company_new" },
  { label: "Business Registration Number New", value: "business_new" },
  { label: "LLP Registration Number", value: "llp" },
];

const RRegistrationScreen3 = ({ navigation }) => {
  const [businessType, setBusinessType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [brn, setBrn] = useState(""); //Business registration type
  const [address, setAddress] = useState("");
  const [ic,setIC] = useState("");


  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Names-Partner</Text>
      <Text style={styles.subtitle}>Enter your company profile</Text>

      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={registrationTypes}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Your Registration Type" : "..."}
        searchPlaceholder="Search..."
        value={businessType}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setBusinessType(item.value);
          setIsFocus(false);
        }}
      />

      <TextInput
        label="Business Register Number"
        mode="outlined"
        value={brn}
        onChangeText={setBrn}
        style={styles.input}
      />

      <TextInput
        label="Registered Address"
        mode="outlined"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
          label={
            businessType === "company_old" || businessType === "company_new"
              ? "Director IC Number"
              : businessType === "business_old" || businessType === "business_new"
              ? "Owner IC Number"
              : "Partner IC Number"
          }
          mode="outlined"
          value={ic}
          onChangeText={(text) => {
              setIC(text.replace(/[^0-9]/g, ""));
          }}
          keyboardType="numeric"
          maxLength={12}
          style={[styles.input, !businessType && { backgroundColor: "#f0f0f0" }]}
          disabled={!businessType}
        />
      <Text style={styles.helperText}>
          {businessType === "company_old" || businessType === "company_new"
            ? "One of the directors"
            : businessType === "business_old" || businessType === "business_new"
            ? ""
            : "One of the partners"}
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("")}
        style={styles.nextButton}
      >
        Submit
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
  nextButton: {
    width: "50%",
    maxWidth: 400,
    marginTop: 40,
  },
  helperText: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    color: "#020af2",
    fontSize: width*0.04,
    marginTop: -10,
  },
});

export default RRegistrationScreen3;