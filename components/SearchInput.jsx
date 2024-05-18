import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
      <TextInput
        value={value}
        placeholder={'Search for a video topic'}
        placeholderTextColor={'#7b7b8b'}
        onChangeText={handleChangeText}
        className="text-base text-white h-full flex-1 font-pregular pb-4"
        secureTextEntry={title === 'Password' && !showPassword}
        {...props}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;