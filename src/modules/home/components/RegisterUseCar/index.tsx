import * as S from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { useAuthStore } from "../../../../shared/store/useAuthStore";
import theme from "../../../../shared/theme";
import { useEffect, useState } from "react";
import { getCarInUseService } from "../../../../shared/services/histories.service";
import { Historic } from "../../../../shared/models/historic.model";
import { Loading } from "../../../../shared/components/Loading";

type HomeScreenProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "HomeScreen"
>;

const RegisterUseCar = () => {
  const { navigate } = useNavigation<HomeScreenProps>();
  const [historic, setHistoric] = useState<Historic | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleRegisterCar = async () => {
    if (historic) {
      navigate("CarCheckOutScreen", {
        id: historic.id,
      });
    } else {
      navigate("RegisterCarScreen");
    }
  };

  const handleGetCarInUse = async () => {
    try {
      const response = await getCarInUseService();
      console.log({ response });
      setHistoric(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetCarInUse();
  }, []);

  return (
    <S.Container>
      <S.CarInfo onPress={handleRegisterCar}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {historic ? (
              <>
                <S.CarIcon>
                  <FontAwesome5
                    name="car"
                    size={40}
                    color={theme.colors.brand_light}
                  />
                </S.CarIcon>
                <S.CarDescription>
                  <S.CarText>
                    Veículo{" "}
                    <S.CarTextBold>{historic.licensePlate}</S.CarTextBold> em
                    uso.{" "}
                    <S.CarTextBold>
                      Clique aqui para registrar a chegada.
                    </S.CarTextBold>
                  </S.CarText>
                </S.CarDescription>
              </>
            ) : (
              <>
                <S.CarIcon>
                  <FontAwesome5
                    name="key"
                    size={40}
                    color={theme.colors.brand_light}
                  />
                </S.CarIcon>
                <S.CarDescription>
                  <S.CarText>
                    Nenhum veículo em uso...{" "}
                    <S.CarTextBold>
                      Clique aqui para registrar a saída.
                    </S.CarTextBold>
                  </S.CarText>
                </S.CarDescription>
              </>
            )}
          </>
        )}
      </S.CarInfo>
    </S.Container>
  );
};

export default RegisterUseCar;
