import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FormInput } from "./components/ui/FormInput";
import { useForm } from "react-hook-form";
import app from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import React from "react";

export default function Homer() {
  const [status, setStatus] = React.useState("idle");
  const { control, handleSubmit } = useForm();

  const auth = getAuth(app);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/vehiclephotos");
      }
    });

    return () => unsubscribe();
  }, []);

  async function onSubmit(data: any) {
    try {
      setStatus("loading");
      await signInWithEmailAndPassword(auth, data.email, data.password);
      Toast.show({
        type: "success",
        text1: "Login",
        text2: "Login efetuado com sucesso! 👋",
      });
      setTimeout(() => {
        router.replace("/checkin");
      }, 5000); // Atraso de 1 segundo (1000 milissegundos)
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Autenticação",
        text2: "Senha ou usuário inválido! 🤬",
      });
    } finally {
      setStatus("idle");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Seja bem-vindo 🎃</Text>
        <Text>Facilitamos a vida do mêcanico no dia-a-dia</Text>
      </View>
      <View style={styles.form}>
        <FormInput
          control={control}
          keyboardType="email-address"
          name="email"
          label="E-mail"
        />
        <FormInput
          control={control}
          name="password"
          label="Senha"
          secureTextEntry={true}
        />
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          {status === "loading" ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.textButton}>Logar</Text>
          )}
        </Pressable>
      </View>
      <Link href="/signup" asChild>
        <Pressable style={styles.buttonGhost}>
          <Text>Quero me cadastrar</Text>
        </Pressable>
      </Link>
      <StatusBar style="dark" />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    width: "100%",
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
  buttonGhost: {
    width: "100%",
    height: 48,
    color: "#3d466e",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
  status: {
    backgroundColor: "#FF0000",
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    textAlign: "center",
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
