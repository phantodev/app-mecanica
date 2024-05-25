import React from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import styles from "../styles/global";

interface IPhoto {
  uri: string;
}

export default function vehiclePhotos() {
  const [facing, setFacing] = React.useState<"back" | "front">("back");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [listPictures, setListPictures] = React.useState<IPhoto[]>([]);
  const camRef = React.useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.containerPermission}>
        <Text style={{ textAlign: "center" }}>
          Nós precisamos de acesso a sua câmera
        </Text>
        <Pressable onPress={requestPermission} style={styles.button}>
          <Text style={styles.textButton}>Liberar acesso a câmera</Text>
        </Pressable>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takephoto() {
    if (camRef && camRef.current !== null) {
      const data = await camRef.current.takePictureAsync();
      if (data) {
        // Verifique se o objeto data não é undefined
        const newList = listPictures.slice();
        newList.push({ uri: data.uri }); // Aqui estamos criando um objeto compatível com o tipo IPhoto
        setListPictures(newList);
        console.tron.log(newList);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.titleRoute}>Fotos 🤪</Text>
        <Text style={styles.description}>Tire fotos automóvel no checkin</Text>
      </View>
      <View style={styles.containerPhotos}>
        <Text>cdsadasdsad</Text>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="camera-alt" size={24} color="white" />
          <Text style={styles.textButton}>Tirar Foto</Text>
        </Pressable>
      </View>
      <Modal
        style={styles.modalPhoto}
        transparent={true}
        visible={modalVisible}>
        <CameraView style={styles.camera} facing={facing} ref={camRef}>
          <View style={styles.containerButtons}>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}>
              <MaterialIcons name="close" size={40} color="white" />
            </Pressable>
            <Pressable
              style={styles.buttonTake}
              onPress={takephoto}></Pressable>
            <Pressable style={styles.buttonInvert} onPress={toggleCameraFacing}>
              <MaterialIcons name="cameraswitch" size={40} color="white" />
            </Pressable>
          </View>
        </CameraView>
      </Modal>
    </View>
  );
}
