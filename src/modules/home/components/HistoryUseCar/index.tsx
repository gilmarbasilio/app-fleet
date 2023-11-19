import * as S from "./styles";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../../../shared/theme";
import { useAuthStore } from "../../../../shared/store/useAuthStore";
import { Alert, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import HistoryItem, { HistoryItemDetail } from "../HistoryItem";

const data: HistoryItemDetail[] = [
  {
    id: "1",
    plate: "ABC-0000",
    departureDate: "2023-11-17T15:00:00",
  },
  {
    id: "2",
    plate: "ABC-1111",
    departureDate: "2023-11-17T16:00:00",
  },
  {
    id: "3",
    plate: "ABC-3333",
    departureDate: "2023-11-17T16:00:00",
  },
  {
    id: "4",
    plate: "ABC-4444",
    departureDate: "2023-11-17T16:00:00",
  },
  {
    id: "5",
    plate: "ABC-5555",
    departureDate: "2023-11-17T16:00:00",
  },
  {
    id: "6",
    plate: "ABC-6666",
    departureDate: "2023-11-17T16:00:00",
  },
  {
    id: "7",
    plate: "ABC-7777",
    departureDate: "2023-11-17T16:00:00",
  },
  {
    id: "8",
    plate: "ABC-8888",
    departureDate: "2023-11-17T16:00:00",
  },
];

const HistoryUseCar = () => {
  const setMessageToast = useToastStore((state) => state.setMessage);
  const user = useAuthStore((state) => state.user);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  return (
    <S.Container>
      <S.Title>Histórico</S.Title>
      <FlatList
        data={data}
        renderItem={({ item }) => <HistoryItem key={item.id} item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
      />
    </S.Container>
  );
};

export default HistoryUseCar;
