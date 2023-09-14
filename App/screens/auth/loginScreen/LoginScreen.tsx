import {Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {logoImg} from '@/assets';
import {
  StyledScreenWrapper,
  LogoImage,
  Wrapper,
  StyledTextInput,
  SubmitButton,
  ButtonText,
  PressableWithMargin,
  ForgotPasswordText,
  SwitchText,
  SwitchWrapper,
  ErrorText,
} from '../styled';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, userActions} from '@/store';
import {AuthNavigationProp} from '@/navigation';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };
  const handleError = (value: string) => {
    setError(value.substring(value.indexOf(']') + 1));
    const clearError = setTimeout(() => {
      setError('');
      clearInterval(clearError);
    }, 3000);
  };
  const submitLogin = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(e =>
          dispatch(
            userActions.login({
              userId: e.user.uid,
              avatar: e.user.photoURL,
              email: e.user.email,
              userName: e.user.displayName,
            }),
          ),
        )
        .catch(e => {
          if (e) {
            handleError(e.toString());
          } else {
            handleError('Unknown error has occured');
          }
        })
        .catch(e => {
          if (e) {
            handleError(e.toString());
          } else {
            handleError('Unknown error has occured');
          }
        });
    } else {
      handleError('Empty Fields are not allowed');
    }
  };
  return (
    <StyledScreenWrapper bgColor="white">
      <LogoImage source={logoImg} />
      <Wrapper>
        <StyledTextInput
          onChangeText={handleEmail}
          value={email}
          placeholder="Email"
        />
        <StyledTextInput
          value={password}
          onChangeText={handlePassword}
          placeholder="Password"
        />
        {error.length > 0 && <ErrorText>{error}</ErrorText>}
        <SubmitButton onPress={submitLogin}>
          <ButtonText>Sign In</ButtonText>
        </SubmitButton>
        <PressableWithMargin>
          <ForgotPasswordText>Forgot password?</ForgotPasswordText>
        </PressableWithMargin>
        <SwitchWrapper dir="row">
          <Text>Don`t have an account?</Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <SwitchText> Sign Up</SwitchText>
          </Pressable>
        </SwitchWrapper>
      </Wrapper>
    </StyledScreenWrapper>
  );
};

export default LoginScreen;
