import * as S from "./styles";
import { Control } from "react-hook-form";

type JustificationInputProps = {
  label: string;
  placeholder: string;
  control: Control<any>;
};

const JustificationInput = ({
  label,
  placeholder,
  control,
}: JustificationInputProps) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.TextArea control={control} name="justification" label={placeholder} />
    </S.Container>
  );
};

export default JustificationInput;
