import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    create(data: {
        name: string;
        description?: string;
    }): Promise<Category>;
    update(id: number, data: {
        name?: string;
        description?: string;
    }): Promise<Category>;
    remove(id: number): Promise<Category>;
}
