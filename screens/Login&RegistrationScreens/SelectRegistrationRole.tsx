import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import ImageButton from "./ImageButton.tsx";

const { width, height } = Dimensions.get("window");

const SelectRegistrationRole = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Names-Partner</Text>
      <Text style={styles.subtitle}>You are ?</Text>

      <View style={styles.buttonContainer}>
        <ImageButton
          imageSource={require("../assets/client.png")}
          label="Client"
          isSelected={selectedRole === "Client"}
          onPress={() => setSelectedRole("Client")}
        />
        <ImageButton
          imageSource={require("../assets/recycleFacility.png")}
          label="Organization"
          isSelected={selectedRole === "Organization"}
          onPress={() => setSelectedRole("Organization")}
        />
      </View>

      <Button mode="contained" onPress={() => navigation.navigate(selectedRole === "Client" ? "ClientRegistration" : "OrganizationRegistration")} style={styles.nextButton} disabled={!selectedRole}>
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
     marginBottom: height * 0.07,
   },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
  },

  nextButton: {
    width: "50%",
    maxWidth: 400,
    marginTop: height * 0.04,
  },
});

export default SelectRegistrationRole;