import React from 'react';
import {SvgXml} from 'react-native-svg';
import {TActionButtonProps} from './types';
import {ActionText, IconWrapper, StyledPressable} from './styled';

const ActionButton = ({
  xml,
  text,
  iconColor,
  textColor,
  bgColor,
  iconBgColor,
  onPress,
}: TActionButtonProps) => {
  const handlePress = () => {
    onPress();
  };
  return (
    <StyledPressable bgColor={bgColor} onPress={handlePress}>
      <IconWrapper iconBgColor={iconBgColor}>
        <SvgXml fill={iconColor} height={30} width={30} xml={xml} />
      </IconWrapper>
      <ActionText textColor={textColor}>{text}</ActionText>
    </StyledPressable>
  );
};
export default ActionButton;
