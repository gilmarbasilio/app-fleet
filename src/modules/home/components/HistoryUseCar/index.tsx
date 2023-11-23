import * as S from "./styles";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../../../shared/theme";
import { useAuthStore } from "../../../../shared/store/useAuthStore";
import { Alert, FlatList, RefreshControl } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import HistoryItem, { HistoryItemDetail } from "../HistoryItem";
import { useCallback, useEffect, useState } from "react";
import { getListHistoriesService } from "../../../../shared/services/histories.service";
import { Loading } from "../../../../shared/components/Loading";

const HistoryUseCar = () => {
  const setMessageToast = useToastStore((state) => state.setMessage);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [listHistoric, setListHistoric] = useState<HistoryItemDetail[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(6);

  const handleGetCarInUse = async (_skip: number = skip) => {
    try {
      setIsLoading(true);
      const response = await getListHistoriesService({
        status: "arrived",
        skip: _skip,
        take,
      });
      setListHistoric([
        ...listHistoric,
        ...response?.map((historic) => {
          return {
            id: historic.id,
            plate: historic.licensePlate,
            departureDate: historic.createdAt,
          };
        }),
      ]);
    } catch (error: any) {
      setMessageToast({
        text: error?.message,
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoreData = async () => {
    const _skip = Number(skip) + Number(take);
    setSkip(_skip);
    handleGetCarInUse(_skip);
  };

  useEffect(() => {
    handleGetCarInUse();
  }, [isFocused]);

  return (
    <S.Container>
      <S.Title>Histórico</S.Title>
      <FlatList
        data={listHistoric}
        renderItem={({ item }) => <HistoryItem key={item.id} item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        onEndReached={handleMoreData}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleGetCarInUse}
          />
        }
      />
    </S.Container>
  );
};

export default HistoryUseCar;
