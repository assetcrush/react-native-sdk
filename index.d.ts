
import React from 'react';
import { ImageProps } from 'react-native';

export interface ImageCrushProps extends ImageProps {
}

declare const ImageCrush: React.FC<ImageCrushProps>;

export interface setKeyInterface {
  key: string
}

declare const setKey: setKeyInterface

export {
  ImageCrush,
  setKey
};
