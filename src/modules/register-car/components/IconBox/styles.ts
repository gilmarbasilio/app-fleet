import styled, { css } from "styled-components/native";

export type SizeProps = "small" | "normal";

type Props = {
  size: SizeProps;
};

const variantSizeStyles = (size: SizeProps) => {
  return {
    small: css`
      width: 32px;
      height: 32px;
    `,
    normal: css`
      width: 46px;
      height: 46px;
    `,
  }[size];
};

export const Container = styled.View<Props>`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray_700};
  justify-content: center;
  align-items: center;
  margin-right: 12px;

  ${({ size }) => variantSizeStyles(size)};
  /* flex-direction: row; */
  /* align-items: center; */
`;

export const Info = styled.View`
  flex: 1;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray_300};
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-family: ${({ theme }) => theme.font_family.regular};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-family: ${({ theme }) => theme.font_family.regular};
`;
