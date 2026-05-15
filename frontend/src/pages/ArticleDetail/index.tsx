import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {
  Calendar, Eye, User, ArrowLeft, Share2,
  ThumbsUp, MessageCircle, Tag, Clock
} from 'lucide-react';
import { articleApi } from '../../services/api';
import type { Article } from '../../types';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchArticle(parseInt(id));
    }
  }, [id]);

  const fetchArticle = async (articleId: number) => {
    try {
      const response = await articleApi.getById(articleId);
      setArticle(response.data);
    } catch (error) {
      console.error('Failed to fetch article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">文章未找到</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2 no-underline">
          <ArrowLeft className="w-4 h-4" /> 返回首页
        </Link>
      </div>
    );
  }

  const relatedArticles = [
    { id: 1, title: 'React Hooks 完整指南', category: '前端开发' },
    { id: 2, title: 'TypeScript 高级类型技巧', category: '前端开发' },
    { id: 3, title: 'NestJS 模块系统详解', category: '后端开发' },
  ];

  return (
    <div>
      {/* Article Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 no-underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>

          <div className="mb-6">
            {article.category && (
              <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                {article.category.name}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{article.author?.username || '作者'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(article.createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{article.viewCount} 阅读</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>5 分钟阅读</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="max-w-5xl mx-auto px-6 -mt-8">
        <img
          src={article.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=500&fit=crop'}
          alt={article.title}
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>

      {/* Article Content */}
      <article className="px-6 pb-16">
        <div className="max-w-4xl mx-auto mt-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.summary || article.content.substring(0, 200)}...
            </p>

            <div className="article-content text-gray-700 leading-relaxed space-y-6">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-5 h-5 text-gray-400" />
                {article.tags.map((tag: any) => (
                  <Link
                    key={tag.id}
                    to={`/tags?tag=${tag.name}`}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-blue-600 hover:text-white transition-colors no-underline"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${liked
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span>{liked ? '已赞' : '点赞'}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                <Share2 className="w-5 h-5" />
                <span>分享</span>
              </button>
            </div>
          </div>

          {/* Author Info */}
          <div className="mt-12 p-8 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{article.author?.username || '作者'}</h3>
                <p className="text-gray-600 text-sm mb-2">全栈开发者</p>
                <p className="text-gray-500 text-sm">
                  热爱技术分享，专注于 Web 前端、后端开发，以及 DevOps 相关技术。
                </p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-12">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              评论 (0)
            </h3>

            <div className="mb-8">
              <textarea
                placeholder="写下你的评论..."
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 resize-none"
                rows={4}
              ></textarea>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                发表评论
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-8">相关文章推荐</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/article/${related.id}`}
                  className="group cursor-pointer no-underline"
                >
                  <div className="bg-gray-100 rounded-lg h-32 mb-3 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop`}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-blue-600 text-xs font-medium">{related.category}</span>
                  <h4 className="text-gray-900 font-medium mt-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
