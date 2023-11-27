import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.View`
  flex: 1;
  gap: 5px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray_300};
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-family: ${({ theme }) => theme.font_family.regular};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-family: ${({ theme }) => theme.font_family.regular};
`;
