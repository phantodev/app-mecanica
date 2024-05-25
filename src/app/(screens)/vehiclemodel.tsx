import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import React from "react";
import { router } from "expo-router";
import { useStore } from "../store";
import { IVehicleModels } from "../../interfaces/car";
import getVehicleModelsService from "../services/car/getVehicleModelsService";
import { FlashList } from "@shopify/flash-list";

export default function VehicleModel() {
  const [status, setStatus] = React.useState("idle");
  const [vehicleModel, setVehicleModel] = React.useState("");
  const [vehicleModels, setVehicleModels] = React.useState<
    IVehicleModels[] | null
  >(null);
  const store = useStore();
  const isInitialMount = React.useRef(true);
  const isInitialMount2 = React.useRef(true);

  async function getVehicleModels() {
    try {
      setStatus("loading");
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const response = await getVehicleModelsService(
        store.checkinPayload.vehicleType,
        store.checkinPayload.vehicleBrand
      );
      if (response?.length !== undefined) {
        if (response?.length > 0) {
          setVehicleModels(response);
        } else {
          Alert.alert("Nenhuma marca encontrada!");
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

  function updateZustandStore() {
    store.setCheckinPayload({
      vehiclePlate: "BAD-8989",
      vehicleType: store.checkinPayload.vehicleType,
      vehicleBrand: store.checkinPayload.vehicleBrand,
      vehicleModel: vehicleModel,
      vehicleColor: "",
      vehicleYear: 0,
      ownerId: "",
      vehicleDetails: "",
      photos: [],
    });
  }

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      updateZustandStore();
    }
  }, [vehicleModel]);

  React.useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      router.replace("/vehicledetail");
    }
  }, [store.checkinPayload]);

  React.useEffect(() => {
    getVehicleModels();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleRoute}>Modelo 🛠️</Text>
      <Text style={styles.description}>
        Escolha o modelo do automóvel abaixo.{" "}
      </Text>
      <View style={styles.containerField}>
        {status === "loading" && (
          <View>
            <Text>Carregando marcas...</Text>
          </View>
        )}
        {status === "idle" &&
          vehicleModels !== null &&
          vehicleModels.length > 0 && (
            <FlashList
              renderItem={({ item: vehicleModel }) => {
                return (
                  <View style={styles.containerButton}>
                    <Pressable
                      style={styles.buttonModelVehicle}
                      key={vehicleModel.id}
                      onPress={() => setVehicleModel(vehicleModel.model)}>
                      <Text style={styles.textButtonTypeVehicle}>
                        {vehicleModel.model}
                      </Text>
                    </Pressable>
                  </View>
                );
              }}
              estimatedItemSize={10}
              data={vehicleModels}
            />
          )}
        {status === "idle" &&
          vehicleModels !== null &&
          vehicleModels.length === 0 && (
            <View>
              <Text>Nenhum modelo cadastrado!</Text>
            </View>
          )}
      </View>
      <StatusBar style="dark" />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: Platform.OS === "android" ? 24 : 40,
    paddingVertical: 30,
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
  titleRoute: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 30,
  },
  description: {
    fontSize: 16,
    marginLeft: 30,
  },
});
