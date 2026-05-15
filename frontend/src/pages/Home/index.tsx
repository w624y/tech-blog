import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, BookOpen, User, ArrowRight,
  Calendar, Eye, Code2, Server, Database, Cloud
} from 'lucide-react';
import { articleApi } from '../../services/api';
import type { Article } from '../../types';

const categories = [
  { name: '前端开发', icon: Code2, color: 'blue', count: 24, tags: ['React', 'TypeScript', 'Vue'] },
  { name: '后端开发', icon: Server, color: 'green', count: 18, tags: ['Node.js', 'NestJS', 'Python'] },
  { name: '数据库', icon: Database, color: 'purple', count: 12, tags: ['MySQL', 'PostgreSQL', 'Redis'] },
  { name: 'DevOps', icon: Cloud, color: 'orange', count: 8, tags: ['Docker', 'K8s', 'CI/CD'] },
];

const getCategoryStyles = (color: string) => {
  const colors: Record<string, { bg: string; text: string; hoverBg: string; hoverText: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', hoverBg: 'group-hover:bg-blue-600', hoverText: 'group-hover:text-white' },
    green: { bg: 'bg-green-100', text: 'text-green-600', hoverBg: 'group-hover:bg-green-600', hoverText: 'group-hover:text-white' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', hoverBg: 'group-hover:bg-purple-600', hoverText: 'group-hover:text-white' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', hoverBg: 'group-hover:bg-orange-600', hoverText: 'group-hover:text-white' },
  };
  return colors[color] || colors.blue;
};

const popularTags: { name: string; color: string }[] = [
  { name: 'React', color: 'gray' },
  { name: 'TypeScript', color: 'gray' },
  { name: 'NestJS', color: 'blue' },
  { name: 'Node.js', color: 'gray' },
  { name: 'Vue', color: 'green' },
  { name: 'JavaScript', color: 'gray' },
  { name: 'Python', color: 'purple' },
  { name: 'Docker', color: 'gray' },
  { name: 'Git', color: 'orange' },
  { name: 'MySQL', color: 'gray' },
  { name: 'Redis', color: 'red' },
  { name: 'API', color: 'gray' },
  { name: 'GraphQL', color: 'cyan' },
  { name: 'CSS', color: 'gray' },
  { name: 'Next.js', color: 'pink' },
];

const getTagStyles = (color: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    gray: { bg: 'bg-gray-100', text: 'text-gray-700' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
    green: { bg: 'bg-green-100', text: 'text-green-700' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
    red: { bg: 'bg-red-100', text: 'text-red-700' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-700' },
  };
  return colors[color] || colors.gray;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await articleApi.getAll({ take: 100 });
      setArticles(response.data.filter((a: Article) => a.status === 'PUBLISHED'));
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category?.name === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                欢迎来到我的技术博客
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                探索技术的<br />
                <span className="text-blue-600">无限可能</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                分享 Web 开发、React、TypeScript 等技术干货，记录学习成长之路。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/"
                  className="btn-primary bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 no-underline"
                >
                  <BookOpen className="w-5 h-5" />
                  阅读文章
                </Link>
                <Link
                  to="/about"
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:border-gray-400 transition-colors no-underline"
                >
                  <User className="w-5 h-5" />
                  关于我
                </Link>
              </div>
            </div>
            <div className="fade-in fade-in-delay-2 relative hidden lg:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
                  alt="Coding"
                  className="relative rounded-2xl shadow-2xl w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 fade-in fade-in-delay-3">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-gray-900">{articles.length}+</div>
              <div className="text-gray-500">技术文章</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-gray-500">总阅读量</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-gray-900">{categories.length}</div>
              <div className="text-gray-500">文章分类</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-gray-900">{popularTags.length}</div>
              <div className="text-gray-500">标签数量</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">文章分类</h2>
              <p className="text-gray-500">按分类浏览感兴趣的文章</p>
            </div>
            <Link to="/categories" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 no-underline">
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => {
              const styles = getCategoryStyles(cat.color);
              return (
                <Link
                  key={cat.name}
                  to={`/categories?cat=${cat.name}`}
                  className="bg-white p-6 rounded-xl border border-gray-100 cursor-pointer group fade-in fade-in-delay-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 ${styles.bg} rounded-lg flex items-center justify-center mb-4 ${styles.hoverBg} transition-all duration-300`}>
                    <cat.icon className={`w-6 h-6 ${styles.text} ${styles.hoverText} transition-all duration-300`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-gray-500 text-sm">{cat.tags.join(', ')}</p>
                  <div className={`mt-3 ${styles.text} font-medium text-sm transition-all duration-300`}>{cat.count} 篇文章</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">最新文章</h2>
              <p className="text-gray-500">分享最新技术见解和实践经验</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
              >
                全部
              </button>
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${selectedCategory === cat.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                    }`}
                >
                  {cat.name.replace('开发', '')}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">暂无文章</p>
              <Link to="/admin/articles/create" className="text-blue-600 hover:text-blue-700 mt-2 inline-block no-underline">
                撰写第一篇文章
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className={`bg-white rounded-xl overflow-hidden cursor-pointer fade-in fade-in-delay-${(index % 3) + 1} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.coverImage || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop`}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {article.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {article.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.createdAt).toLocaleDateString('zh-CN')}</span>
                      <span className="mx-2">•</span>
                      <Eye className="w-4 h-4" />
                      <span>{article.viewCount}</span>
                    </div>
                    <Link to={`/article/${article.id}`} className="no-underline">
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {article.summary || article.content.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{article.author?.username || '作者'}</span>
                      </div>
                      <Link
                        to={`/article/${article.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 no-underline"
                      >
                        阅读更多 <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tags Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">热门标签</h2>
            <p className="text-gray-500">探索你感兴趣的技术话题</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag) => {
              const styles = getTagStyles(tag.color);
              return (
                <Link
                  key={tag.name}
                  to={`/tags?tag=${tag.name}`}
                  className={`${styles.bg} ${styles.text} px-4 py-2 rounded-full text-sm font-medium no-underline cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-200`}
                >
                  {tag.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
              <div className="text-center md:text-left">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">关于我</h2>
                <p className="text-gray-600 mb-4">
                  全栈开发者，热爱技术分享。专注于 Web 前端、后端开发，以及 DevOps 相关技术。
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 no-underline">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    <span>GitHub</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 no-underline">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                    <span>Twitter</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 no-underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
