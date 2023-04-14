import * as fs from 'fs';
// import * as path from 'path';
import RNFS from 'react-native-fs';
import ytdl from 'ytdl-core';

export async function createSong(url: string) {
  // const res = await ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ");

  const info = await ytdl.getInfo(url);

  const videoDetails = {
    title: info.videoDetails.title,
    description: info.videoDetails.description,
  };
  console.log(videoDetails);

  let format = ytdl.chooseFormat(info.formats, {quality: '140'});
  console.log('Format found!', format);

  const res = await ytdl(url, {
    format,
  }).pipe(
    fs.createWriteStream(`${__dirname}/downloads/${videoDetails.title}.mp3`),
  );
  console.log('res', res);
}
