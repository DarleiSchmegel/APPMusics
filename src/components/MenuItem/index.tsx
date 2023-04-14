import React from 'react';
import {Text, TouchableOpacityProps} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Title} from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  isActive?: boolean;
};

export function MenuItem({title, isActive = false, ...rest}: Props) {
  return (
    <Container isActive={isActive} {...rest}>
      {/* <Entypo
        name={title === 'Soft Skills' ? 'user' : 'tools'}
        color="#FFF"
        size={24}
      /> */}
      <Text>
        <Icon name="user" size={30} color="#fff" />
      </Text>

      <Title>{title}</Title>
    </Container>
  );
}
