import * as S from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../../../shared/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Control } from "react-hook-form";

type LicensePlateInputNavigationProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "RegisterCarScreen"
>;

type LicensePlateInputProps = {
  label: string;
  placeholder: string;
  control: Control<any>;
};

const LicensePlateInput = ({
  label,
  placeholder,
  control,
}: LicensePlateInputProps) => {
  const { navigate, goBack } =
    useNavigation<LicensePlateInputNavigationProps>();
  const setMessageToast = useToastStore((state) => state.setMessage);

  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Input
        control={control}
        name="plate"
        autoCapitalize="characters"
        label={placeholder}
        maxLength={8}
        placeholderTextColor={theme.colors.white}
      />
    </S.Container>
  );
};

export default LicensePlateInput;
