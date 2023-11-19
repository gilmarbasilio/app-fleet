import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterCarScreen from "../modules/register-car/screens/RegisterCarScreen";
import HomeScreen from "../modules/home/screens/HomeScreen";

export type PrivateStackParamList = {
  HomeScreen: undefined;
  RegisterCarScreen?: {
    id?: string;
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
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
