import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongService {
  // local db
  // local array

  private readonly songs = [];

  create(song) {
    // Save the song in the database
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // fetch the songs from the db
    return this.songs;
  }
}
