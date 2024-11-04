import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomAlert from "../Components/CustomAlert";
import { SafeAreaView } from "react-native-safe-area-context";

const More = ({ route, navigation }) => {
  const { img, deleteImage } = route.params;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const saveImage = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.status !== "granted") {
        setAlertMessage("Permission to access media library is required!");
        setAlertVisible(true);
        return;
      }

      const filename = `${FileSystem.documentDirectory}image_${Date.now()}.jpg`;
      await FileSystem.writeAsStringAsync(filename, img, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const asset = await MediaLibrary.createAssetAsync(filename);
      setAlertMessage(`Image Saved to: ${asset.uri}`);
      setAlertVisible(true);
    } catch (error) {
      console.error("Error saving image:", error);
      setAlertMessage("Failed to save image");
      setAlertVisible(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="download" size={24} color="red" onPress={saveImage} />
        <AntDesign
          name="delete"
          size={24}
          color="red"
          onPress={() => {
            deleteImage();
            navigation.goBack();
          }}
        />
      </View>
      <Image
        source={{ uri: `data:image/jpeg;base64,${img}` }}
        style={styles.image}
        resizeMode="contain"
      />
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </SafeAreaView>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    width: "100%",
    padding: 1,
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
});
