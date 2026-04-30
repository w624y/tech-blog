import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 文章 API
export const articleApi = {
  getAll: (params?: { skip?: number; take?: number; categoryId?: number }) =>
    api.get('/articles', { params }),
  getById: (id: number) => api.get(`/articles/${id}`),
  create: (data: any) => api.post('/articles', data),
  update: (id: number, data: any) => api.put(`/articles/${id}`, data),
  delete: (id: number) => api.delete(`/articles/${id}`),
};

// 分类 API
export const categoryApi = {
  getAll: () => api.get('/categories'),
  getById: (id: number) => api.get(`/categories/${id}`),
  create: (data: any) => api.post('/categories', data),
  update: (id: number, data: any) => api.put(`/categories/${id}`, data),
  delete: (id: number) => api.delete(`/categories/${id}`),
};

// 标签 API
export const tagApi = {
  getAll: () => api.get('/tags'),
  getById: (id: number) => api.get(`/tags/${id}`),
  create: (data: any) => api.post('/tags', data),
  update: (id: number, data: any) => api.put(`/tags/${id}`, data),
  delete: (id: number) => api.delete(`/tags/${id}`),
};

export default api;
