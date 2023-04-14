import React, {useRef, useState, useEffect} from 'react';
import {FlatList, Alert, KeyboardAvoidingView, Text, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Menu, MenuTypeProps} from '../components/Menu';
// import {Skill} from '../components/Skill';
// import {Button} from '../components/Button';

import {Container, Title, Input, Form, FormTitle} from './styles';

import {database} from '../databases';
// import {PlaylistModel} from '../databases/model/playlistModel';
// import {Q} from '@nozbe/watermelondb';
import {SongModel} from '../databases/model/songModel';
import {Button} from '../components/Button';
import NewMusic from '../components/NewSong';

export function Home() {
  const [url, setUrl] = useState('');
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [song, setSong] = useState<SongModel>({} as SongModel);
  const bottomSheetRef = useRef<BottomSheet>(null);

  async function handleSave() {
    if (song.id) {
      await database.write(async () => {
        await song.update(data => {
          (data.url = ''),
            (data.title = ''),
            (data.description = ''),
            (data.liked = false);
        });
      });

      Alert.alert('Updated!');
      setSong({} as SongModel);
    } else {
      await database.write(async () => {
        await database.get<SongModel>('song').create(data => {
          (data.url = ''),
            (data.title = ''),
            (data.description = ''),
            (data.liked = false);
        });
      });
      Alert.alert('Created!');
    }

    bottomSheetRef.current?.collapse();
    fetchData();
    bottomSheetRef.current?.collapse();
  }

  async function handleRemove(item: SongModel) {
    await database.write(async () => {
      await item.destroyPermanently();
    });

    fetchData();
    Alert.alert('Deleted!');
  }

  async function fetchData() {
    // // await clearDatabase();
    try {
      const response = database
        .get('song')
        .query()
        .fetch() as unknown as SongModel[];

      setSongs(response);
    } catch (error) {
      console.log('erro', error);
    }
  }

  async function handleEdit(item: SongModel) {}

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Title>Minhas Músicas</Title>
      {/* <Menu type={''} setType={() => console.log('click')} /> */}

      {songs.length > 0 && (
        <FlatList
          data={songs}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <Text>titulo: {item.title}</Text>
              <Text>descrição: {item.description}</Text>
              <Text>url: {item.url}</Text>
              <Text>curtiu: {item.liked}</Text>
            </View>
          )}
        />
      )}
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={['1%', '35%']}>
        <Form>
          <FormTitle>Nova Música</FormTitle>

          <KeyboardAvoidingView
            // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={200}>
            <Input placeholder="URL" onChangeText={setUrl} value={url} />
          </KeyboardAvoidingView>
          <Button title="Adiconar" onPress={handleSave} />
        </Form>
      </BottomSheet>
      {/* <NewMusic title="teste" /> */}
    </Container>
  );
}
