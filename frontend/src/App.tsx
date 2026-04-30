import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ArticleDetail from './pages/ArticleDetail';
import AdminLayout from './pages/Admin';
import ArticleList from './pages/Admin/ArticleList';
import ArticleEdit from './pages/Admin/ArticleEdit';
import CategoryList from './pages/Admin/CategoryList';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          {/* 前台路由 */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="article/:id" element={<ArticleDetail />} />
            <Route path="categories" element={<Categories />} />
            <Route
              path="tags"
              element={<div style={{ textAlign: 'center', padding: 100 }}>标签页面开发中...</div>}
            />
            <Route
              path="about"
              element={<div style={{ textAlign: 'center', padding: 100 }}>关于页面开发中...</div>}
            />
          </Route>

          {/* 管理后台路由 */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<ArticleList />} />
            <Route path="articles" element={<ArticleList />} />
            <Route path="articles/create" element={<ArticleEdit />} />
            <Route path="articles/edit/:id" element={<ArticleEdit />} />
            <Route path="categories" element={<CategoryList />} />
            <Route
              path="tags"
              element={<div style={{ textAlign: 'center', padding: 100 }}>标签管理开发中...</div>}
            />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
