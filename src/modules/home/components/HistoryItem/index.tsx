import * as S from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { useAuthStore } from "../../../../shared/store/useAuthStore";
import theme from "../../../../shared/theme";

export type HistoryItemDetail = {
  id: string;
  plate: string;
  departureDate: string;
};

type HistoryItemProps = {
  item: HistoryItemDetail;
};

type HomeScreenProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "HomeScreen"
>;

const HistoryItem = ({ item }: HistoryItemProps) => {
  const { navigate } = useNavigation<HomeScreenProps>();

  const handleShowHistory = async () => {
    navigate("HistoricDetailScreen", {
      id: item.id,
    });
  };

  return (
    <S.Container onPress={handleShowHistory}>
      <S.ItemContainer>
        <S.Plate>{item.plate}</S.Plate>
        <S.Description>
          {format(
            parseISO(item.departureDate),
            "'Saída em 'dd/MM/yyyy' as 'HH:mm'"
          )}
        </S.Description>
      </S.ItemContainer>
      <S.ItemButton>
        <FontAwesome5
          name="chevron-right"
          size={24}
          color={theme.colors.brand_light}
        />
      </S.ItemButton>
    </S.Container>
  );
};

export default HistoryItem;
