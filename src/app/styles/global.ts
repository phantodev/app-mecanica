import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerButtons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 60,
    paddingBottom: 30,
  },
  buttonClose: {
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },
  buttonInvert: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTake: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "white",
  },
  camera: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalPhoto: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3d466e",
    width: "100%",
    height: 48,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  errorMessage: {
    color: "red",
    textAlign: "left",
    fontSize: 12,
    paddingTop: 3,
  },
  textArea: {
    padding: 25,
    borderColor: "#c3c3c3",
    borderWidth: 1,
    justifyContent: "flex-start",
    borderRadius: 20,
    width: "100%",
    marginTop: 20,
  },
  containerPhotos: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
  container: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 24,
    padding: 30,
    textAlign: "center",
  },
  containerPermission: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    padding: 30,
    textAlign: "center",
  },
  containerTitle: {
    display: "flex",
    flexDirection: "column",
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

export default styles;
