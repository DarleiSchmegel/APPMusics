import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class SongModel extends Model {
  static table = 'song';

  @field('title') title!: string;

  @field('description') description!: string;

  @field('url') url!: string;

  @field('liked') liked!: boolean;
}
