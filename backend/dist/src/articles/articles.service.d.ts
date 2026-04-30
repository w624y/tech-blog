import { PrismaService } from '../prisma/prisma.service';
import { Article } from '@prisma/client';
export declare class ArticlesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(params: {
        skip?: number;
        take?: number;
        categoryId?: number;
        status?: string;
    }): Promise<Article[]>;
    findOne(id: number): Promise<Article>;
    create(data: {
        title: string;
        content: string;
        summary?: string;
        coverImage?: string;
        authorId: number;
        categoryId?: number;
        tagIds?: number[];
        status?: string;
    }): Promise<Article>;
    update(id: number, data: {
        title?: string;
        content?: string;
        summary?: string;
        coverImage?: string;
        categoryId?: number;
        tagIds?: number[];
        status?: string;
    }): Promise<Article>;
    remove(id: number): Promise<Article>;
    incrementViewCount(id: number): Promise<Article>;
}
