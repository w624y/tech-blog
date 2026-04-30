import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [PrismaModule, ArticlesModule, CategoriesModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
