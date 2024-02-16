import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

type RoundButtonProps = TouchableOpacityProps & {
  iconName: string;
  size?: number;
};

const RoundButton = ({iconName, size = 25, ...props}: RoundButtonProps) => {
  return (
    <TouchableOpacity {...props}>
      <Button>
        <Icon name={iconName} size={size} color="#fff" />
      </Button>
    </TouchableOpacity>
  );
};
// #0ca3a3
const Button = styled.View`
  background-color: #f25f5c;
  border-radius: 50px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

export default RoundButton;
