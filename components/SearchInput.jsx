import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { usePathname, router } from 'expo-router';

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
      <TextInput
        value={query}
        placeholder={'Search for a video topic'}
        placeholderTextColor={'#cdcde0'}
        onChangeText={(e) => setQuery(e)}
        className="text-base text-white h-full flex-1 font-pregular"
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) return Alert.alert('Please enter a search query');

          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
