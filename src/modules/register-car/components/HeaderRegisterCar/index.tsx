import * as S from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../../../shared/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderRegisterCarNavigationProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "RegisterCarScreen"
>;

type HeaderRegisterCarProps = {
  title: string;
};

const HeaderRegisterCar = ({ title }: HeaderRegisterCarProps) => {
  const { navigate, goBack } =
    useNavigation<HeaderRegisterCarNavigationProps>();
  const setMessageToast = useToastStore((state) => state.setMessage);
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 16;

  return (
    <S.Container style={{ paddingTop }}>
      <S.GoBack onPress={goBack}>
        <FontAwesome
          name="arrow-left"
          size={24}
          color={theme.colors.brand_light}
        />
      </S.GoBack>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default HeaderRegisterCar;
