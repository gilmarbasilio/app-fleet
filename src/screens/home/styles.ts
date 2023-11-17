import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black_700};
  height: 100px;
`;

export const Header = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray_700};
  gap: 5px;
  padding: 30px 25px;
  align-items: space-between;
  justify-items: center;
`;

export const UserInfo = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const UserInfoAvatar = styled.Image`
  width: 55px;
  height: 55px;
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

export const UserLogOff = styled.View`
  /* flex: 1; */
  justify-content: center;
  align-items: center;
`;
