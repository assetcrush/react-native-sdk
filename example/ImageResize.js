import React, { memo, useCallback, useState } from "react";
import { Image } from "react-native";
import { getKey } from "./key";

const ImageResize = ({ source, ...props }) => {
  const [width, setWidth] = useState(0);
  const [height, setheight] = useState(0);
  const key = getKey();

  const imageUrl =
    width > 0 && height > 0
      ? `https://service.assetcrush.com?width=${width || "auto"}&height=${
          height || "auto"
        }&original_uri=${source.uri}`
      : "";

  const onLayout = useCallback((e) => {
    props?.onLayout?.(e);

    setWidth(e.nativeEvent.layout.width);
    setheight(e.nativeEvent.layout.height);
  }, []);

  return (
    <Image
      onLayout={onLayout}
      source={{ uri: imageUrl, headers: { key } }}
      {...props}
    />
  );
};

export default memo(ImageResize);
