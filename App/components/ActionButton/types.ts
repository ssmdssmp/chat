export type TActionButtonProps = {
  xml: string;
  text: string;
  iconColor: string;
  textColor: string;
  bgColor: string;
  iconBgColor: string;
  onPress: () => void;
};

export type TActionPressableProps = {
  bgColor: string;
  padding: number;
};

export type TActionText = {
  textColor: string;
};

export type TActionPressable = {
  bgColor: string;
};

export type TActionIconWrapper = {
  iconBgColor: string;
};
