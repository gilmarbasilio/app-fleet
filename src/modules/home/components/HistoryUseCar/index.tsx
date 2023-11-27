import * as S from "./styles";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native";
import HistoryItem, { HistoryItemDetail } from "../HistoryItem";
import { useEffect, useState } from "react";
import { getListHistoriesService } from "../../../../shared/services/historiesService";

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
      />
      {isLoading && <S.LoadingList />}
    </S.Container>
  );
};

export default HistoryUseCar;
