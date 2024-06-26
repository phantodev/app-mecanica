import { Stack } from "expo-router";
import "../../reactotron";

export default function Layout() {
  return (
    <Stack
      // initialRouteName="(screens)/checkin"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
