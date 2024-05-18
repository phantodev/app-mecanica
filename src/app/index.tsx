import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FormInput } from "./components/ui/FormInput";
import { useForm } from "react-hook-form";

export default function App() {
  const { control, handleSubmit } = useForm();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Seja bem-vindo 🎃</Text>
        <Text>Facilitamos a vida do mêcanico no dia-a-dia</Text>
      </View>
      <View style={styles.form}>
        <FormInput control={control} name="Email" />
        <FormInput control={control} name="Senha" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
  },
  form: {
    marginTop: 40,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
