import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FormInput } from "../components/ui/FormInput";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import React from "react";
import { router } from "expo-router";
import getCarByPlate from "../services/car/getCarByPlate";

export default function Checkin() {
  const [status, setStatus] = React.useState("idle");
  const { control, handleSubmit } = useForm();

  async function onSubmit(data: any) {
    try {
      setStatus("loading");
      const response = await getCarByPlate(data.carPlate);
      if (response?.length !== undefined) {
        if (response?.length > 0) {
          Alert.alert("Encontrei o carro!");
        } else {
          router.replace("/typevehicle");
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro de API",
        text2: "Fale com o suporte! 🤬",
      });
    } finally {
      setStatus("idle");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleRoute}>Checkin 🛠️</Text>
      <Text style={styles.description}>
        Preencha a placa do carro abaixo para dar entrada na oficina!
      </Text>
      <View style={styles.containerField}>
        <FormInput control={control} name="carPlate" label="" />
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          {status === "loading" ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.textButton}>Checkin</Text>
          )}
        </Pressable>
      </View>
      <StatusBar style="dark" />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 24,
    padding: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3d466e",
    width: "100%",
    height: 48,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
  containerField: {
    width: "100%",
    display: "flex",
    height: "100%",
    paddingTop: 20,
  },
  titleRoute: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
  },
});
