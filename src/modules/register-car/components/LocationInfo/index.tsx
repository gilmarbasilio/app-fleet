import * as S from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../../../shared/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconBox, { IconBoxProps } from "../IconBox";

type LocationInfoNavigationProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "RegisterCarScreen"
>;

export type LocationInfoProps = {
  label: string;
  description: string;
};

type Props = LocationInfoProps & {
  icon: IconBoxProps;
};

const LocationInfo = ({ label, description, icon }: Props) => {
  const { navigate, goBack } = useNavigation<LocationInfoNavigationProps>();
  const setMessageToast = useToastStore((state) => state.setMessage);

  return (
    <S.Container>
      <IconBox icon={icon} />
      <S.Info>
        <S.Label numberOfLines={1}>{label}</S.Label>
        <S.Description numberOfLines={1}>{description}</S.Description>
      </S.Info>
    </S.Container>
  );
};

export default LocationInfo;
