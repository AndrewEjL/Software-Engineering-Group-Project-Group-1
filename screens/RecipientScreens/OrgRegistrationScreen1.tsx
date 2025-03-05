import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import ImageButton from "./ImageButton.tsx";

const { width, height } = Dimensions.get("window");

const OrgRegistrationScreen1 = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Names-Partner</Text>
      <Text style={styles.subtitle}>Choose the role you want to register as</Text>

      <View style={styles.buttonContainer}>
        <ImageButton
          imageSource={require("../assets/collector.png")}
          label="Collector"
          isSelected={selectedRole === "Collector"}
          onPress={() => setSelectedRole("Collector")}
        />
        <ImageButton
          imageSource={require("../assets/recycleFacility.png")}
          label="Recycle Facility"
          isSelected={selectedRole === "Recycle Facility"}
          onPress={() => setSelectedRole("Recycle Facility")}
        />
      </View>

      <Button mode="contained" onPress={() => navigation.navigate("RecipientSignUp")} style={styles.nextButton}>
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

export default OrgRegistrationScreen1;