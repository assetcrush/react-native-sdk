import React from 'react';
import { StyleSheet } from 'react-native';
import { ImageCrush, setKey } from './lib';

// replace test-key with your assetcrush key
setKey('test-key');

export default function App() {
  return (
    <ImageCrush
      source={{
        uri: 'https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159__340.jpg'
      }}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: { width: 300, height: 300 },
});
