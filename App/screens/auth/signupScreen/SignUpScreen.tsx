import React, {useState} from 'react';
import {logoImg} from '@/assets';
import {
  ButtonText,
  ErrorText,
  LogoImage,
  StyledScreenWrapper,
  StyledTextInput,
  SubmitButton,
  SwitchText,
  SwitchWrapper,
  Wrapper,
} from '../styled';
import {Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProp} from '@/navigation';
import {useAppDispatch, userActions} from '@/store';
import {createNewUser} from '@/services';

const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const handleError = (e: string) => {
    console.log(e);
    setError(e.substring(e.indexOf(']') + 1));
    const clearError = setTimeout(() => {
      setError('');
      clearInterval(clearError);
    }, 2000);
  };
  const navigation = useNavigation<AuthNavigationProp>();

  const signUp = () => {
    if (email && password) {
      createNewUser(email, password)
        .then(user => {
          dispatch(
            userActions.login({
              userId: user.uid,
              avatar: user.photoURL,
              userName: user.displayName,
              email: user.email,
            }),
          );
        })
        .catch((e: Error) => {
          handleError(e.toString());
        });
    } else {
      handleError('Empty fields are not allowed');
    }
  };

  return (
    <StyledScreenWrapper bgColor="white">
      <LogoImage source={logoImg} />
      <Wrapper>
        <StyledTextInput
          value={email}
          placeholderTextColor="#a7a7a7"
          onChangeText={handleEmail}
          placeholder="Email"
        />
        <StyledTextInput
          value={password}
          placeholderTextColor="#a7a7a7"
          onChangeText={handlePassword}
          placeholder="Password"
        />
        {error.length > 0 && <ErrorText>{error}</ErrorText>}
        <SubmitButton onPress={signUp}>
          <ButtonText>Sign Up</ButtonText>
        </SubmitButton>
        <SwitchWrapper dir="row" justify="center">
          <Text>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <SwitchText>Log in</SwitchText>
          </Pressable>
        </SwitchWrapper>
      </Wrapper>
    </StyledScreenWrapper>
  );
};

export default SignUpScreen;
