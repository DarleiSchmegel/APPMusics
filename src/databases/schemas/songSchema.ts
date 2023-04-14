import {tableSchema} from '@nozbe/watermelondb';

export const songSchema = tableSchema({
  name: 'song',
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
      name: 'url',
      type: 'string',
      isIndexed: true,
    },
    {
      name: 'liked',
      type: 'boolean',
    },
  ],
});
