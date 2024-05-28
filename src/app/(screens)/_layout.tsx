import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      // initialRouteName="(screens)/checkin"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="typevehicle" />
      <Stack.Screen name="vehiclebrand" />
      <Stack.Screen name="vehiclemodel" />
      <Stack.Screen name="vehicledetail" />
      <Stack.Screen name="vehiclesignature" />
    </Stack>
  );
}
