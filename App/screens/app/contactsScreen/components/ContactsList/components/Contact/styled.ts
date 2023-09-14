import styled from 'styled-components/native';
export const ContactPressableWrapper = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 2px;
  border-bottom-color: #f1f1f1;
  width: 100%;
  position: relative;
`;
export const BorderMask = styled.View`
  position: absolute;
  bottom: -2px;
  background-color: white;
  left: 0;
  width: 65px;
  height: 4px;
`;

export const StyledImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 40px;
`;

export const ContactTextWrapper = styled.View`
  margin-left: 10px;
`;

export const UsernameText = styled.Text`
  margin-bottom: 5px;
  font-size: 16px;
`;

export const LastSeenText = styled.Text`
  font-size: 14px;
`;
