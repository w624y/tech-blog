import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 创建测试用户
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      password: 'admin123', // 实际项目中需要加密
      role: 'ADMIN',
    },
  });

  // 创建默认分类
  const category1 = await prisma.category.upsert({
    where: { name: '技术' },
    update: {},
    create: {
      name: '技术',
      description: '技术相关文章',
    },
  });

  const category2 = await prisma.category.upsert({
    where: { name: '生活' },
    update: {},
    create: {
      name: '生活',
      description: '生活随笔',
    },
  });

  // 创建默认标签
  const tag1 = await prisma.tag.upsert({
    where: { name: 'React' },
    update: {},
    create: { name: 'React' },
  });

  const tag2 = await prisma.tag.upsert({
    where: { name: 'NestJS' },
    update: {},
    create: { name: 'NestJS' },
  });

  const tag3 = await prisma.tag.upsert({
    where: { name: 'TypeScript' },
    update: {},
    create: { name: 'TypeScript' },
  });

  // 创建示例文章
  const article = await prisma.article.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: '欢迎使用技术博客',
      content: '这是一篇示例文章，欢迎使用 React + NestJS + Prisma 构建的技术博客系统！\n\n## 功能特性\n\n- 文章管理\n- 分类标签\n- 评论系统\n- 响应式设计\n\n开始你的写作之旅吧！',
      summary: '欢迎使用技术博客系统，开始你的写作之旅',
      status: 'PUBLISHED',
      authorId: user.id,
      categoryId: category1.id,
      publishedAt: new Date(),
    },
  });

  console.log({ user, category1, category2, tag1, tag2, tag3, article });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
