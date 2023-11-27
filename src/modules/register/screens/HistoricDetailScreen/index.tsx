import * as S from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PrivateStackParamList } from "../../../../routes/private.routes";
import { useToastStore } from "../../../../shared/store/useToastStore";
import HeaderRegisterCar from "../../components/HeaderRegisterCar";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getAddressLocation } from "../../../../shared/utils/getAddressLocation";
import { Loading } from "../../../../shared/components/Loading";
import { LocationInfoProps } from "../../components/LocationInfo";
import Map from "../../../../shared/components/Map";
import { LatLng } from "react-native-maps";
import { format } from "date-fns";
import { Locations } from "../../components/Locations";
import { Historic } from "../../../../shared/models/historicModel";
import { getHistoricByIdService } from "../../../../shared/services/historiesService";

type HistoricDetailScreenProps = NativeStackScreenProps<
  PrivateStackParamList,
  "HistoricDetailScreen"
>;

const HistoricDetailScreen = ({
  route: {
    params: { id },
  },
}: HistoricDetailScreenProps) => {
  const setMessageToast = useToastStore((state) => state.setMessage);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [historic, setHistoric] = useState<Historic>();
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [departure, setDeparture] = useState<LocationInfoProps>(
    {} as LocationInfoProps
  );
  const [arrival, setArrival] = useState<LocationInfoProps | null>(null);

  const getHistoricInfo = async () => {
    try {
      const responseHistoric = await getHistoricByIdService(id);

      setHistoric(responseHistoric);
      setCoordinates(responseHistoric.coords);

      if (responseHistoric?.coords?.[0]) {
        const location = responseHistoric?.coords?.[0];
        const departureStreetName = await getAddressLocation(location);
        setDeparture({
          label: `Saíndo em ${departureStreetName ?? ""}`,
          description: format(
            new Date(location.timestamp),
            "dd/MM/yyyy' às 'HH:mm"
          ),
        });
      }

      if (responseHistoric?.status === "arrived") {
        const lastLocation =
          responseHistoric?.coords[responseHistoric?.coords.length - 1];
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

  return (
    <S.Container>
      <HeaderRegisterCar title="Detalhe de Uso" />
      <ScrollView>
        {coordinates.length > 0 && <Map coordinates={coordinates} />}
        <S.Content>
          <Locations departure={departure} arrival={arrival} />

          <S.Label>Placa do veículo</S.Label>
          <S.LicensePlate>{historic?.licensePlate}</S.LicensePlate>

          <S.Label>Finalidade</S.Label>
          <S.Description>{historic?.description}</S.Description>
        </S.Content>
      </ScrollView>
    </S.Container>
  );
};

export default HistoricDetailScreen;
