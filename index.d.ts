
import React from 'react';
import { ImageProps } from 'react-native';

export interface ImageCrushProps extends ImageProps {
}

declare const ImageCrush: React.FC<ImageCrushProps>;

declare const setKey: (key: string) => void;

export {
  ImageCrush,
  setKey
};
