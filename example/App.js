import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ImageResize from "./ImageResize";
import { setKey } from "./key";

// replace test-key with your assetcrush key
setKey("1234");

export default function App() {
  return (
    <View style={styles.container}>
      <ImageResize
        source={{
          uri: "https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159__340.jpg",
        }}
        style={styles.image}
        reloadIconColor={'red'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: 300, height: 300 },
});
