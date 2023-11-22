import * as S from "./styles";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import { useToastStore } from "../../../../shared/store/useToastStore";
import HeaderRegisterCar from "../../components/HeaderRegisterCar";
import LicensePlateInput from "../../components/LicensePlateInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import JustificationInput from "../../components/JustificationInput";
import { Alert, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import {
  LocationAccuracy,
  LocationObjectCoords,
  LocationSubscription,
  useForegroundPermissions,
  watchPositionAsync,
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
} from "expo-location";
import { getAddressLocation } from "../../../../shared/utils/getAddressLocation";
import { Loading } from "../../../../shared/components/Loading";
import LocationInfo from "../../components/LocationInfo";
import Map from "../../../../shared/components/Map";
import { startLocationTask } from "../../../../shared/tasks/backgroundLocationTask";
import { getHistoricByIdService } from "../../../../shared/services/histories.service";
import { Historic } from "../../../../shared/models/historic.model";

const registerCarUseSchema = z.object({
  plate: z
    .string({
      required_error: "A placa é obrigatória",
    })
    .min(8, { message: "O nome tem que ter no mínimo 8 caracteres" }),
  justification: z
    .string({
      required_error: "Justificativa é obrigatória",
    })
    .min(3, { message: "O nome tem que ter no mínimo 3 caracteres" }),
});

type CarCheckOutScreenSchema = z.infer<typeof registerCarUseSchema>;

type CarCheckOutScreenProps = NativeStackScreenProps<
  PrivateStackParamList,
  "CarCheckOutScreen"
>;

const CarCheckOutScreen = ({
  route: {
    params: { id },
  },
}: CarCheckOutScreenProps) => {
  const setMessageToast = useToastStore((state) => state.setMessage);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] =
    useState<LocationObjectCoords | null>(null);
  const [historic, setHistoric] = useState<Historic>();

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CarCheckOutScreenSchema>({
    resolver: zodResolver(registerCarUseSchema),
  });

  const getHistoricInfo = async () => {
    try {
      const response = await getHistoricByIdService(id);
      setHistoric(response);
      setIsLoadingLocation(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistoricInfo();
  }, [id]);

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return;
    }

    let subscription: LocationSubscription;

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        console.log(location);
        setCurrentCoords(location.coords);
        getAddressLocation(location.coords)
          .then((address) => {
            if (address) {
              setCurrentAddress(address);
            }
          })
          .finally(() => setIsLoadingLocation(false));
      }
    ).then((response) => (subscription = response));

    return () => subscription.remove();
  }, [locationForegroundPermission?.granted]);

  if (!locationForegroundPermission?.granted) {
    return (
      <S.Container>
        <HeaderRegisterCar title="Saída" />
        <S.Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para
          acessar essa funcionalidade. Por favor, acesse as configurações do seu
          dispositivo para conceder a permissão ao aplicativo.
        </S.Message>
      </S.Container>
    );
  }

  console.log({ historic });

  if (isLoadingLocation) {
    return <Loading />;
  }

  const handleDepartureRegister = async (data: CarCheckOutScreenSchema) => {
    const backgroundPermissions = await requestBackgroundPermissionsAsync();
    console.log({ backgroundPermissions });
    if (!backgroundPermissions.granted) {
      return Alert.alert(
        "Localização",
        'É necessário permitir que o App tenhar acesso a localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo".'
      );
    }

    await startLocationTask();
  };

  ////////////////////////////////////////////////////////////////

  return (
    <S.Container>
      <HeaderRegisterCar title="Chegada" />
      <ScrollView>
        {currentCoords && <Map coordinates={[currentCoords]} />}
        <S.FormContainer>
          {currentAddress && (
            <LocationInfo
              icon={{
                iconName: "FontAwesome5",
                name: "car",
              }}
              label="Localização atual"
              description={currentAddress}
            />
          )}

          <LicensePlateInput
            control={control}
            label="Placa do veículo"
            placeholder="XXX-0000"
          />
          <JustificationInput
            control={control}
            label="Finalidade"
            placeholder="Vou utilizar o carro para..."
          />
          <S.ButtonRegisterOutput
            title="Registrar Chegada"
            onPress={handleSubmit(handleDepartureRegister)}
          />
        </S.FormContainer>
      </ScrollView>
    </S.Container>
  );
};

export default CarCheckOutScreen;
