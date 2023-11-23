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
import {
  startLocationTask,
  stopLocationTask,
} from "../../../../shared/tasks/backgroundLocationTask";
import {
  checkOutHistoricService,
  getHistoricByIdService,
} from "../../../../shared/services/histories.service";
import { Historic } from "../../../../shared/models/historic.model";
import { getStorageLocations } from "../../../../shared/storage/locationStorage";
import { LatLng } from "react-native-maps";

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
  const [isLoading, setIsLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const { goBack } = useNavigation();
  const [historic, setHistoric] = useState<Historic>();
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);

  const getHistoricInfo = async () => {
    try {
      const response = await getHistoricByIdService(id);
      const locationStorage = await getStorageLocations();

      setHistoric(response);
      setCoordinates(locationStorage);
    } catch (error: any) {
      console.log(error);
      setMessageToast({
        text: error?.message,
        type: "danger",
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    getHistoricInfo();
  }, [id]);

  if (isLoadingLocation) {
    return <Loading />;
  }

  const handleCheckOutRegister = async () => {
    try {
      console.log("passou aqui 1");
      setIsLoading(true);
      if (!historic) {
        return setMessageToast({
          text: "Não foi possível obter os dados para registrar a chegada do veículo.",
          type: "danger",
        });
      }

      console.log("passou aqui 2");

      const locations = await getStorageLocations();
      console.log("passou aqui 3");
      await checkOutHistoricService({
        id: historic.id,
        coords: locations,
      });

      await stopLocationTask();

      setMessageToast({
        text: "Chegada registrada com sucesso.",
        type: "success",
      });

      goBack();
    } catch (error: any) {
      setMessageToast({
        text:
          error?.message || "Não foi possível registar a chegada do veículo.",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <HeaderRegisterCar title="Chegada" />
      <ScrollView>
        {coordinates.length > 0 && <Map coordinates={coordinates} />}
        <S.Content>
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

          <S.Label>Placa do veículo</S.Label>

          <S.LicensePlate>{historic?.licensePlate}</S.LicensePlate>

          <S.Label>Finalidade</S.Label>

          <S.Description>{historic?.description}</S.Description>

          <S.ButtonRegisterOutput
            title="Registrar Chegada"
            onPress={handleCheckOutRegister}
            isLoading={isLoading}
          />
        </S.Content>
      </ScrollView>
    </S.Container>
  );
};

export default CarCheckOutScreen;
