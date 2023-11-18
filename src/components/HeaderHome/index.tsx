import * as S from "./styles";
import { useToastStore } from "../../shared/store/useToastStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { PrivateStackParamList } from "../../routes/private.routes";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../shared/theme";
import { useAuthStore } from "../../shared/store/useAuthStore";
import { Alert } from "react-native";

const HeaderHome = () => {
  const setMessageToast = useToastStore((state) => state.setMessage);
  const user = useAuthStore((state) => state.user);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogOff = async () => {
    Alert.alert("Sair", "Deseja sair do sistema?", [
      {
        text: "Voltar",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          setToken(undefined);
          setUser(undefined);
        },
      },
    ]);
  };

  return (
    <S.Container>
      <S.UserInfo>
        <S.UserInfoAvatar
          source={{
            uri: "data:image/png;base64,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",
          }}
        />
        <S.UserInfoDetails>
          <S.UserInfoDetailsGreetings>Olá,</S.UserInfoDetailsGreetings>
          <S.UserInfoDetailsName>{user?.name}</S.UserInfoDetailsName>
        </S.UserInfoDetails>
      </S.UserInfo>
      <S.UserLogOff onPress={handleLogOff}>
        <MaterialIcons
          name="power-settings-new"
          size={30}
          color={theme.colors.gray_400}
        />
      </S.UserLogOff>
    </S.Container>
  );
};

export default HeaderHome;
