import * as S from "./styles";
import loginBackground from "../../shared/assets/images/login-background.png";
import logoAndSlogan from "../../shared/assets/images/logo-and-slogan.png";
import { TextInputForm } from "../../components/TextInputForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginService } from "../../shared/services/auth.service";
import { saveAuthTokenStorage } from "../../shared/storage/authToken.storage";
import { useToastStore } from "../../shared/store/useToastStore";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { PublicStackParamList } from "../../routes/public.routes";
import { useNavigation } from "@react-navigation/native";

const loginSchema = z.object({
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
});

type LoginSchema = z.infer<typeof loginSchema>;

type LoginScreenProps = NativeStackNavigationProp<
  PublicStackParamList,
  "LoginScreen"
>;

const LoginScreen = () => {
  const { navigate } = useNavigation<LoginScreenProps>();
  const [isLoading, setIsLoading] = useState(false);
  const setMessageToast = useToastStore((state) => state.setMessage);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginSchema) => {
    try {
      setIsLoading(true);

      const response = await loginService({
        email: data.email,
        password: data.password,
      });

      await saveAuthTokenStorage({ token: response.token });
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
            <S.TitleForm>Acesse sua conta</S.TitleForm>
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
            <S.ButtonLogin
              title="Entrar"
              onPress={handleSubmit(handleLogin)}
              isLoading={isLoading}
            />
          </S.FormContainer>
          <S.CreateAccountContainer>
            <S.TitleCreateAccount>Ainda não tem acesso?</S.TitleCreateAccount>
            <S.ButtonCreateAccount
              title="Criar conta"
              type="outlined"
              onPress={() => navigate("RegisterScreen")}
            />
          </S.CreateAccountContainer>
        </S.Container>
      </S.ScrollView>
    </S.ImageBackground>
  );
};

export default LoginScreen;
