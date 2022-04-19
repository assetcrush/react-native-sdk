import React, { memo, useCallback, useState } from 'react';
import { ActivityIndicator, Image, ImagePropTypes, View } from 'react-native';
import { ErrorRender } from '../components/ErrorRender';
import { getKey } from './key';

const ImageCrush = (props) => {

  const {
    reloadIcon,
    spinnerIcon,
    spinnerColor = 'gray',
    hideSpinner = false,
    onError = () => null,
    onLoad = () => null,
    acEnv = "production",
  } = props
  const [width, setWidth] = useState(0);
  const [height, setheight] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [componentKey, setComponentKey] = useState(0)


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

  const handleRetry = () => setComponentKey(componentKey + 1);

  const onLayout = useCallback((e) => {
    props?.onLayout?.(e);
    setWidth(e.nativeEvent.layout.width);
    setheight(e.nativeEvent.layout.height);
  }, [setWidth, setheight]);

  let newSource = undefined;
  if (props.source?.uri) {
    newSource = {
      ...props.source,
      headers: {
        ...(props.source?.headers || {}),
        ['assetcrush-key']: getKey(),
        ['ac-env']: acEnv
      },
      uri: width && height && props.source?.uri
        ? `https://service.assetcrush.com?width=${width}&height=${height}&original_uri=${encodeURIComponent(props.source.uri)}`
        : undefined
    }
  }

  return (
    <>
      <Image
        {...props}
        onLayout={onLayout}
        source={newSource || props.source}
        key={componentKey}
        onLoadStart={handleLoad}
        onError={handleError}
        onLoad={handleOnLoad}
      />
      {isLoading && !hideSpinner &&
        <View style={{ position: 'absolute' }}>
          {spinnerIcon ||
            <ActivityIndicator color={spinnerColor} size={"large"} />}
        </View>
      }
      {isError &&
        <View style={{ position: 'absolute' }}>
          <ErrorRender
            width={width}
            height={height}
            icon={reloadIcon}
            handleRetry={handleRetry}
          />
        </View>
      }
    </>
  );
};

ImageCrush.propTypes = ImagePropTypes;

export default memo(ImageCrush);
