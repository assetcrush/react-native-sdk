import React from "react";
import ImageResize from "./ImageResize";

export default function App() {
  return (
    <ImageResize
      source={{
        uri: "https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159__340.jpg",
      }}
      style={{ width: 300, height: 300 }}
    />
  );
}
