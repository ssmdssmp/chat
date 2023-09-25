import styled from 'styled-components/native';

export const ChatHeaderWrapper = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  padding: 0px 15px;
`;

export const ReceiverProfileWrapper = styled.View`
  flex-direction: row;
  padding-left: 5%;
  align-items: center;
`;

export const Options = styled.Pressable`
  position: absolute;
  right: 20px;
  top: 8px;
`;

export const ReceiverProfileText = styled.View`
  margin-left: 10px;
`;
