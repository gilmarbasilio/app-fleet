import React from "react";
import * as S from "./styles";
import { KeyboardTypeOptions } from "react-native";
import { Control, Controller } from "react-hook-form";

type IProps = {
  label: string;
  name: string;
  control: Control<any>;
  secureText?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export const TextInputForm = ({
  label,
  name,
  control,
  secureText,
  keyboardType,
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
            placeholder={label}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            secureTextEntry={secureText}
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
