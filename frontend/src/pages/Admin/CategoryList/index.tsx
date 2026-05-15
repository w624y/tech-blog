import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { Plus, Pencil, Trash2, Folder } from 'lucide-react';
import { categoryApi } from '../../../services/api';

interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  _count?: {
    articles: number;
  };
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAll();
      setCategories(response.data);
    } catch (error) {
      message.error('获取分类失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Category) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await categoryApi.delete(id);
      message.success('删除成功');
      fetchCategories();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async (values: { name: string; description?: string }) => {
    try {
      if (editingCategory) {
        await categoryApi.update(editingCategory.id, values);
        message.success('更新成功');
      } else {
        await categoryApi.create(values);
        message.success('创建成功');
      }
      setModalVisible(false);
      fetchCategories();
    } catch (error) {
      message.error(editingCategory ? '更新失败' : '创建失败');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Folder className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-medium">{name}</span>
        </div>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '文章数',
      dataIndex: '_count',
      key: 'articles',
      render: (_: any, record: Category) => record._count?.articles || 0,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: Category) => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            icon={<Pencil className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
            className="text-blue-600 hover:bg-blue-50"
          />
          <Popconfirm
            title="确定删除这个分类吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="text"
              icon={<Trash2 className="w-4 h-4" />}
              className="text-red-600 hover:bg-red-50"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">分类管理</h1>
          <p className="text-gray-500 mt-1">管理你的文章分类</p>
        </div>
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleAdd}
          className="bg-blue-600"
        >
          新建分类
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </div>

      <Modal
        title={editingCategory ? '编辑分类' : '新建分类'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea placeholder="请输入分类描述（可选）" rows={3} />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end gap-3">
            <Button onClick={() => setModalVisible(false)}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              {editingCategory ? '更新' : '创建'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
