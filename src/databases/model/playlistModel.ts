import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

import {relation} from '@nozbe/watermelondb/decorators';

export class PlaylistModel extends Model {
  static table = 'playlist';

  @field('title') title!: string;

  @field('description') description!: string;

  @relation('songs', 'song_id') song!: string;
}
