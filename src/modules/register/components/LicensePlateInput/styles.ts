import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { TextInputForm } from "../../../../shared/components/TextInputForm";

export const Container = styled.View`
  padding: 16px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray_700};
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray_300};
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-family: ${({ theme }) => theme.font_family.regular};
`;

export const Input = styled(TextInputForm)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.xxxl}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  text-align: center;
  margin-top: 16px;
  border: 0;
  background-color: ${({ theme }) => theme.colors.gray_700};
`;
