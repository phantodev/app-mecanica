import { Stack } from "expo-router";
import "../../reactotron";

export default function Layout() {
  return (
    <Stack
      initialRouteName="(screens)/vehiclephotos"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(screens)/signup" options={{}} />
      <Stack.Screen name="(screens)/checkin" options={{}} />
      <Stack.Screen name="(screens)/typevehicle" options={{}} />
      <Stack.Screen name="(screens)/vehiclebrand" options={{}} />
      <Stack.Screen name="(screens)/vehiclemodel" options={{}} />
      <Stack.Screen name="(screens)/vehicledetail" options={{}} />
      <Stack.Screen name="(screens)/vehiclephotos" options={{}} />
    </Stack>
  );
}
