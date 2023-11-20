import * as S from "./styles";
import { useTheme } from "styled-components";
import { IconComponentMap, IconBoxFamily } from "./types";

export type IconBoxProps = {
  icon: IconBoxFamily;
  size?: S.SizeProps;
};

const IconBox = ({ icon, size = "normal" }: IconBoxProps) => {
  const { colors } = useTheme();
  const IconComponent: JSX.ElementType = IconComponentMap[icon.iconName];

  const iconSize = size === "normal" ? 24 : 16;

  return (
    <S.Container size={size}>
      <IconComponent
        name={icon.name}
        size={iconSize}
        color={colors.brand_light}
      />
    </S.Container>
  );
};

export default IconBox;
