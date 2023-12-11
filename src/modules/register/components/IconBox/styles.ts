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
  // outra forma de fazer
  // const data = {
  //   small: css`
  //     width: 32px;
  //     height: 32px;
  //   `,
  //   normal: css`
  //     width: 46px;
  //     height: 46px;
  //   `,
  // };
  // return data[size]
};

export const Container = styled.View<Props>`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray_700};
  justify-content: center;
  align-items: center;
  margin-right: 12px;

  ${({ size }) => variantSizeStyles(size)};
`;
