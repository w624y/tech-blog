import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Eye, MessageCircle,
  Code2, Server, Database, Cloud, ChevronLeft, ChevronRight
} from 'lucide-react';
import { articleApi, categoryApi } from '../../services/api';
import type { Article, Category } from '../../types';

const categoryIcons: Record<string, React.ElementType> = {
  '前端开发': Code2,
  '后端开发': Server,
  '数据库': Database,
  'DevOps': Cloud,
};

const categoryColors: Record<string, string> = {
  '前端开发': 'blue',
  '后端开发': 'green',
  '数据库': 'purple',
  'DevOps': 'orange',
};

const getCategoryStyles = (color: string) => {
  const colors: Record<string, { bg: string; text: string; hoverBg: string; hoverText: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', hoverBg: 'group-hover:bg-blue-600', hoverText: 'group-hover:text-white' },
    green: { bg: 'bg-green-100', text: 'text-green-600', hoverBg: 'group-hover:bg-green-600', hoverText: 'group-hover:text-white' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', hoverBg: 'group-hover:bg-purple-600', hoverText: 'group-hover:text-white' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', hoverBg: 'group-hover:bg-orange-600', hoverText: 'group-hover:text-white' },
  };
  return colors[color] || colors.blue;
};

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('cat') || 'all';

  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await articleApi.getAll({ take: 100 });
      const published = response.data.filter((a: Article) => a.status === 'PUBLISHED');
      const filtered = selectedCategory === 'all'
        ? published
        : published.filter((a: Article) => a.category?.name === selectedCategory);
      setArticles(filtered);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const paginatedArticles = articles.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(articles.length / pageSize);

  const getCategoryTagClass = (categoryName?: string) => {
    const color = categoryName ? categoryColors[categoryName] : 'blue';
    const colorClasses: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
    };
    return colorClasses[color] || colorClasses.blue;
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            文章分类
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            按分类浏览你感兴趣的技术文章
          </p>
        </div>
      </header>

      {/* Categories Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => {
              const color = categoryColors[cat.name] || 'blue';
              const styles = getCategoryStyles(color);
              const Icon = categoryIcons[cat.name] || Code2;
              const count = (cat as any)._count?.articles || 0;
              return (
                <Link
                  key={cat.id}
                  to={`/categories?cat=${cat.name}`}
                  className="card-hover bg-white p-6 rounded-xl border border-gray-100 group fade-in"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <div className={`w-12 h-12 ${styles.bg} rounded-lg flex items-center justify-center mb-4 ${styles.hoverBg} transition-all duration-300`}>
                    <Icon className={`w-6 h-6 ${styles.text} ${styles.hoverText} transition-all duration-300`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{cat.description || '暂无描述'}</p>
                  <div className={`${styles.text} font-medium text-sm`}>{count} 篇文章</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">分类文章列表</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setSearchParams({})}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
            >
              全部
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ cat: cat.name })}
                className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${selectedCategory === cat.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
              >
                {cat.name.replace('开发', '')}
              </button>
            ))}
          </div>

          {/* Articles */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
                  <div className="flex gap-6">
                    <div className="w-48 h-32 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">暂无文章</p>
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedArticles.map((article, index) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="card-hover block bg-white p-6 rounded-xl border border-gray-100 fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={article.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'}
                      alt={article.title}
                      className="w-full md:w-48 h-40 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {article.category && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryTagClass(article.category.name)}`}>
                            {article.category.name}
                          </span>
                        )}
                        <span className="text-gray-400 text-sm">
                          {new Date(article.createdAt).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {article.summary || article.content.substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" /> {article.viewCount} 阅读
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" /> 0 评论
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
