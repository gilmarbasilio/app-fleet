import styled from "styled-components/native";
import theme from "../../../../shared/theme";

export const Container = styled.View`
  gap: 10px;
  padding: 0px 25px;
  flex: 1;
  position: relative;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.md}px;
  font-family: ${({ theme }) => theme.font_family.bold};
`;

export const CarInfo = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray_700};
  padding: 20px;
  border-radius: 6px;
`;

export const CarIcon = styled.View`
  width: 77px;
  height: 77px;
  background-color: ${({ theme }) => theme.colors.gray_600};
  padding: 15px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const LoadingList = styled.ActivityIndicator.attrs({
  size: 30,
  color: theme.colors.brand,
})`
  position: absolute;
  height: 77px;
  top: 20px;
  left: 0;
  right: 0;
`;
