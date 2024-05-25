import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import React from "react";
import { router } from "expo-router";
import { Image } from "expo-image";
import getVehicleBrandsService from "../services/car/getVehicleBrandsService";
import { useStore } from "../store";
import { IVehicleBrands } from "../../interfaces/car";

export default function VehicleBrand() {
  const [status, setStatus] = React.useState("idle");
  const [vehicleBrand, setVehicleBrand] = React.useState("");
  const [vehicleBrands, setVehicleBrands] = React.useState<
    IVehicleBrands[] | null
  >(null);
  const store = useStore();
  const isInitialMount = React.useRef(true);
  const isInitialMount2 = React.useRef(true);

  async function getVehicleBrands() {
    try {
      setStatus("loading");
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const response = await getVehicleBrandsService(
        store.checkinPayload.vehicleType
      );
      if (response?.length !== undefined) {
        if (response?.length > 0) {
          setVehicleBrands(response);
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
      vehicleBrand: vehicleBrand,
      vehicleModel: "",
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
  }, [vehicleBrand]);

  React.useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      router.replace("/vehiclemodel");
    }
  }, [store.checkinPayload]);

  React.useEffect(() => {
    getVehicleBrands();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleRoute}>Marca 🛠️</Text>
      <Text style={styles.description}>
        Escolha a marca do automóvel abaixo.{" "}
      </Text>
      <View style={styles.containerField}>
        {status === "loading" && (
          <View>
            <Text>Carregando marcas...</Text>
          </View>
        )}
        {status === "idle" &&
          vehicleBrands !== null &&
          vehicleBrands.length > 0 &&
          vehicleBrands.map((vehicleBrand) => (
            <Pressable
              style={styles.buttonTypeVehicle}
              key={vehicleBrand.id}
              onPress={() => setVehicleBrand(vehicleBrand.brand)}>
              <View style={styles.containerIcon}>
                <Image
                  style={styles.image}
                  source={vehicleBrand.iconUrl}
                  transition={500}
                />
              </View>
              <Text style={styles.textButtonTypeVehicle}>
                {vehicleBrand.brand}
              </Text>
            </Pressable>
          ))}
        {status === "idle" &&
          vehicleBrands !== null &&
          vehicleBrands.length === 0 && (
            <View>
              <Text>Nenhum marca cadastrada!</Text>
            </View>
          )}
      </View>
      <StatusBar style="dark" />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 30,
    textAlign: "center",
  },
  buttonTypeVehicle: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 80,
    borderRadius: 20,
    borderColor: "#3d466e",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-between",
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
