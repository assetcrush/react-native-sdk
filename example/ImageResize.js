import React, { memo, useCallback, useState } from "react";
import { Image } from "react-native";
import { getKey } from "./key";

const ImageResize = ({ source, ...props }) => {
  const [width, setWidth] = useState(0);
  const [height, setheight] = useState(0);
  const key = getKey();

  const newSource = { ...source, headers: { ...source?.headers, key } };

  const imageUrl =
    width > 0 && height > 0 && newSource.uri
      ? `https://service.assetcrush.com?width=${width || "auto"}&height=${
          height || "auto"
        }&original_uri=${newSource.uri}`
      : "";

  const onLayout = useCallback((e) => {
    props?.onLayout?.(e);

    setWidth(e.nativeEvent.layout.width);
    setheight(e.nativeEvent.layout.height);
  }, []);

  console.log({ ...newSource, uri: imageUrl });

  return (
    <Image
      onLayout={onLayout}
      source={{ ...newSource, uri: imageUrl }}
      {...props}
    />
  );
};

export default memo(ImageResize);
