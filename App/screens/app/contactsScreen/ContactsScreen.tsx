import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '@/styles';
import {Search} from '@/components';
import {ContactsList} from './components';
import {searchUsersByQuery} from '@/services';
import {TUser} from '@/types';

const ContactsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<TUser[]>([]);

  // useEffect(() => {
  //   createNewUser('stepan.bandera@gmail.com', '123123123');
  // });
  useEffect(() => {
    let debounce: ReturnType<typeof setTimeout>;
    if (searchText) {
      debounce = setTimeout(() => {
        searchUsersByQuery(searchText)
          .then(res => {
            let arr: TUser[] = [];
            //@ts-ignore
            Object.entries(res.val()).map(item => {
              arr.push(item[1] as TUser);
            });
            setSearchData(arr);
          })
          .catch(() => setSearchData([]));
      }, 1000);
    } else {
      setSearchData([]);
    }
    return () => {
      clearTimeout(debounce);
    };
  }, [searchText]);
  return (
    <ScreenWrapper padding={8} bgColor="white">
      <Search value={searchText} setValue={setSearchText} />
      <ContactsList data={searchData} />
    </ScreenWrapper>
  );
};

export default ContactsScreen;
