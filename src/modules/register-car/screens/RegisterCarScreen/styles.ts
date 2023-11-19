import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button } from "../../../../shared/components/Button";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black_700};
  gap: 30px;
`;

export const FormContainer = styled.View`
  flex: 1;
  gap: 16px;
  padding: 0 32px;
`;

export const ButtonRegisterOutput = styled(Button)`
  margin-top: 20px;
`;

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.font_family.regular};
  text-align: center;
  margin: 24px;
`;
