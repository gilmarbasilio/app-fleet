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
import LocationInfo, { LocationInfoProps } from "../../components/LocationInfo";
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
import { Locations } from "../../components/Locations";
import { format, parseISO } from "date-fns";

type CheckOutScreenProps = NativeStackScreenProps<
  PrivateStackParamList,
  "CheckOutScreen"
>;

const CheckOutScreen = ({
  route: {
    params: { id },
  },
}: CheckOutScreenProps) => {
  const setMessageToast = useToastStore((state) => state.setMessage);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const { goBack } = useNavigation();
  const [historic, setHistoric] = useState<Historic>();
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [departure, setDeparture] = useState<LocationInfoProps>(
    {} as LocationInfoProps
  );
  const [arrival, setArrival] = useState<LocationInfoProps | null>(null);

  const getHistoricInfo = async () => {
    try {
      const responseHistoric = await getHistoricByIdService(id);
      const locationStorage = await getStorageLocations();

      setHistoric(responseHistoric);
      setCoordinates(locationStorage);

      // if (responseHistoric?.coords?.[0]) {
      //   const location = responseHistoric?.coords?.[0];
      //   const departureStreetName = await getAddressLocation(location);
      //   setDeparture({
      //     label: `Saíndo em ${departureStreetName ?? ""}`,
      //     description: format(
      //       new Date(location.timestamp),
      //       "'dd/MM/yyyy' as 'HH:mm'"
      //     ),
      //   });
      // }

      // if (responseHistoric?.status === "arrived") {
      //   const lastLocation =
      //     responseHistoric?.coords[responseHistoric?.coords.length - 1];
      //   const arrivalStreetName = await getAddressLocation(lastLocation);

      //   setArrival({
      //     label: `Chegando em ${arrivalStreetName ?? ""}`,
      //     description: format(
      //       new Date(lastLocation.timestamp),
      //       "'dd/MM/yyyy' as 'HH:mm'"
      //     ),
      //   });
      // }
      if (locationStorage?.[0]) {
        const location = locationStorage?.[0];
        const departureStreetName = await getAddressLocation(location);
        setDeparture({
          label: `Saíndo em ${departureStreetName ?? ""}`,
          description: format(
            new Date(location.timestamp),
            "dd/MM/yyyy' às 'HH:mm"
          ),
        });
      }

      if (locationStorage.length > 1) {
        const lastLocation = locationStorage[locationStorage.length - 1];
        const arrivalStreetName = await getAddressLocation(lastLocation);

        setArrival({
          label: `Chegando em ${arrivalStreetName ?? ""}`,
          description: format(
            new Date(lastLocation.timestamp),
            "dd/MM/yyyy' às 'HH:mm"
          ),
        });
      }
    } catch (error: any) {
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
      setIsLoading(true);
      if (!historic) {
        return setMessageToast({
          text: "Não foi possível obter os dados para registrar a chegada do veículo.",
          type: "danger",
        });
      }
      const locations = await getStorageLocations();
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
          <Locations departure={departure} arrival={arrival} />

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

export default CheckOutScreen;
