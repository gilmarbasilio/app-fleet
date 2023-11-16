import styled from "styled-components/native";
import theme from "../../shared/theme";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray_800};
`;

export const LoadIndicator = styled.ActivityIndicator.attrs(() => ({
  color: theme.colors.brand_light,
}))``;