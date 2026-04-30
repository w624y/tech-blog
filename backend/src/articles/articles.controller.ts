import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('categoryId') categoryId?: string,
    @Query('status') status?: string,
  ) {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 10;
    const categoryIdNum = categoryId ? parseInt(categoryId, 10) : undefined;
    return this.articlesService.findAll({
      skip: skipNum,
      take: takeNum,
      categoryId: categoryIdNum,
      status,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
  }

  @Post()
  create(
    @Body()
    data: {
      title: string;
      content: string;
      summary?: string;
      coverImage?: string;
      authorId: number;
      categoryId?: number;
      tagIds?: number[];
      status?: string;
    },
  ) {
    return this.articlesService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: {
      title?: string;
      content?: string;
      summary?: string;
      coverImage?: string;
      categoryId?: number;
      tagIds?: number[];
      status?: string;
    },
  ) {
    return this.articlesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.remove(id);
  }

  @Post(':id/view')
  incrementViewCount(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.incrementViewCount(id);
  }
}
