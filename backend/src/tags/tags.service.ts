import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: { articles: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });

    if (!tag) {
      throw new NotFoundException(`Tag #${id} not found`);
    }

    return tag;
  }

  async create(data: { name: string }): Promise<Tag> {
    return this.prisma.tag.create({
      data,
    });
  }

  async update(id: number, data: { name?: string }): Promise<Tag> {
    return this.prisma.tag.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Tag> {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
