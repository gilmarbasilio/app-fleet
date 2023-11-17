import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import Routes from "./src/routes";
import theme from "./src/shared/theme";
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from "@expo-google-fonts/lato";
import { Loading } from "./src/components/Loading";
import { StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Toast } from "./src/components/Toast";

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <RootSiblingParent>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
        <Toast />
      </ThemeProvider>
    </RootSiblingParent>
  );
}
