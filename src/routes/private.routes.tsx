import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../modules/home/screens/HomeScreen";
import HistoricDetailScreen from "../modules/register-car/screens/HistoricDetailScreen";
import CheckInScreen from "../modules/register-car/screens/CheckInScreen";
import CheckOutScreen from "../modules/register-car/screens/CheckOutScreen";

export type PrivateStackParamList = {
  HomeScreen: undefined;
  CheckInScreen?: {
    id?: string;
  };
  CheckOutScreen: {
    id: string;
  };
  HistoricDetailScreen: {
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
      <Stack.Screen name="CheckInScreen" component={CheckInScreen} />
      <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      <Stack.Screen
        name="HistoricDetailScreen"
        component={HistoricDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
