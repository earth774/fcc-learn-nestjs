import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { connection } from 'src/common/constatnts/connection';

// const mockSongService = {
//   findAll() {
//     return [{ id: 1, title: 'Lasting lover', artists: ['Siagla'] }];
//   },
// };

@Module({
  controllers: [SongController],
  providers: [
    SongService,
    // {
    //   provide: SongService,
    //   useClass: SongService,
    // },
    // {
    //   provide: SongService,
    //   useValue: mockSongService,
    // },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongModule {}
