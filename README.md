# 个人技术博客

基于 React + TypeScript + NestJS + Prisma 构建的全栈技术博客系统。

## 技术栈

### 前端
- React 18
- TypeScript
- Vite
- React Router
- Ant Design
- Axios

### 后端
- NestJS
- TypeScript
- Prisma ORM
- SQLite (开发环境)

## 项目结构

```
tech-blog/
├── frontend/          # React 前端项目
│   ├── src/
│   │   ├── components/   # 公共组件
│   │   ├── pages/        # 页面组件
│   │   ├── services/     # API 请求
│   │   └── types/        # TypeScript 类型
│   └── package.json
│
└── backend/           # NestJS 后端项目
    ├── src/
    │   ├── modules/      # 业务模块
    │   ├── prisma/       # Prisma 配置
    │   └── main.ts
    └── package.json
```

## 快速开始

### 1. 安装依赖

```bash
# 前端
cd frontend
npm install

# 后端
cd backend
npm install
```

### 2. 配置数据库

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 3. 启动服务

```bash
# 启动后端（端口 3001）
cd backend
npm run start:dev

# 启动前端（端口 5173）
cd frontend
npm run dev
```

### 4. 访问应用

- 前端: http://localhost:5173
- 后端 API: http://localhost:3001/api

## API 接口

### 文章
- `GET /api/articles` - 获取文章列表
- `GET /api/articles/:id` - 获取文章详情
- `POST /api/articles` - 创建文章
- `PUT /api/articles/:id` - 更新文章
- `DELETE /api/articles/:id` - 删除文章

### 分类
- `GET /api/categories` - 获取分类列表
- `POST /api/categories` - 创建分类
- `PUT /api/categories/:id` - 更新分类
- `DELETE /api/categories/:id` - 删除分类

### 标签
- `GET /api/tags` - 获取标签列表
- `POST /api/tags` - 创建标签
- `PUT /api/tags/:id` - 更新标签
- `DELETE /api/tags/:id` - 删除标签

## 功能特性

- 文章管理（创建、编辑、删除、发布）
- 文章分类和标签
- 文章列表和详情展示
- 浏览量统计
- 响应式布局
- RESTful API

## 开发计划

- [x] 项目初始化
- [x] 数据库设计
- [x] 后端 API 开发
- [x] 前端页面开发
- [ ] 用户认证
- [ ] 评论系统
- [ ] Markdown 编辑器
- [ ] 文件上传
- [ ] 部署配置
