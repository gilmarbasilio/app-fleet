import styled from "styled-components/native";
import theme from "../../theme";
import { TypeButton } from ".";

type ContainerProps = {
  type: TypeButton;
  isLoading?: boolean;
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  align-items: center;
  justify-content: center;
  height: 56px;
  border-radius: 6px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.brand_light};

  ${(props) =>
    props.type === "button" &&
    `background-color: ${props.theme.colors.brand_light};`}

  ${(props) =>
    props.type === "outlined" &&
    `background-color: ${props.theme.colors.black_700};`}

  ${(props) => props.isLoading && `opacity: 0.5;`}
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.md}px;
  font-family: ${({ theme }) => theme.font_family.extra_bold};
`;

export const ActivityIndicator = styled.ActivityIndicator.attrs({
  color: "white",
})``;
