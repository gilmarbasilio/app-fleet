import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  gap: 5px;
  padding: 20px 25px;
  background-color: ${({ theme }) => theme.colors.gray_600};
  align-items: center;
  border-radius: 6px;
`;

export const ItemContainer = styled.View`
  flex: 1;
  justify-items: center;
  gap: 5px;
`;

export const Plate = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.md}px;
  font-family: ${({ theme }) => theme.font_family.bold};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.xs}px;
  font-family: ${({ theme }) => theme.font_family.regular};
`;

export const ItemButton = styled.TouchableOpacity``;
