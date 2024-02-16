// import * as path from 'path';
import {Alert} from 'react-native';
import RNFS from 'react-native-fs';
import ytdl from 'react-native-ytdl';
import {checkSongExists} from '../databases/services/songServices';

interface videoDetailsProps {
  title: string;
  description: string;
  videoID: string;
  path: string;
  liked: boolean;
}
interface donwloadSongResponse {
  message: string;
  isOK: boolean;
  videoDetails: videoDetailsProps;
}

interface donwloadSongProps {
  videoID: string;
  updateDownloading: (value: number) => void;
}

export async function donwloadSong({
  videoID,
  updateDownloading,
}: donwloadSongProps): Promise<donwloadSongResponse> {
  const isValid = await ytdl.validateURL(videoID);

  console.log('é valido?', isValid);
  if (!isValid) {
    return {
      message: 'URL invalida!',
      isOK: false,
      videoDetails: {
        description: '',
        liked: false,
        path: '',
        title: '',
        videoID: '',
      },
    };
  }

  const isIdValid = await ytdl.getURLVideoID(videoID);
  console.log('chegou', isIdValid);
  if (!isIdValid) {
    return {
      message: 'URL invalida!',
      isOK: false,
      videoDetails: {
        description: '',
        liked: false,
        path: '',
        title: '',
        videoID: '',
      },
    };
  }

  const alreadyExistsSong = await checkSongExists(isIdValid);
  if (alreadyExistsSong) {
    return {
      message: `Video do youtube com ID: ${isIdValid} já foi baixado anteriormente`,
      isOK: false,
      videoDetails: {
        description: '',
        liked: false,
        path: '',
        title: '',
        videoID: '',
      },
    };
  }
  const info = await ytdl.getInfo(videoID);
  if (!info) {
    return {
      message: 'Sem Info do Video!',
      isOK: false,
      videoDetails: {
        description: '',
        liked: false,
        path: '',
        title: '',
        videoID: '',
      },
    };
  }

  const fileName = `${isIdValid}.mp3`;
  const downloadDest = `${RNFS.DocumentDirectoryPath}/songs/${fileName}`; // Diretório onde o arquivo será salvo
  // console.log('fileName', fileName, '\ndownloadDest', downloadDest);

  const urlResponse = await ytdl(videoID, {quality: '140'});

  const url = urlResponse[0].url; //URL para download

  const videoDetails = {
    title: info.videoDetails.title,
    description: info.videoDetails.description || '',
    videoID: isIdValid,
    path: downloadDest,
    liked: false,
  };
  await RNFS.exists(`${RNFS.DocumentDirectoryPath}/songs`)
    .then(exists => {
      if (exists) {
        console.log('O diretório existe!');
      } else {
        console.log('O diretório não existe. Criando...');
        return RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/songs`);
      }
    })
    .then(() => {
      console.log('Diretório criado com sucesso!');
    })
    .catch(error => {
      console.log('Erro:', error.message);
    });

  // console.log(url)
  return await RNFS.downloadFile({
    fromUrl: url,
    toFile: downloadDest,
    progress: (res: DownloadProgressCallbackResult) => {
      const progress = res.bytesWritten / res.contentLength;
      updateDownloading(progress);
      // console.log(`Download progress: ${progress}%`);
    },
  })
    .promise.then(res => {
      console.log('Arquivo baixado com sucesso sem res!');
      console.log('Arquivo baixado com sucesso!', res);
      if (res.statusCode == 200) {
        console.log('OK-baixado', res.statusCode);
        return {
          isOK: true,
          videoDetails,
          message: 'Arquivo baixado com sucesso!',
        };
      } else {
        console.log('erro ao baixar', res.statusCode);
        return {
          isOK: false,
          videoDetails,
          message: 'Erro ao baixar!' + res.statusCode,
        };
      }
      // Alert.alert('Arquivo baixado com sucesso!');
      return {
        isOK: true,
        videoDetails,
        message: 'Arquivo baixado com sucesso!',
      };
    })
    .catch(err => {
      Alert.alert('Erro ao baixar o arquivo:', err);
      console.log('Erro ao baixar o arquivo:', err);
      return {isOK: false, videoDetails, message: 'Erro ao baixar o arquivo:'};
    });
}

export async function deleteFile(fileName: string): Promise<boolean> {
  const filePath = `${RNFS.DocumentDirectoryPath}/songs/${fileName}.mp3`;

  try {
    await RNFS.unlink(filePath);
    console.log('Arquivo excluído com sucesso!');
    return true;
  } catch (error) {
    console.log(`Erro ao excluir arquivo: ${error}` + filePath);
    return false;
  }
}

type DownloadFileOptions = {
  fromUrl: string; // URL to download file from
  toFile: string; // Local filesystem path to save the file to
  headers?: Headers; // An object of headers to be passed to the server
  background?: boolean; // Continue the download in the background after the app terminates (iOS only)
  discretionary?: boolean; // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)
  cacheable?: boolean; // Whether the download can be stored in the shared NSURLCache (iOS only, defaults to true)
  progressInterval?: number;
  progressDivider?: number;
  begin?: (res: DownloadBeginCallbackResult) => void; // Note: it is required when progress prop provided
  progress?: (res: DownloadProgressCallbackResult) => void;
  resumable?: () => void; // only supported on iOS yet
  connectionTimeout?: number; // only supported on Android yet
  readTimeout?: number; // supported on Android and iOS
  backgroundTimeout?: number; // Maximum time (in milliseconds) to download an entire resource (iOS only, useful for timing out background downloads)
};
type DownloadBeginCallbackResult = {
  jobId: number; // The download job ID, required if one wishes to cancel the download. See `stopDownload`.
  statusCode: number; // The HTTP status code
  contentLength: number; // The total size in bytes of the download resource
  headers: Headers; // The HTTP response headers from the server
};
type DownloadProgressCallbackResult = {
  jobId: number; // The download job ID, required if one wishes to cancel the download. See `stopDownload`.
  contentLength: number; // The total size in bytes of the download resource
  bytesWritten: number; // The number of bytes written to the file so far
};
