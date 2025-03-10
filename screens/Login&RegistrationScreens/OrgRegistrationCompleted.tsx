import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet,Dimensions } from "react-native";
import { CommonActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const OrgRegistrationCompleted = ({ navigation }) => {
    const handleClose = () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton}  onPress={handleClose}>
        <Text style={styles.closeText}>✖</Text>
      </TouchableOpacity>

      <Image source={require("../assets/verification.jpg")} style={styles.image} />

      <Text style={styles.text}>
        We are verifying your registration.{"\n"}
        You will receive the result via email within 5 business days.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: width*0.1,
  },
  closeButton: {
    position: "absolute",
    top: height*0.05,
    left: width*0.05,
  },
  closeText: {
    fontSize: width*0.08,
    color: "black",
  },
  image: {
    width: width*0.8,
    height: width*0.7,
    resizeMode: "contain",
    marginBottom: height*0.03,
  },
  text: {
    fontSize: width*0.05,
    textAlign: "center",
    color: "black",
  },
});

export default OrgRegistrationCompleted ;


