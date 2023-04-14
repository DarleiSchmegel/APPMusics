import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {schemas} from './schemas';
import {PlaylistModel} from './model/playlistModel';
import {SongModel} from './model/songModel';
import migrations from './model/migrations/migrations';
const adapter = new SQLiteAdapter({
  schema: schemas,
  migrations,
  onSetUpError: _error => {
    // Database failed to load -- offer the user to reload the app or log out
    console.log('error', _error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [PlaylistModel, SongModel],
});

export {database};
