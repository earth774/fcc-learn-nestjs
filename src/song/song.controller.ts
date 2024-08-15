import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  HttpStatus,
  Param,
  ParseIntPipe,
  Body,
  Inject,
  Scope,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constatnts/connection';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Song } from './song.entity';

@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongController {
  constructor(
    private songService: SongService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(
      `THIS IS CONNECTION STRING ${this.connection.CONNECTION_STRING}`,
    );
  }
  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songService.create(createSongDTO);
  }
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songService.paginate({
      page,
      limit,
    });
  }
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.songService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songService.update(id, updateSongDTO);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songService.remove(id);
  }
}
