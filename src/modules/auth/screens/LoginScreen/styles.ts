import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button } from "../../../../shared/components/Button";

export const ImageBackground = styled.ImageBackground`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black_700};
  height: 60%;
`;

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const ScrollView = styled.ScrollView``;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export const Logo = styled.Image`
  align-items: center;
`;

export const FormContainer = styled.View`
  padding: 0 30px;
  gap: 20px;
  margin-bottom: 30px;
`;

export const TitleForm = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  font-size: ${({ theme }) => theme.font_size.xl}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  text-align: center;
  margin-bottom: 5px;
`;

export const ButtonLogin = styled(Button)`
  margin-top: 20px;
`;

export const CreateAccountContainer = styled.View`
  padding: 0 30px;
  gap: 10px;
  flex: 1;
  justify-content: flex-end;
`;

export const ButtonCreateAccount = styled(Button)``;

export const TitleCreateAccount = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  font-size: ${({ theme }) => theme.font_size.lg}px;
  font-family: ${({ theme }) => theme.font_family.regular};
  text-align: center;
  margin-bottom: 5px;
`;
