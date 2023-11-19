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

type JustificationInputNavigationProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "RegisterCarScreen"
>;

type JustificationInputProps = {
  label: string;
  placeholder: string;
  control: Control<any>;
};

const JustificationInput = ({
  label,
  placeholder,
  control,
}: JustificationInputProps) => {
  const { navigate, goBack } =
    useNavigation<JustificationInputNavigationProps>();
  const setMessageToast = useToastStore((state) => state.setMessage);

  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.TextArea control={control} name="justification" label={placeholder} />
    </S.Container>
  );
};

export default JustificationInput;
