import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class SongModel extends Model {
  static table = 'song';
  static associations = {};

  @field('title') title!: string;

  @field('songDescription') songDescription!: string;

  @field('videoID') videoID!: string;

  @field('url') url!: string;

  @field('liked') liked!: boolean;
}
