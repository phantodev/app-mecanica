import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import React from "react";
import { useStore } from "../store";
import { FlashList } from "@shopify/flash-list";
import { FormInput } from "../components/ui/FormInput";

export default function VehicleDetail() {
  const [status, setStatus] = React.useState("idle");
  const { control, handleSubmit } = useForm();
  const store = useStore();

  function onSubmit(data: any) {
    store.setCheckinPayload({
      vehiclePlate: "BAD-8989",
      vehicleType: store.checkinPayload.vehicleType,
      vehicleBrand: store.checkinPayload.vehicleBrand,
      vehicleModel: store.checkinPayload.vehicleModel,
      vehicleColor: data.carColor,
      vehicleYear: data.vehicleYear,
      ownerId: "",
      vehicleDetails: data.vehicleDetails,
      vehiclePhotoDetails: "",
      photos: [],
    });
    // console.tron.log(data);
    // console.tron.log(store.checkinPayload);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleRoute}>Detalhes 🛠️</Text>
      <Text style={styles.description}>Coloque os detalhes do carro. </Text>
      <View style={styles.containerField}>
        <FormInput control={control} name="carColor" label="Cor do carro" />
        <FormInput control={control} name="vehicleYear" label="Ano do carro" />
        <Text style={styles.label}>Detalhes do carro:</Text>
        <Controller
          control={control}
          name="vehicleDetails"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                editable
                multiline
                numberOfLines={4}
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
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          {status === "loading" ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.textButton}>Próximo Passo</Text>
          )}
        </Pressable>
      </View>
      <StatusBar style="dark" />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    textAlign: "left",
    fontSize: 12,
    paddingTop: 3,
  },
  label: {
    fontSize: 12,
    color: "#000",
    marginBottom: 10,
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    paddingLeft: 25,
    paddingTop: 10,
  },
  textArea: {
    padding: 25,
    borderColor: "#c3c3c3",
    borderWidth: 1,
    justifyContent: "flex-start",
    borderRadius: 20,
  },
  containerButton: {
    paddingHorizontal: 20,
  },
  containerIcon: {
    height: 50,
    width: 100,
    borderRadius: 50,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 24,
    padding: 30,
    textAlign: "center",
  },
  buttonModelVehicle: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 80,
    borderRadius: 10,
    borderColor: "#3d466e",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textButtonTypeVehicle: {
    color: "#3d466e",
    fontSize: 20,
    fontWeight: "bold",
  },
  containerField: {
    width: "100%",
    display: "flex",
    height: "95%",
    paddingTop: 20,
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
  titleRoute: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
  },
});
