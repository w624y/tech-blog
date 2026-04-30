import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye, Search } from 'lucide-react';
import { articleApi } from '../../../services/api';
import type { Article } from '../../../types';

export default function ArticleList() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await articleApi.getAll({ take: 100 });
      setArticles(response.data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这篇文章吗？')) return;

    try {
      await articleApi.delete(id);
      alert('删除成功');
      fetchArticles();
    } catch (error) {
      alert('删除失败');
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === 'PUBLISHED').length,
    drafts: articles.filter(a => a.status === 'DRAFT').length,
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card-hover bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总文章数</p>
              <p className="font-display text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card-hover bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">已发布</p>
              <p className="font-display text-3xl font-bold text-green-600 mt-1">{stats.published}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card-hover bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">草稿</p>
              <p className="font-display text-3xl font-bold text-orange-600 mt-1">{stats.drafts}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Pencil className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card-hover bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总浏览量</p>
              <p className="font-display text-3xl font-bold text-purple-600 mt-1">
                {articles.reduce((sum, a) => sum + a.viewCount, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索文章标题..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${statusFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              全部
            </button>
            <button
              onClick={() => setStatusFilter('PUBLISHED')}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${statusFilter === 'PUBLISHED'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              已发布
            </button>
            <button
              onClick={() => setStatusFilter('DRAFT')}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${statusFilter === 'DRAFT'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              草稿
            </button>
          </div>

          <button
            onClick={() => navigate('/admin/articles/create')}
            className="btn-primary bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            新建文章
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm">标题</th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm">分类</th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm">状态</th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm">浏览量</th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm">创建时间</th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  加载中...
                </td>
              </tr>
            ) : filteredArticles.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  暂无文章
                </td>
              </tr>
            ) : (
              filteredArticles.map((article) => (
                <tr key={article.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{article.title}</div>
                    <div className="text-sm text-gray-400 truncate max-w-xs">{article.summary}</div>
                  </td>
                  <td className="px-6 py-4">
                    {article.category ? (
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                        {article.category.name}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${article.status === 'PUBLISHED'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-orange-100 text-orange-600'
                      }`}>
                      {article.status === 'PUBLISHED' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{article.viewCount}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(article.createdAt).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="编辑"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/article/${article.id}`)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        title="预览"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredArticles.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-gray-500 text-sm">
            显示 {filteredArticles.length} 条结果
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50" disabled>
              上一页
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm cursor-pointer">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50" disabled>
              下一页
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
