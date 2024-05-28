import React from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import styles from "../styles/global";
import { Controller, useForm } from "react-hook-form";
import { useStore } from "../store";
import { router } from "expo-router";

interface IPhoto {
  uri: string;
}

export default function vehiclePhotos() {
  const [status, setStatus] = React.useState("idle");
  const [facing, setFacing] = React.useState<"back" | "front">("back");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [listPictures, setListPictures] = React.useState<IPhoto[]>([]);
  const camRef = React.useRef<CameraView>(null);
  const { control, handleSubmit } = useForm();
  const store = useStore();

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

  function handleRemovePhoto(index: number) {
    const newList = listPictures.slice();
    newList.splice(index, 1);
    setListPictures(newList);
    console.tron.log(newList);
  }

  function onSubmit(data: any) {
    store.setCheckinPayload({
      vehiclePlate: "BAD-8989",
      vehicleType: store.checkinPayload.vehicleType,
      vehicleBrand: store.checkinPayload.vehicleBrand,
      vehicleModel: store.checkinPayload.vehicleModel,
      vehicleColor: store.checkinPayload.vehicleColor,
      vehicleYear: store.checkinPayload.vehicleYear,
      ownerId: store.checkinPayload.ownerId,
      vehicleDetails: store.checkinPayload.vehicleDetails,
      vehiclePhotoDetails: data.vehiclePhotoDetails,
      photos: [],
    });
    // console.tron.log(data);
    // console.tron.log(store.checkinPayload);
    router.replace("/vehiclesignature");
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.titleRoute}>Fotos 🤪</Text>
        <Text style={styles.description}>Tire fotos automóvel no checkin</Text>
      </View>
      <View style={styles.containerPhotos}>
        <Controller
          control={control}
          name="vehiclePhotoDetails"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                editable
                multiline
                numberOfLines={10}
                maxLength={400}
                textAlignVertical="top"
                style={styles.textArea}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              <View>
                {error && (
                  <Text style={styles.errorMessage}>{error.message}</Text>
                )}
              </View>
            </>
          )}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
            gap: 20,
            width: "100%",
          }}>
          {listPictures.length > 0 &&
            listPictures.map((item, index) => (
              <View
                style={{ width: 150, height: 150, position: "relative" }}
                key={index}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: "blue",
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    zIndex: 10,
                    borderRadius: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text style={{ color: "white" }}>{index}</Text>
                </View>
                <Pressable
                  onPress={() => handleRemovePhoto(index)}
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: "red",
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    zIndex: 10,
                    borderRadius: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Feather name="trash-2" size={24} color="white" />
                </Pressable>
                <Image
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                  }}
                  source={item.uri}
                />
              </View>
            ))}
        </View>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="camera-alt" size={24} color="white" />
          <Text style={styles.textButton}>Tirar Foto</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          {status === "loading" ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.textButton}>Próximo Passo</Text>
          )}
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
