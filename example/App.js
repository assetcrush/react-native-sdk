import React from "react";
import ImageCrush from "./ImageCrush";
import { setKey } from "./key";

export default function App() {
  setKey("2345");

  return (
    <ImageCrush
      source={{
        uri: "https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159__340.jpg",
        headers: { auth: "test-auth" },
      }}
      style={{ width: 300, height: 300 }}
    />
  );
}
