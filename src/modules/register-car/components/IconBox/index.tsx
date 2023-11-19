import { IconProps } from "phosphor-react-native";
import * as S from "./styles";
import { useTheme } from "styled-components";

export type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = {
  size?: S.SizeProps;
  icon: IconBoxProps;
};

const IconBox = ({ size = "normal", icon: Icon }: Props) => {
  const { colors } = useTheme();
  const iconSize = size === "normal" ? 24 : 16;
  return (
    <S.Container size={size}>
      <Icon size={iconSize} color={colors.brand_light} />
    </S.Container>
  );
};

export default IconBox;
