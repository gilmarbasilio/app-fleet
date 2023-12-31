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
import { Loading } from "./src/shared/components/Loading";
import { StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Toast } from "./src/shared/components/Toast";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.colors.black_700 }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
          <Toast />
        </SafeAreaProvider>
      </ThemeProvider>
    </RootSiblingParent>
  );
}
