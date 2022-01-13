import React, { memo, useEffect, useState } from "react";
import { Image } from "react-native";
import { getKey } from "./key";

const ImageResize = ({ url, width, height, ...props }) => {
  const [image, setImage] = useState("");
  const key = getKey();

  const imageUrl = `https://service.assetcrush.com?width=${
    width || "auto"
  }&height=${height || "auto"}&original_uri=${url}`;

  useEffect(() => {
    fetch(imageUrl, { headers: { key } })
      .then((r) => r.blob())
      .then((d) => {
        setImage(window.URL.createObjectURL(d));
      });
  }, []);

  return (
    <Image
      source={{ uri: url }}
      style={{ width: width || "100%", height: height || "100%" }}
      {...props}
    />
  );
};

export default memo(ImageResize);
