import { Text, TouchableOpacity } from "react-native";
import React, { useCallback, useRef } from "react";

export const ErrorRender = ({
  handleRetry = () => { },
  icon: Icon,
  height,
}) => {

  const handler = useRef();

  const _handleRetry = useCallback(() => {
    clearTimeout(handler.current);

    handler.current = setTimeout(handleRetry, 300);
  }, [handleRetry]);

  return (
    <TouchableOpacity onPress={_handleRetry}>
      {Icon ||
        <Text style={{ fontSize: height / 2 < 50 ? height / 2 : 50 }}>🔄</Text>}
    </TouchableOpacity>
  );
};
