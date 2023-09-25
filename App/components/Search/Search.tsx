import React, {useRef, useState} from 'react';
import {searchIcon} from '@/assets';
import {SearchWrapper, StyledTextInput} from './styled';
import {SvgXml} from 'react-native-svg';

const Search = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (text: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);
  const handlePress = () => {
    ref.current.focus();
  };
  return (
    <SearchWrapper onPress={handlePress}>
      {isFocused ? null : <SvgXml xml={searchIcon} height={15} width={15} />}
      <StyledTextInput
        ref={ref}
        style={{width: isFocused ? '100%' : 'auto'}}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={text => setValue(text)}
        placeholder="Search"
      />
    </SearchWrapper>
  );
};

export default Search;
