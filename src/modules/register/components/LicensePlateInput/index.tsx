import { Control } from "react-hook-form";
import * as S from "./styles";
import theme from "../../../../shared/theme";

type LicensePlateInputProps = {
  label: string;
  placeholder: string;
  control: Control<any>;
};

const LicensePlateInput = ({
  label,
  placeholder,
  control,
}: LicensePlateInputProps) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Input
        control={control}
        name="plate"
        autoCapitalize="characters"
        label={placeholder}
        maxLength={8}
        placeholderTextColor={theme.colors.white}
      />
    </S.Container>
  );
};

export default LicensePlateInput;
