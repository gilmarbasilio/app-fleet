import * as S from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useToastStore } from "../../../../shared/store/useToastStore";
import { useAuthStore } from "../../../../shared/store/useAuthStore";
import theme from "../../../../shared/theme";
import { updateUserPhoto } from "../../../../shared/services/user.service";
import { useState } from "react";
import avatarDefault from "../../../../shared/assets/images/avatar-default.jpg";
import { Loading } from "../../../../shared/components/Loading";
import IconBox from "../../../register-car/components/IconBox";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

const HeaderHome = () => {
  const setMessageToast = useToastStore((state) => state.setMessage);
  const user = useAuthStore((state) => state.user);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const theme = useTheme();

  const handleLogOff = async () => {
    Alert.alert("Sair", "Deseja sair do sistema?", [
      {
        text: "Não",
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

  const handlePickImage = async () => {
    try {
      setIsLoadingPhoto(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
        base64: true,
      });
      if (!result.canceled) {
        const imagePicked = result?.assets[0]?.base64;
        if (result?.assets && imagePicked) {
          await updateUserPhoto({
            photo: imagePicked,
          });

          if (user) {
            setUser({
              ...user,
              photo: imagePicked,
            });
          }

          setMessageToast({
            type: "success",
            text: "Foto atualizada com sucesso!",
          });
        } else {
          throw new Error(
            "Ocorreu algum erro ao selecionar a foto, tente novamente."
          );
        }
      }
    } catch (error: any) {
      setMessageToast({
        type: "danger",
        text: error.message,
      });
    } finally {
      setIsLoadingPhoto(false);
    }
  };

  return (
    <S.Container>
      <S.UserInfo>
        {isLoadingPhoto ? (
          <S.LoadingAvatar />
        ) : (
          <S.UserInfoAvatarContainer>
            <S.UserInfoAvatar
              source={
                user?.photo
                  ? {
                      uri: `data:image/png;base64,${user?.photo}`,
                    }
                  : avatarDefault
              }
            />
            <S.UserChangeAvatar onPress={handlePickImage}>
              <FontAwesome
                name="pencil"
                size={14}
                color={theme.colors.brand_light}
              />
            </S.UserChangeAvatar>
          </S.UserInfoAvatarContainer>
        )}
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
