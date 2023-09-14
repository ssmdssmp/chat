import {View, Text, FlatList, Pressable} from 'react-native';
import React from 'react';

const Folders = ({changeFolder}) => {
  return (
    <FlatList
      contentContainerStyle={{
        width: '100%',
      }}
      horizontal
      data={['All', 'Selected']}
      ItemSeparatorComponent={() => (
        <View style={{height: 30, width: 15}}></View>
      )}
      renderItem={({item}) => (
        <Pressable onPress={changeFolder} style={{height: 30}}>
          <Text>{item}</Text>
        </Pressable>
      )}
    />
  );
};

export default Folders;
