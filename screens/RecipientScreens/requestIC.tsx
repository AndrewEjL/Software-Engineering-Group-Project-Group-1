import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.8; // 80% of screen width
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.6; // Maintain aspect ratio

const RequestIC = ({ navigation }) => {
  const [frontIC, setFrontIC] = useState(null);
  const [backIC, setBackIC] = useState(null);

  const handleCapture = async (setIC) => {
    ImagePicker.launchCamera(
      { mediaType: "photo", cameraType: "back" },
      (response) => {
        if (!response.didCancel && response.assets) {
          setIC(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Upload Your IC</Text>
      <Text style={styles.subtitle}>Please take photos of both sides of your IC</Text>
      <Image source={require("../assets/backIC.png")} style={styles.exampleIC} />
      <Image source={require("../assets/frontIC.jpg")} style={styles.exampleIC} />
      <Text style={styles.helperText}>Example IC</Text>

      <TouchableOpacity onPress={() => handleCapture(setFrontIC)} style={styles.captureBox}>
        {frontIC ? <Image source={{ uri: frontIC }} style={styles.icImage} /> : <Text>Capture Front Side</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleCapture(setBackIC)} style={styles.captureBox}>
        {backIC ? <Image source={{ uri: backIC }} style={styles.icImage} /> : <Text>Capture Back Side</Text>}
      </TouchableOpacity>

      <Button mode="contained" onPress={() => navigation.navigate("NextPage")} disabled={!frontIC || !backIC}>
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color:"black",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  exampleIC: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: "contain",
    marginBottom: 10,
  },
  helperText: {
    color: "#d18100",
    marginBottom: 20,
  },
  captureBox: {
    width: IMAGE_WIDTH*0.9,
    height: IMAGE_HEIGHT*0.9,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeaea",
    marginBottom: 15,
  },
  icImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default RequestIC;



