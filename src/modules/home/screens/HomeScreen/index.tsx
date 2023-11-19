import * as S from "./styles";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import HeaderHome from "../../components/HeaderHome";
import HistoryUseCar from "../../components/HistoryUseCar";
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
      <HistoryUseCar />
    </S.Container>
  );
};

export default HomeScreen;
