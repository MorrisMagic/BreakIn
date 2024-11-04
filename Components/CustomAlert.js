import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertMessage}>{message}</Text>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <Pressable onPress={onClose}>
              <Text style={styles.okButtonText}>OK</Text>
            </Pressable>
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
    padding: 20,
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

export default CustomAlert;
