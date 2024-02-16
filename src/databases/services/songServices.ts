import {Alert} from 'react-native';
import {database} from '../index';
import {SongModel} from '../model/songModel';
import {Q} from '@nozbe/watermelondb';
import {deleteFile} from '../../utils/donwloadSong';

interface CreateSongProps {
  videoID: string;
  title: string;
  songDescription: string;
  url: string;
  liked: boolean;
}
export async function createSong({
  title,
  songDescription,
  videoID,
  url,
  liked,
}: CreateSongProps) {
  try {
    await database
      .write(async () => {
        await database.get<SongModel>('song').create(data => {
          (data.videoID = videoID),
            (data.title = title),
            (data.songDescription = songDescription),
            (data.url = url),
            (data.liked = liked);
        });
      })
      .then(res => {
        Alert.alert('Som adicionado com sucesso!');
        console.log('res', res);
      })
      .catch(err => console.log(err));
  } catch (error) {
    Alert.alert('Ouve um erro ao fazer o download/no banco de dados!');
    console.log('Erro', error);
  }
}

export async function fetchSongs(): Promise<SongModel[] | Error> {
  try {
    const response = (await database
      .get('song')
      .query()
      .fetch()) as unknown as SongModel[];
    return response;
  } catch (error) {
    console.log('erro', error);
    return new Error(`${error}`);
  }
}

export async function checkSongExists(videoId: string) {
  const songsCollection = database.collections.get('song');

  try {
    const songsWithVideoId = await songsCollection
      .query(
        // where clause with videoId
        Q.where('videoID', videoId),
      )
      .fetch();
    return songsWithVideoId.length > 0;
  } catch (error) {
    console.log('ERRO', error);
    return false;
  }
}

export async function deleteSongById(id: string): Promise<boolean> {
  const song = await database.get<SongModel>('song').find(id);
  if (song) {
    await database.write(async () => {
      const status = await deleteFile(song.videoID);
      if (status) {
        await song.markAsDeleted();
        await song.destroyPermanently();
      }
    });
    return true;
  } else {
    return false;
    throw new Error(`Song with id ${id} not found.`);
  }
}

export interface SongDataFormated {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
}

export async function fetchSongsDataFormated(): Promise<
  SongDataFormated[] | Error
> {
  try {
    const songModels = (await fetchSongs()) as unknown as SongModel[];

    const songs = songModels.map(songModel => ({
      id: songModel.id,
      title: songModel.title,
      artist: 'songModel.songDescription',
      artwork: `https://i.ytimg.com/vi/${songModel.videoID}/hqdefault.jpg`,
      url: songModel.url,
    }));

    // console.log('Formating', songs);
    return songs;
  } catch (error) {
    console.log('erro', error);
    return new Error(`${error}`);
  }
}
