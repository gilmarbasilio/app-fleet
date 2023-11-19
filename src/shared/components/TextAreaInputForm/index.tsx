import React from "react";
import * as S from "./styles";
import { KeyboardTypeOptions, TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

interface IProps extends TextInputProps {
  label: string;
  name: string;
  control: Control<any>;
  keyboardType?: KeyboardTypeOptions;
}

export const TextAreaInputForm = ({
  label,
  name,
  control,
  keyboardType,
  ...rest
}: IProps) => {
  return (
    <Controller
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <S.Container>
          <S.TextInput
            {...rest}
            placeholder={label}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            multiline
            numberOfLines={5}
          />
          {error && (
            <S.TextInputError style={{ color: "red" }}>
              {error.message}
            </S.TextInputError>
          )}
        </S.Container>
      )}
      name={name}
    />
  );
};
