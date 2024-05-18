import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Controller } from "react-hook-form";

export const FormInput = ({ control, name, ...otheProps }: any) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <Text style={styles.label}>{name}</Text>
          <TextInput style={styles.input} />
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderStyle: "solid",
    height: 48,
    borderColor: "#c3c3c3",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 25,
    fontSize: 12,
    width: "100%",
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
});
