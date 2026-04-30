import { ArticlesService } from './articles.service';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    findAll(skip?: string, take?: string, categoryId?: string, status?: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        summary: string | null;
        coverImage: string | null;
        status: string;
        viewCount: number;
        publishedAt: Date | null;
        authorId: number;
        categoryId: number | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        summary: string | null;
        coverImage: string | null;
        status: string;
        viewCount: number;
        publishedAt: Date | null;
        authorId: number;
        categoryId: number | null;
    }>;
    create(data: {
        title: string;
        content: string;
        summary?: string;
        coverImage?: string;
        authorId: number;
        categoryId?: number;
        tagIds?: number[];
        status?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        summary: string | null;
        coverImage: string | null;
        status: string;
        viewCount: number;
        publishedAt: Date | null;
        authorId: number;
        categoryId: number | null;
    }>;
    update(id: number, data: {
        title?: string;
        content?: string;
        summary?: string;
        coverImage?: string;
        categoryId?: number;
        tagIds?: number[];
        status?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        summary: string | null;
        coverImage: string | null;
        status: string;
        viewCount: number;
        publishedAt: Date | null;
        authorId: number;
        categoryId: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        summary: string | null;
        coverImage: string | null;
        status: string;
        viewCount: number;
        publishedAt: Date | null;
        authorId: number;
        categoryId: number | null;
    }>;
    incrementViewCount(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        summary: string | null;
        coverImage: string | null;
        status: string;
        viewCount: number;
        publishedAt: Date | null;
        authorId: number;
        categoryId: number | null;
    }>;
}
