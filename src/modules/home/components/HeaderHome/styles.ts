import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Loading } from "../../../../shared/components/Loading";

export const Container = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray_700};
  gap: 5px;
  padding: 30px 25px;
`;

export const UserInfo = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const UserInfoAvatarContainer = styled.View`
  width: 55px;
  height: 55px;
  position: relative;
`;

export const UserInfoAvatar = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 6px;
`;

export const UserChangeAvatar = styled.TouchableOpacity`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  bottom: -5px;
  right: -5px;
`;

export const LoadingAvatar = styled(Loading)`
  width: 55px;
  height: 55px;
  flex: none;
  border-radius: 6px;
`;

export const UserInfoDetails = styled.View``;

export const UserInfoDetailsGreetings = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.lg}px;
  font-family: ${({ theme }) => theme.font_family.regular};
`;

export const UserInfoDetailsName = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.lg}px;
  font-family: ${({ theme }) => theme.font_family.extra_bold};
`;

export const UserLogOff = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
