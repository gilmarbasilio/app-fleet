import * as S from "./styles";

export type TypeButton = "button" | "outlined";

type ButtonProps = {
  onPress: () => void;
  title: string;
  type?: TypeButton;
};

export const Button = ({
  title,
  onPress,
  type = "button",
  ...rest
}: ButtonProps) => {
  return (
    <S.Container {...rest} onPress={onPress} type={type}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
