import RNFS from 'react-native-fs';
export async function getSong(ID: string) {
  console.log('read');
  const path = RNFS.DocumentDirectoryPath + '/songs/' + ID; // diretório onde os arquivos foram salvos
  console.log('Aqui', path);
  return path;

  // const files = await RNFS.readDir(path); // lista todos os arquivos no diretório
  // console.log('Files', files);
  // // lê cada arquivo individualmente e imprime seu conteúdo
  // files.forEach(async file => {
  //   // const content = await RNFS.readFile(file.path, 'utf8');
  //   console.log(`Conteúdo do arquivo ${file.name}`);
  // });
}
