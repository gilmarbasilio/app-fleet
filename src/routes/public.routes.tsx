import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../modules/auth/screens/LoginScreen";
import CreateAccountScreen from "../modules/auth/screens/CreateAccountScreen";

export type PublicStackParamList = {
  LoginScreen: undefined;
  CreateAccountScreen: undefined;
};

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
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
