import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongController {
  constructor(private songService: SongService) {}
  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songService.create(createSongDTO);
  }
  @Get()
  findAll() {
    try {
      return this.songService.findAll();
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `fetch song on the based on id ${typeof id}`;
  }

  @Put(':id')
  update() {
    return 'update song on the based on id';
  }

  @Delete(':id')
  delete() {
    return 'delete song on the based on id';
  }
}
