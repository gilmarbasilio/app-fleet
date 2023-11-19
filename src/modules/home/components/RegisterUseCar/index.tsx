import * as S from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { useAuthStore } from "../../../../shared/store/useAuthStore";
import theme from "../../../../shared/theme";

type HomeScreenProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "HomeScreen"
>;

const RegisterUseCar = () => {
  const { navigate } = useNavigation<HomeScreenProps>();
  const setMessageToast = useToastStore((state) => state.setMessage);
  const user = useAuthStore((state) => state.user);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const handleRegisterCar = async () => {
    console.log("handleRegisterCar");
    navigate("RegisterCarScreen");
  };

  return (
    <S.Container>
      <S.CarInfo onPress={handleRegisterCar}>
        <S.CarIcon>
          <FontAwesome5 name="key" size={40} color={theme.colors.brand_light} />
        </S.CarIcon>
        <S.CarDescription>
          <S.CarText>
            Nenhum veículo em uso...{" "}
            <S.CarTextBold>Clique aqui para registrar a saída.</S.CarTextBold>
          </S.CarText>
        </S.CarDescription>
      </S.CarInfo>
    </S.Container>
  );
};

export default RegisterUseCar;
