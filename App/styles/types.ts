export type TFlexWrapper = {
  width?: string;
  height?: string;
  dir?: 'row' | 'column';
  bgColor?: string;
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end';
};

export type TWithBgColorProp = {
  bgColor: string;
};
export type TScreenWrapperProps = {
  bgColor: string;
  padding?: number;
};
