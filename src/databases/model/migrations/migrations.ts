import {
  createTable,
  schemaMigrations,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      // ⚠️ Set this to a number one larger than the current schema version
      toVersion: 2,
      steps: [
        // See "Migrations API" for more details
        createTable({
          name: 'song',
          columns: [
            {name: 'body', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'url', type: 'string'},
            {name: 'liked', type: 'boolean'},
          ],
        }),
      ],
    },
  ],
});
