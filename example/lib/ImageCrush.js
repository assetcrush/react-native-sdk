import React, { memo, useCallback, useRef, useState } from "react";
import { ActivityIndicator, Image, ImagePropTypes, View } from "react-native";
import { ErrorRender } from "../components/ErrorRender";
import { getKey } from "./key";

const ImageCrush = ({
  reloadIcon,
  spinnerIcon,
  spinnerColor = "gray",
  hideSpinner = false,
  onError = () => null,
  onLoad = () => null,
  acEnv = "production",
  ...props
}) => {
  const [width, setWidth] = useState(0);
  const [height, setheight] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [componentKey, setComponentKey] = useState(0);
  const handler = useRef();

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

  const handleRetry = () => {
    setComponentKey(componentKey + 1);
    setIsLoading(true);
  };

  const _onLayout = useCallback(
    (e) => {
      const layoutWidth = e?.nativeEvent?.layout?.width || 0;
      const layoutHeight = e?.nativeEvent?.layout?.height || 0;

      clearTimeout(handler.current);

      handler.current = setTimeout(() => {
        props?.onLayout?.(e);
        setWidth(
          width === 0 ? layoutWidth : width > layoutWidth ? layoutWidth : width
        );
        setheight(
          height === 0
            ? layoutHeight
            : height > layoutHeight
            ? layoutHeight
            : height
        );
      }, 300);
    },
    [setWidth, setheight]
  );

  let newSource = undefined;
  if (props.source?.uri) {
    newSource = {
      ...props.source,
      headers: {
        ...(props.source?.headers || {}),
        ["assetcrush-key"]: getKey(),
        ["ac-env"]: acEnv,
      },
      uri:
        width && height && props.source?.uri
          ? `https://service.assetcrush.com?width=${width}&height=${height}&original_uri=${encodeURIComponent(
              props.source.uri
            )}`
          : undefined,
    };
  }

  return (
    <>
      <Image
        {...props}
        onLayout={_onLayout}
        source={newSource || props.source}
        key={componentKey}
        onError={handleError}
        onLoad={handleOnLoad}
      />
      {isLoading && !hideSpinner && (
        <View style={{ position: "absolute", alignSelf: "center" }}>
          {spinnerIcon || (
            <ActivityIndicator color={spinnerColor} size={width > 100 ? "large" : "small"} />
          )}
        </View>
      )}
      {isError && (
        <View style={{ position: "absolute", alignSelf: "center" }}>
          <ErrorRender
            width={width}
            height={height}
            icon={reloadIcon}
            handleRetry={handleRetry}
          />
        </View>
      )}
    </>
  );
};

ImageCrush.propTypes = ImagePropTypes;

export default memo(ImageCrush);
