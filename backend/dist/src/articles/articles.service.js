"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ArticlesService = class ArticlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Article #${id} not found`);
        }
        await this.prisma.article.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
        });
        return article;
    }
    async create(data) {
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
    async update(id, data) {
        const { tagIds, ...articleData } = data;
        const updateData = { ...articleData };
        if (data.status === 'PUBLISHED') {
            const article = await this.prisma.article.findUnique({
                where: { id },
                select: { publishedAt: true },
            });
            if (!article?.publishedAt) {
                updateData.publishedAt = new Date();
            }
        }
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
    async remove(id) {
        return this.prisma.article.delete({
            where: { id },
        });
    }
    async incrementViewCount(id) {
        return this.prisma.article.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
        });
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map