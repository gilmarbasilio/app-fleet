import styled from "styled-components/native";
import { Button } from "../../../../shared/components/Button";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black_700};
`;

export const ButtonRegisterOutput = styled(Button)`
  margin-top: 30px;
`;

export const Content = styled.View`
  flex-grow: 1;
  padding: 32px;
  gap: 10px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray_300};
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-family: ${({ theme }) => theme.font_family.regular};

  margin-top: 32px;
  margin-bottom: 5px;
`;

export const LicensePlate = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  font-size: ${({ theme }) => theme.font_size.xxxl}px;
  font-family: ${({ theme }) => theme.font_family.bold};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  font-size: ${({ theme }) => theme.font_size.md}px;
  font-family: ${({ theme }) => theme.font_family.regular};
  text-align: justify;
`;
