import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";

export type PrivateStackParamList = {
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator();

const PrivateRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
