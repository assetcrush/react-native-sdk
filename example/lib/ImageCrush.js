import React, { memo, useCallback, useState } from 'react';
import { Image, ImagePropTypes } from 'react-native';
import { getKey } from './key';

const ImageCrush = (props) => {
  const [width, setWidth] = useState(0);
  const [height, setheight] = useState(0);

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
        ['assetcrush-key']: getKey()
      },
      uri: width && height && props.source?.uri
        ? `https://service.assetcrush.com?width=${width}&height=${height}&original_uri=${encodeURIComponent(props.source.uri)}`
        : undefined
    }
  }

  return (
    <Image
      {...props}
      onLayout={onLayout}
      source={newSource || props.source}
    />
  );
};

ImageCrush.propTypes = ImagePropTypes;

export default memo(ImageCrush);
