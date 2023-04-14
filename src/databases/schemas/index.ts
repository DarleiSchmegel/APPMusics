import {appSchema} from '@nozbe/watermelondb';

import {playlistSchema} from './playlistSchema';
import {songSchema} from './songSchema';

export const schemas = appSchema({
  version: 2,
  tables: [playlistSchema, songSchema],
});
