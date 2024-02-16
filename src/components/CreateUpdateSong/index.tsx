import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
  Modal,
  Alert,
} from 'react-native';
import {Form, FormTitle, Input} from '../../screens/styles';
import {KeyboardAvoidingView} from 'react-native';
import {Button} from '../Button';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

import * as Progress from 'react-native-progress';
import {createSong} from '../../databases/services/songServices';
import {donwloadSong} from '../../utils/donwloadSong';

type Props = TouchableOpacityProps & {
  title: string;
  handleModalVisible: (option: boolean) => void;
  modalVisible: boolean;
  fetchData: () => void;
  isNew: boolean;
};

const CreateUpdateSong = ({
  modalVisible,
  handleModalVisible,
  title,
  fetchData,
  isNew,
  ...rest
}: Props) => {
  const [url, setUrl] = useState('');

  const [downloadingStatus, setDownloadingStatus] = useState(0);

  function handleDonwload() {
    setDownloadingStatus(0.01);
    console.log('handledownload');
    donwloadSong({
      videoID: url,
      updateDownloading: updateDownloadingStatus,
    }).then(async ({isOK, message, videoDetails}) => {
      if (isOK) {
        Alert.alert(message);
        await createSong({
          liked: false,
          url: videoDetails.path,
          songDescription: videoDetails.description,
          title: videoDetails.title,
          videoID: videoDetails.videoID,
        });
        fetchData();
        //salvar o videoDetails no banco de dados
      } else {
        //erro ao fazer o download
        Alert.alert('Ops', message);
      }
      setDownloadingStatus(0);
    });
  }
  function updateDownloadingStatus(value: number) {
    setDownloadingStatus(value);
  }
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal fechado');
        handleModalVisible(false);
      }}>
      <Container>
        <Form>
          <Header>
            <FormTitle>{title}</FormTitle>
            <TouchableOpacity onPress={() => handleModalVisible(false)}>
              <Icon name="close" size={22} />
            </TouchableOpacity>
          </Header>

          <KeyboardAvoidingView
            // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={200}>
            <Input placeholder="URL" onChangeText={setUrl} value={url} />
          </KeyboardAvoidingView>
          {downloadingStatus > 0 && (
            <View
              style={{
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginVertical: 5,
                }}>
                Baixando
              </Text>
              <Progress.Bar
                progress={downloadingStatus}
                width={null}
                color="#f25f5c"
                unfilledColor="#ccc"
                borderWidth={0}
                borderRadius={10}
                height={10}
              />
            </View>
          )}
          {/* {console.log('idDis', downloadingStatus !== 0)} */}
          <Button
            disabled={downloadingStatus !== 0}
            title="Baixar"
            onPress={() => handleDonwload()}
          />
        </Form>
      </Container>
    </Modal>
  );
};

const Container = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px 0;
`;
const Header = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

export default CreateUpdateSong;
