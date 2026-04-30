import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }

  async findAll(params: {
    skip?: number;
    take?: number;
    categoryId?: number;
    status?: string;
  }): Promise<Article[]> {
    const { skip, take, categoryId, status } = params;
    return this.prisma.article.findMany({
      skip,
      take,
      where: {
        categoryId,
        status: status || 'PUBLISHED',
      },
      include: {
        author: {
          select: { id: true, username: true },
        },
        category: true,
        tags: {
          include: { tag: true },
        },
        _count: {
          select: { comments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true },
        },
        category: true,
        tags: {
          include: { tag: true },
        },
        comments: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    // 增加浏览量
    await this.prisma.article.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return article;
  }

  async create(data: {
    title: string;
    content: string;
    summary?: string;
    coverImage?: string;
    authorId: number;
    categoryId?: number;
    tagIds?: number[];
    status?: string;
  }): Promise<Article> {
    const { tagIds, ...articleData } = data;

    return this.prisma.article.create({
      data: {
        ...articleData,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        tags: tagIds
          ? {
            create: tagIds.map((tagId) => ({
              tag: { connect: { id: tagId } },
            })),
          }
          : undefined,
      },
      include: {
        author: {
          select: { id: true, username: true },
        },
        category: true,
        tags: {
          include: { tag: true },
        },
      },
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      content?: string;
      summary?: string;
      coverImage?: string;
      categoryId?: number;
      tagIds?: number[];
      status?: string;
    },
  ): Promise<Article> {
    const { tagIds, ...articleData } = data;

    // 如果发布文章，设置发布时间
    const updateData: any = { ...articleData };
    if (data.status === 'PUBLISHED') {
      const article = await this.prisma.article.findUnique({
        where: { id },
        select: { publishedAt: true },
      });
      if (!article?.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    // 如果提供了标签，先删除旧标签关联
    if (tagIds !== undefined) {
      await this.prisma.articleTag.deleteMany({
        where: { articleId: id },
      });
      updateData.tags = {
        create: tagIds.map((tagId) => ({
          tag: { connect: { id: tagId } },
        })),
      };
    }

    return this.prisma.article.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: { id: true, username: true },
        },
        category: true,
        tags: {
          include: { tag: true },
        },
      },
    });
  }

  async remove(id: number): Promise<Article> {
    return this.prisma.article.delete({
      where: { id },
    });
  }

  async incrementViewCount(id: number): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
  }
}
