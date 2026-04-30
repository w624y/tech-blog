import { TagsService } from './tags.service';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }>;
    create(data: {
        name: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }>;
    update(id: number, data: {
        name?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }>;
}
