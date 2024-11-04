import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

const CustomShow = ({ visible, img, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.alertContainer}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${img}` }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    width: 300,
    height: 400,
    backgroundColor: "#262529",
    borderRadius: 10,
    alignItems: "center",
  },
  alertMessage: {
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  lineContainer: {
    width: 301,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 0,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#302F35",
  },
  okButtonText: {
    color: "white",
  },
});

export default CustomShow;
