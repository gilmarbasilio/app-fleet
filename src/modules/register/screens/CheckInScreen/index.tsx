import * as S from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
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
  requestBackgroundPermissionsAsync,
} from "expo-location";
import { getAddressLocation } from "../../../../shared/utils/getAddressLocation";
import { Loading } from "../../../../shared/components/Loading";
import LocationInfo from "../../components/LocationInfo";
import Map from "../../../../shared/components/Map";
import { startLocationTask } from "../../../../shared/tasks/backgroundLocationTask";
import { createHistoricService } from "../../../../shared/services/historiesService";

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

type RegisterCarUseSchema = z.infer<typeof registerCarUseSchema>;

type CheckInScreenProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "CheckInScreen"
>;

const CheckInScreen = () => {
  const { navigate } = useNavigation<CheckInScreenProps>();
  const setMessageToast = useToastStore((state) => state.setMessage);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingForm, setisLoadingForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<string>();
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords>();

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCarUseSchema>({
    resolver: zodResolver(registerCarUseSchema),
  });

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

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

  if (isLoadingLocation) {
    return <Loading />;
  }

  const handleDepartureRegister = async (data: RegisterCarUseSchema) => {
    try {
      setisLoadingForm(true);

      const backgroundPermissions = await requestBackgroundPermissionsAsync();
      if (!backgroundPermissions.granted) {
        return Alert.alert(
          "Localização",
          'É necessário permitir que o App tenhar acesso a localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo".'
        );
      }

      await createHistoricService({
        licensePlate: data.plate,
        description: data.justification,
        coords: [
          {
            latitude: Number(currentCoords?.latitude),
            longitude: Number(currentCoords?.longitude),
            timestamp: new Date().getTime(),
          },
        ],
      });

      await startLocationTask();

      navigate("HomeScreen");
    } catch (error: any) {
      setMessageToast({
        text: error?.message,
        type: "danger",
      });
    } finally {
      setisLoadingForm(false);
    }
  };

  return (
    <S.Container>
      <HeaderRegisterCar title="Saída" />
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
            title="Registrar Saída"
            onPress={handleSubmit(handleDepartureRegister)}
            isLoading={isLoadingForm}
          />
        </S.FormContainer>
      </ScrollView>
    </S.Container>
  );
};

export default CheckInScreen;
