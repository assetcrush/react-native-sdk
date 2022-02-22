import React from "react";
import { StyleSheet } from "react-native";
import ImageCrush from "./ImageCrush";
import { setKey } from "./key";

// replace test-key with your assetcrush key
setKey("test-key");

export default function App() {
  return (
    <ImageCrush
      source={{
        uri: "https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159__340.jpg",
        headers: { auth: "test-auth" },
      }}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: { width: 300, height: 300 },
});
