import {tableSchema} from '@nozbe/watermelondb';

export const songSchema = tableSchema({
  name: 'song',
  columns: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'songDescription',
      type: 'string',
    },
    {
      name: 'videoID',
      type: 'string',
      isIndexed: true,
    },
    {
      name: 'url',
      type: 'string',
    },
    {
      name: 'liked',
      type: 'boolean',
    },
  ],
});
