import React, { memo, useCallback, useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { ErrorRender } from "./components/ErrorRender";
import { getKey } from "./key";

const ImageResize = ({
  animated = true,
  reloadIconColor,
  reloadIcon,
  spinnerIcon,
  spinnerColor = "#fff",
  hideSpinner = false,
  onError = () => null,
  onLoad = () => null,
  url,
  acEnv = "production",
  alt = '',
  source,
  errorIcon,
  ...props
}) => {
  const [width, setWidth] = useState(0);
  const [height, setheight] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [componentKey, setComponentKey] = useState(0)
  const key = getKey();

  const handleError = (e) => {
    onError(e);
    setIsError(true);
    setIsLoading(false);
  };

  const handleOnLoad = (e) => {
    onLoad();
    setIsError(false);
    setIsLoading(false);
  };

  const handleLoad = () => setIsLoading(true);

  const newSource = {
    ...source,
    headers: { ...source?.headers, "assetcrush-key": key, "ac-env": acEnv },
  };

  const handleRetry = () => setComponentKey(componentKey + 1);

  const imageUrl =
    width > 0 && height > 0 && newSource.uri
      ? `https://service.assetcrush.com?width=${width || "auto"}&height=${height || "auto"
      }&original_uri=${encodeURIComponent(newSource.uri)}`
      : "";

  const onLayout =
    (e) => {
      setWidth(e.nativeEvent.layout.width);
      setheight(e.nativeEvent.layout.height);
    }


  return (
    <>
      <Image
        key={componentKey}
        onLoadStart={handleLoad}
        onLayout={onLayout}
        source={{ ...newSource, uri: imageUrl }}
        onError={handleError}
        onLoad={handleOnLoad}
        {...props}
      />
      {isLoading &&
        <View style={{ position: 'absolute' }}>
          {reloadIcon ||
            <ActivityIndicator color={reloadIconColor} size={"large"} />}
        </View>
      }
      {isError &&
        <View style={{ position: 'absolute' }}>
          <ErrorRender
            width={width}
            height={height}
            icon={errorIcon}
            handleRetry={handleRetry}
          />
        </View>
      }
    </>
  );
};

export default memo(ImageResize);
