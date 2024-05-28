import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import Toast from "react-native-toast-message";
import React from "react";

export default function MyProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleRoute}>Meu Perfil 🛠️</Text>
      <Text style={styles.description}>
        Acesse os dados de sua conta e atualize se quiser.
      </Text>
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
