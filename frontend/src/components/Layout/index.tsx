import { Outlet, Link } from 'react-router-dom';
import { Code, Search, Settings, Home, FileText, Folder, Tag, User } from 'lucide-react';

const navLinks = [
  { key: '/', icon: Home, label: '首页', href: '/' },
  { key: '/articles', icon: FileText, label: '文章', href: '/' },
  { key: '/categories', icon: Folder, label: '分类', href: '/categories' },
  { key: '/tags', icon: Tag, label: '标签', href: '/tags' },
  { key: '/about', icon: User, label: '关于', href: '/about' },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-display text-xl font-bold text-gray-900 flex items-center gap-2 no-underline">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              TechBlog
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/admin"
                className="btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 no-underline"
              >
                <Settings className="w-4 h-4" />
                管理后台
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-xl font-bold">TechBlog</span>
              </div>
              <p className="text-gray-400 text-sm">
                分享技术干货，记录学习成长。让技术更有趣，让学习更高效。
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors no-underline">首页</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors no-underline">文章</Link></li>
                <li><Link to="/categories" className="hover:text-white transition-colors no-underline">分类</Link></li>
                <li><Link to="/tags" className="hover:text-white transition-colors no-underline">标签</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">技术标签</h4>
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-400 text-sm">React</span>
                <span className="text-gray-400 text-sm">TypeScript</span>
                <span className="text-gray-400 text-sm">NestJS</span>
                <span className="text-gray-400 text-sm">Node.js</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">订阅更新</h4>
              <p className="text-gray-400 text-sm mb-4">订阅获取最新文章推送</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="输入邮箱地址"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-600"
                />
                <button className="px-4 py-2 bg-blue-600 rounded-r-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                  订阅
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 TechBlog. Built with React + NestJS + Prisma.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
