/* eslint-disable prettier/prettier */
import React, {useRef, useState, useEffect} from 'react';
import {Alert, KeyboardAvoidingView, Text, View} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Progress from 'react-native-progress';
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
import {donwloadSong} from '../utils/donwloadSong';
import styled from 'styled-components/native';
import RoundButton from '../components/RoundButton';
import CreateUpdateSong from '../components/CreateUpdateSong';
import {AudioPlayer} from '../components/AudioPlayer';
import {
  SongDataFormated,
  deleteSongById,
  fetchSongs,
  fetchSongsDataFormated,
} from '../databases/services/songServices';

export function Home() {
  const [url, setUrl] = useState('');
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [songsFormated, setSongsFormated] = useState<SongDataFormated[]>([]);
  const [song, setSong] = useState<SongModel>({} as SongModel);
  const [downloadingStatus, setDownloadingStatus] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  async function fetchData() {
    // // await clearDatabase();
    try {
      fetchSongsDataFormated();
      await fetchSongsDataFormated()
        .then(response => {
          setSongsFormated(response as unknown as SongDataFormated[]);
          // console.log('formated', songsFormated);
        })
        .catch(err => {
          Alert.alert('Erro', err);
        });
    } catch (error) {
      console.log('erro', error);
    }
  }

  async function handleModal(option: boolean) {
    setModalIsOpen(option);
  }

  function updateDownloadingStatus(valeu: number) {
    setDownloadingStatus(valeu);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <Container>
        <CreateUpdateSong
          modalVisible={modalIsOpen}
          handleModalVisible={handleModal}
          fetchData={fetchData}
          title="Buscar Música"
          isNew={true}
        />
        <Header>
          <Title>Minhas Músicas</Title>
          <RoundButton iconName="plus" onPress={() => handleModal(true)} />
        </Header>

        {songsFormated && (
          <FlatList
            data={songsFormated}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <View>
                  <Title>{`url: ${item.id}`}</Title>
                  <Text style={{color: '#fff'}}>title: {item.title}</Text>
                  <Text style={{color: '#fff'}}>path: {item.url}</Text>
                  <RoundButton
                    iconName="delete"
                    size={25}
                    onPress={() => {
                      deleteSongById(item.id)
                        .then(res => {
                          if (res) {
                            fetchData();
                          }
                        })
                        .catch();
                    }}
                  />
                </View>
              );
            }}
          />
        )}

        <BottomSheet
          style={{marginBottom: 50}}
          ref={bottomSheetRef}
          index={0}
          snapPoints={['3%', '50%']}>
          {songsFormated.length > 0 && (
            <AudioPlayer uri="url" playList={songsFormated} />
          )}
        </BottomSheet>
        {/* <NewMusic title="teste" /> */}
      </Container>
    </SafeAreaProvider>
  );
}

const Header = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;
