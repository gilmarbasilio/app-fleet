import * as S from "./styles";
import { useToastStore } from "../../shared/store/useToastStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { PrivateStackParamList } from "../../routes/private.routes";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../shared/theme";
import { useAuthStore } from "../../shared/store/useAuthStore";
import HeaderHome from "../../components/HeaderHome";
import RegisterUseCar from "../../components/RegisterUseCar";

type HomeScreenProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "HomeScreen"
>;

const HomeScreen = () => {
  const { navigate } = useNavigation<HomeScreenProps>();
  const setMessageToast = useToastStore((state) => state.setMessage);
  return (
    <S.Container>
      <HeaderHome />
      <RegisterUseCar />
    </S.Container>
  );
};

export default HomeScreen;
