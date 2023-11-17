import * as S from "./styles";
import loginBackground from "../../shared/assets/images/login-background.png";
import logoAndSlogan from "../../shared/assets/images/logo-and-slogan.png";
import { TextInputForm } from "../../components/TextInputForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerService } from "../../shared/services/auth.service";
import { useToastStore } from "../../shared/store/useToastStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PublicStackParamList } from "../../routes/public.routes";
import { useNavigation } from "@react-navigation/native";
const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "O nome é obrigatório",
      })
      .min(3, { message: "O nome tem que ter no mínimo 3 caracteres" }),
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .email({
        message: "Email é inválido",
      }),
    password: z
      .string({
        required_error: "A senha é obrigatória",
      })
      .min(6, {
        message: "A senha tem que ter no minimo 6 caracteres",
      }),
    confirmPassword: z.string({
      required_error: "A confirmação de sernha é obrigatória",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A confirmação de senha não é igual a senha",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

type RegisterScreenProps = NativeStackNavigationProp<
  PublicStackParamList,
  "RegisterScreen"
>;

const RegisterScreen = () => {
  const { navigate } = useNavigation<RegisterScreenProps>();
  const [isLoading, setIsLoading] = useState(false);
  const setMessageToast = useToastStore((state) => state.setMessage);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const handleLogin = async (data: RegisterSchema) => {
    try {
      setIsLoading(true);

      await registerService({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setMessageToast({
        type: "success",
        text: "Usuário criado com sucesso!",
      });

      navigate("LoginScreen");
    } catch (error: any) {
      setMessageToast({
        type: "danger",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.ImageBackground source={loginBackground}>
      <S.ScrollView showsVerticalScrollIndicator={false}>
        <S.Container>
          <S.LogoContainer>
            <S.Logo source={logoAndSlogan} />
          </S.LogoContainer>
          <S.FormContainer>
            <S.TitleForm>Crie sua conta</S.TitleForm>
            <TextInputForm control={control} name="name" label="Nome" />
            <TextInputForm
              control={control}
              name="email"
              label="E-mail"
              keyboardType="email-address"
            />
            <TextInputForm
              control={control}
              name="password"
              label="Senha"
              secureText
            />
            <TextInputForm
              control={control}
              name="confirmPassword"
              label="Confirme a Senha"
              secureText
            />
            <S.ButtonLogin
              title="Criar a conta"
              onPress={handleSubmit(handleLogin)}
              isLoading={isLoading}
            />
          </S.FormContainer>
          <S.ButtonGoBackContainer>
            <S.ButtonGoBack
              title="Voltar para o login"
              type="outlined"
              onPress={() => navigate("LoginScreen")}
            />
          </S.ButtonGoBackContainer>
        </S.Container>
      </S.ScrollView>
    </S.ImageBackground>
  );
};

export default RegisterScreen;
