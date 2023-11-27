import * as S from "./styles";
import IconBox from "../IconBox";
import { IconBoxFamily } from "../IconBox/types";

export type LocationInfoProps = {
  label: string;
  description: string;
};

type Props = LocationInfoProps & {
  icon: IconBoxFamily;
};

const LocationInfo = ({ label, description, icon }: Props) => {
  return (
    <S.Container>
      <IconBox icon={icon} />
      <S.Info>
        <S.Label numberOfLines={1}>{label}</S.Label>
        <S.Description numberOfLines={1}>{description}</S.Description>
      </S.Info>
    </S.Container>
  );
};

export default LocationInfo;
