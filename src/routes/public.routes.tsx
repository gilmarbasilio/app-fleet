import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login";

const Stack = createNativeStackNavigator();

const PublicRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
