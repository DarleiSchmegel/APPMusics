import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: #131016;
  padding: 24px;

  padding-top: ${getStatusBarHeight() + 5}px;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #fff;
  font-weight: bold;
  /* margin: 24px 0; */
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 56px;
  border: 1px solid #131016;
  border-radius: 5px;
  padding: 16px;
  background: #fff;
`;

export const Form = styled.View`
  padding-right: 24px;
  padding-left: 24px;
  padding-bottom: 0px;
`;

export const FormTitle = styled.Text`
  font-size: 24px;
  color: #131016;
  font-weight: bold;
  margin-bottom: 12px;
`;
