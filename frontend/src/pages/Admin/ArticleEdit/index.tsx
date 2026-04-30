import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  message,
  Space,
  Switch,
} from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { articleApi, categoryApi, tagApi } from '../../../services/api';

const { TextArea } = Input;
const { Option } = Select;

export default function ArticleEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const isEdit = !!id;

  useEffect(() => {
    fetchCategories();
    fetchTags();
    if (isEdit) {
      fetchArticle();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await tagApi.getAll();
      setTags(response.data);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const fetchArticle = async () => {
    try {
      const response = await articleApi.getById(Number(id));
      const article = response.data;
      form.setFieldsValue({
        ...article,
        tagIds: article.tags?.map((t: any) => t.tagId),
        isPublished: article.status === 'PUBLISHED',
      });
    } catch (error) {
      message.error('获取文章失败');
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        authorId: 1, // 临时使用，后续需要登录系统
        status: values.isPublished ? 'PUBLISHED' : 'DRAFT',
      };
      delete data.isPublished;

      if (isEdit) {
        await articleApi.update(Number(id), data);
        message.success('文章更新成功');
      } else {
        await articleApi.create(data);
        message.success('文章创建成功');
      }
      navigate('/admin/articles');
    } catch (error) {
      message.error(isEdit ? '更新失败' : '创建失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={isEdit ? '编辑文章' : '新建文章'}
      style={{ maxWidth: 900, margin: '0 auto' }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ isPublished: false }}
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入文章标题" />
        </Form.Item>

        <Form.Item
          name="summary"
          label="摘要"
        >
          <TextArea rows={2} placeholder="请输入文章摘要（可选）" />
        </Form.Item>

        <Form.Item
          name="content"
          label="内容"
          rules={[{ required: true, message: '请输入内容' }]}
        >
          <MDEditor
            preview="edit"
            height={400}
            className="!important"
          />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="分类"
        >
          <Select placeholder="请选择分类" allowClear>
            {categories.map((cat: any) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="tagIds"
          label="标签"
        >
          <Select mode="multiple" placeholder="请选择标签" allowClear>
            {tags.map((tag: any) => (
              <Option key={tag.id} value={tag.id}>
                {tag.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="coverImage"
          label="封面图片 URL"
        >
          <Input placeholder="请输入封面图片 URL（可选）" />
        </Form.Item>

        <Form.Item
          name="isPublished"
          valuePropName="checked"
          label="立即发布"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEdit ? '更新' : '发布'}
            </Button>
            <Button onClick={() => navigate('/admin/articles')}>
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}
