import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions, ImageSourcePropType, StyleProp, ViewStyle, TextStyle, ImageStyle } from "react-native";

const { width } = Dimensions.get("window");

const BUTTON_WIDTH = width * 0.4;
const BUTTON_HEIGHT = BUTTON_WIDTH * 1.2;
const IMAGE_SIZE = BUTTON_WIDTH * 0.6;

interface ImageButtonProps {
  imageSource: ImageSourcePropType;
  label: string;
  isSelected: boolean;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const ImageButton: React.FC<ImageButtonProps> = ({ 
  imageSource, 
  label, 
  isSelected, 
  onPress, 
  buttonStyle, 
  textStyle, 
  imageStyle 
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, isSelected && styles.selectedButton]}
      onPress={onPress}
    >
      <Image source={imageSource} style={[styles.image, imageStyle]} />
      <Text style={[styles.label, textStyle, isSelected && styles.selectedLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   button: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#f0f1f5",
  },
  selectedButton: {
    backgroundColor: "#d3d3d3",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    color: "#000000",
  },
  selectedLabel: {
    color: "green",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: "contain",
  },
  });

export default ImageButton;
