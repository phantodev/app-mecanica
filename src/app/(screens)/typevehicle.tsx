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
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import React from "react";
import { useStore } from "../store";
import { router } from "expo-router";

export default function Choosefabric() {
  const [renderFirstTime, setRenderFirstTime] = React.useState(true);
  const [vehicleType, setVehicleType] = React.useState<string>("");
  const [status, setStatus] = React.useState("idle");
  const store = useStore();
  const isInitialMount = React.useRef(true);
  const isInitialMount2 = React.useRef(true);

  function updateZustandStore() {
    store.setCheckinPayload({
      vehiclePlate: "BAD-8989",
      vehicleType: vehicleType,
      vehicleBrand: "",
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
  }, [vehicleType]);

  React.useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      router.replace("/vehiclebrand");
    }
  }, [store.checkinPayload]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleRoute}>Tipo Veículo 🛠️</Text>
      <Text style={styles.description}>Escolha o tipo do veículo.</Text>
      <View style={styles.containerField}>
        <Pressable
          style={styles.buttonTypeVehicle}
          onPress={() => setVehicleType("Moto")}>
          <View style={styles.containerIcon}>
            <Image
              style={styles.image}
              source={require("../../../assets/icons/moto.jpg")}
            />
          </View>
          <Text style={styles.textButtonTypeVehicle}>Moto</Text>
        </Pressable>
        <Pressable
          style={styles.buttonTypeVehicle}
          onPress={() => setVehicleType("Carro")}>
          <View style={styles.containerIcon}>
            <Image
              style={styles.image}
              source={require("../../../assets/icons/car.jpg")}
            />
          </View>
          <Text style={styles.textButtonTypeVehicle}>Carro</Text>
        </Pressable>
        <Pressable
          style={styles.buttonTypeVehicle}
          onPress={() => setVehicleType("Caminhão")}>
          <View style={styles.containerIcon}>
            <Image
              style={styles.image}
              source={require("../../../assets/icons/truck.jpg")}
            />
          </View>
          <Text style={styles.textButtonTypeVehicle}>Caminhão</Text>
        </Pressable>
      </View>
      <StatusBar style="dark" />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  containerIcon: {
    height: 50,
    width: 50,
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
