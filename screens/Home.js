import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

export default function App({ navigation }) {
  const [images, setImages] = useState([]);

  // Load images from AsyncStorage when the app starts
  useEffect(() => {
    const loadImages = async () => {
      const storedImages = await AsyncStorage.getItem("userImages");
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      }
    };
    loadImages();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      const base64String = result.assets[0].base64;
      console.log(base64String);
      const newImage = { id: uuid.v4(), base64: base64String };
      const updatedImages = [newImage, ...images]; // Prepend new image
      setImages(updatedImages);
      await AsyncStorage.setItem("userImages", JSON.stringify(updatedImages));
    }
  };

  const deleteImage = async (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    await AsyncStorage.setItem("userImages", JSON.stringify(updatedImages));
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.imageWrapper}
      onPress={() =>
        navigation.navigate("More", {
          img: item.base64,
          id: item.id,
          deleteImage: () => deleteImage(item.id),
        })
      }
    >
      <Image
        source={{ uri: `data:image/jpeg;base64,${item.base64}` }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar />
      <View style={styles.work}>
        <Text style={styles.title}>Home</Text>
        <Feather name="upload" size={24} color="red" onPress={pickImage} />
      </View>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.imageContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  work: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 15,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    paddingVertical: 15,
    padding: 5,
    backgroundColor: "black",
  },
  imageWrapper: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "black",
  },
  image: {
    height: 165,
    borderRadius: 10,
  },
});
