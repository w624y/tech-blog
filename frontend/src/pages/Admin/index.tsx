import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FileText, Folder, Tag, Home, Settings, 
  BarChart3, Users, MessageSquare
} from 'lucide-react';

const menuItems = [
  { key: '/admin', icon: BarChart3, label: '仪表盘', href: '/admin' },
  { key: '/admin/articles', icon: FileText, label: '文章管理', href: '/admin/articles' },
  { key: '/admin/categories', icon: Folder, label: '分类管理', href: '/admin/categories' },
  { key: '/admin/tags', icon: Tag, label: '标签管理', href: '/admin/tags' },
  { key: '/admin/comments', icon: MessageSquare, label: '评论管理', href: '/admin/comments' },
  { key: '/admin/users', icon: Users, label: '用户管理', href: '/admin/users' },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white fixed h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8 no-underline">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">TechBlog</span>
          </Link>
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.key || 
                (item.key !== '/admin' && location.pathname.startsWith(item.key));
              
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors no-underline ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors no-underline"
          >
            <Home className="w-5 h-5" />
            <span>返回前台</span>
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors no-underline"
          >
            <Settings className="w-5 h-5" />
            <span>系统设置</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-display text-xl font-semibold text-gray-900">
                {menuItems.find(item => 
                  location.pathname === item.key || 
                  (item.key !== '/admin' && location.pathname.startsWith(item.key))
                )?.label || '仪表盘'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">管理员</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
