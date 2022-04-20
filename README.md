![NPM License](https://img.shields.io/npm/l/@assetcrush/react-native-sdk) ![NPM Version](https://img.shields.io/npm/v/@assetcrush/react-native-sdk)

# assetcrush

A simple react-native library to resize image on fly.

## What is assetcrush ?

[assetcrush](https://assetcrush.com/) is an image resize service for on the fly dynamic resize. If
your users are uploading images of various sizes and then you are
consuming those images on different devices then this service is ideal
for your use. Since every device has different dimensions our sdk will
make sure to get the rightly resized image for you via assetcrush resize
service.

## Getting started

[https://assetcrush.com/en/docs/getting-started](https://assetcrush.com/en/docs/getting-started)

### Installation

```
npm i @assetcrush/react-native-sdk --save
```

or with yarn

```
yarn add @assetcrush/react-native-sdk
```

### Usage

```javascript
import React from "react";
import { StyleSheet } from "react-native";
import { ImageCrush, setKey } from '@assetcrush/react-native-sdk';

// replace test-key with your assetcrush key
setKey("test-key");

export default function App() {
  return (
    <ImageCrush
      source={{
        uri: "https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159__340.jpg"
      }}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: { width: 300, height: 300 },
});
```

## Props

| Prop     | Type     | Required | Note                                         |
| -------- | -------- | -------- | -------------------------------------------- |
| `source` | `object` | yes      | source object should contain uri             |
| `style`  | `object` | no       | style object                                 |
| `spinnerIcon`  | `element` | no       | Custom Reactative element for loading                                 |
| `reloadIcon`  | `element` | no       | Custom Reactative element for retry                                 |
| `spinnerColor`  | `string` | no       | Custom color for loading                                 |
| `hideSpinner`  | `bool` | no       | Show or hide loading                                 |
| `onError`  | `func` | no       | If image fails to load                                 |
| `onLoad`  | `func` | no       | When image loads successfully                                 |
| `acEnv`  | `string` | no       | Envoirment of the compoent                                 |

Any additional props are passed down to underlying `<Image />` element.

# Run example

```
git clone https://github.com/assetcrush/react-native-sdk.git
cd react-native-sdk/example
yarn install # or npm install

# to run with npm
npm start

# to run with yarn
yarn start
```

## Seeing issues or any feedback or feature suggest ?

Create an [issue](https://github.com/assetcrush/react-native-sdk.git/issues) with github.
