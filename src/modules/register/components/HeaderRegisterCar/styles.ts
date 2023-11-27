import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.gray_700};
  flex-direction: row;
  justify-content: space-between;
  padding: 0 32px 24px;
`;

export const GoBack = styled.TouchableOpacity``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  font-size: ${({ theme }) => theme.font_size.xl}px;
  font-family: ${({ theme }) => theme.font_family.bold};
`;
