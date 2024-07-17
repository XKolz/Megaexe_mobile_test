import React from "react";
import { Pressable, Text } from "react-native";

const CustomButton = ({ onPress, title }) => (
  <Pressable
    onPress={onPress}
    style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#4425F5",
      borderRadius: 20,
      padding: 16,
      marginBottom: 10,
    }}
  >
    <Text style={{ color: "white", fontSize: 18 }}>{title}</Text>
  </Pressable>
);

export default CustomButton;
