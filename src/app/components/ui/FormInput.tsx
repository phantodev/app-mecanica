import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Controller } from "react-hook-form";

export const FormInput = ({
  control,
  name,
  label,
  multiline,
  lines,
  secureTextEntry,
  ...otherProps
}: any) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          {label !== "" && <Text style={styles.label}>{label}</Text>}
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...otherProps}
          />
          <View>
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </View>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    textAlign: "left",
    fontSize: 12,
    paddingTop: 3,
  },
  input: {
    borderStyle: "solid",
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
