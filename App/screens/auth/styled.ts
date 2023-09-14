import {
  FlexWrapper,
  ScreenWrapper,
  theme,
  widthWithBasePadding,
} from '@/styles';
import styled from 'styled-components/native';
import {theme as colors} from '@/styles';
export const StyledScreenWrapper = styled(ScreenWrapper)`
  justify-content: center;
`;

export const LogoImage = styled.Image`
  width: 80px;
  background-color: white;
  border-radius: 20px;
  height: 80px;
`;

export const Wrapper = styled(FlexWrapper)`
  align-items: center;
  margin-top: 50px;
  height: auto;
`;

export const StyledTextInput = styled.TextInput`
  width: ${widthWithBasePadding}px;
  border: 1px solid #dadada;
  border-radius: 12px;
  margin-bottom: 15px;
  color: #a7a7a7;
  padding: 12px;
`;

export const SubmitButton = styled.Pressable`
  padding: 15px 0px;
  width: ${widthWithBasePadding}px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.light.accentColor};
  border-radius: 12px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const PressableWithMargin = styled.Pressable`
  margin-top: 15px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 12px;
`;

export const SwitchWrapper = styled(FlexWrapper)`
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
`;

export const SwitchText = styled.Text`
  margin-left: 5px;
  /* font-weight: bold; */
  color: ${colors.light.accentColor};
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-bottom: 15px;
`;
