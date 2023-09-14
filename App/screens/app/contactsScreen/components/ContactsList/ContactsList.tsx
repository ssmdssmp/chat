import React from 'react';
import {Contact} from './components';
import {StyledContactsList} from './styled';

const ContactsList = ({data}) => {
  const renderItem = ({item}) => {
    return <Contact settings={item} />;
  };
  return <StyledContactsList data={data} renderItem={renderItem} />;
};

export default ContactsList;
