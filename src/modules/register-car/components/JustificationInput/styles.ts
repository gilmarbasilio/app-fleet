import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { TextInputForm } from "../../../../shared/components/TextInputForm";
import { TextAreaInputForm } from "../../../../shared/components/TextAreaInputForm";

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

export const TextArea = styled(TextAreaInputForm)`
  color: ${({ theme }) => theme.colors.gray_300};
  font-size: ${({ theme }) => theme.font_size.md}px;
  font-family: ${({ theme }) => theme.font_family.regular};
  margin-top: 16px;
  border: 0;
  height: 80px;
  vertical-align: top;
  padding-left: 0;
  background-color: ${({ theme }) => theme.colors.gray_700};
`;
