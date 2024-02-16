import {appSchema} from '@nozbe/watermelondb';

import {playlistSchema} from './playlistSchema';
import {songSchema} from './songSchema';

export const schemas = appSchema({
  version: 7,
  tables: [playlistSchema, songSchema],
});
