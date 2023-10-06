import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useError = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      Alert.alert("Alert", error, [
        { text: "Ok", onPress: () => setError("") },
      ]);
    }
  }, [error]);

  return setError;
};
