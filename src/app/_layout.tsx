import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(screens)/signup" options={{}} />
      <Stack.Screen name="(screens)/checkin" options={{}} />
    </Stack>
  );
}
