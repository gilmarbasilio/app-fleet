import * as S from "./styles";

export type TypeButton = "button" | "outlined";

type ButtonProps = {
  onPress: () => void;
  title: string;
  type?: TypeButton;
  isLoading?: boolean;
};

export const Button = ({
  title,
  onPress,
  type = "button",
  isLoading,
  ...rest
}: ButtonProps) => {
  return (
    <S.Container
      {...rest}
      isLoading={isLoading}
      onPress={!isLoading ? onPress : () => null}
      type={type}
    >
      {isLoading ? <S.ActivityIndicator /> : <S.Title>{title}</S.Title>}
    </S.Container>
  );
};
