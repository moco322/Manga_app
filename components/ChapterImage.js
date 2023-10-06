import { memo } from "react";
import { StyleSheet } from "react-native";

import { AutoScaleImage } from "./common/AutoScaleImage";
import { WIDTH } from "../styles";

const ChapterImage = ({ uri, referer }) => {
  const headers = {
    Referer: referer,
  };

  return <AutoScaleImage uri={uri} headers={headers} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: WIDTH,
    resizeMode: "contain",
  },
});

export default memo(ChapterImage);
