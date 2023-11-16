import styled from "styled-components/native";
import theme from "../../shared/theme";
import { TypeButton } from ".";

type ContainerProps = {
  type: TypeButton;
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
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.md}px;
  font-family: ${({ theme }) => theme.font_family.extra_bold};
`;
