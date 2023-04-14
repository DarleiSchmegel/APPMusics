import React from 'react';
import {MenuItem} from '../MenuItem';

import {Container} from './styles';

export type MenuTypeProps = 'playlist' | 'favorits';

type Props = {
  type: string;
  setType: (value: MenuTypeProps) => void;
};

export function Menu({type, setType}: Props) {
  return (
    <Container>
      <MenuItem
        title="Soft Skills"
        isActive={type === 'playlist'}
        onPress={() => setType('playlist')}
      />

      <MenuItem
        title="Hard Skills"
        isActive={type === 'favorits'}
        onPress={() => setType('favorits')}
      />
    </Container>
  );
}
