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
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import {
  LocationAccuracy,
  LocationObjectCoords,
  LocationSubscription,
  useForegroundPermissions,
  watchPositionAsync,
} from "expo-location";
import { getAddressLocation } from "../../../../shared/utils/getAddressLocation";
import { Loading } from "../../../../shared/components/Loading";
import LocationInfo from "../../components/LocationInfo";
import Map from "../../../../shared/components/Map";

const registerCarUseSchema = z
  .object({
    name: z
      .string({
        required_error: "O nome é obrigatório",
      })
      .min(3, { message: "O nome tem que ter no mínimo 3 caracteres" }),
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .email({
        message: "Email é inválido",
      }),
    password: z
      .string({
        required_error: "A senha é obrigatória",
      })
      .min(6, {
        message: "A senha tem que ter no minimo 6 caracteres",
      }),
    confirmPassword: z.string({
      required_error: "A confirmação de sernha é obrigatória",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A confirmação de senha não é igual a senha",
    path: ["confirmPassword"],
  });

type RegisterCarUseSchema = z.infer<typeof registerCarUseSchema>;

type RegisterCarScreenProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "RegisterCarScreen"
>;

const RegisterCarScreen = () => {
  const { navigate } = useNavigation<RegisterCarScreenProps>();
  const setMessageToast = useToastStore((state) => state.setMessage);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] =
    useState<LocationObjectCoords | null>(null);

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

  if (isLoadingLocation) {
    return <Loading />;
  }

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
            onPress={() => null}
          />
        </S.FormContainer>
      </ScrollView>
    </S.Container>
  );
};

export default RegisterCarScreen;
