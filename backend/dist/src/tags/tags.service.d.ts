import { PrismaService } from '../prisma/prisma.service';
import { Tag } from '@prisma/client';
export declare class TagsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Tag[]>;
    findOne(id: number): Promise<Tag>;
    create(data: {
        name: string;
    }): Promise<Tag>;
    update(id: number, data: {
        name?: string;
    }): Promise<Tag>;
    remove(id: number): Promise<Tag>;
}
