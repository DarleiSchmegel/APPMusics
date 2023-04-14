import {tableSchema} from '@nozbe/watermelondb';

export const playlistSchema = tableSchema({
  name: 'playlist',
  columns: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'descrition',
      type: 'string',
    },
    {
      name: 'song_id',
      type: 'string',
    },
  ],
});
