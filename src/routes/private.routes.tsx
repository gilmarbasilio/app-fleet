import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterCarScreen from "../modules/register-car/screens/RegisterCarScreen";
import HomeScreen from "../modules/home/screens/HomeScreen";
import CarCheckOutScreen from "../modules/register-car/screens/CarCheckOutScreen";

export type PrivateStackParamList = {
  HomeScreen: undefined;
  RegisterCarScreen?: {
    id?: string;
  };
  CarCheckOutScreen: {
    id: string;
  };
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
      <Stack.Screen name="RegisterCarScreen" component={RegisterCarScreen} />
      <Stack.Screen name="CarCheckOutScreen" component={CarCheckOutScreen} />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
