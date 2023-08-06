'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Tabs, message, Avatar, Divider, Form, Input } from 'antd'
import { request } from '@/service'
import { prisma } from '@/lib/prisma'
import styles from './index.module.scss'

export default function Page() {
  const [form] = Form.useForm()

  useEffect(() => {
    request.get('/api/user/detail').then((res: any) => {
      if (res?.code === 0) {
        form.setFieldsValue(res.data?.userInfo)
      }
    })
  }, [])

  const handleSubmit = async (values: any) => {
    console.log(values)
    request.post('/api/user/update', values).then((res: any) => {
      if (res?.code === 0) {
        message.success('保存成功')
      } else {
        message.error(res?.msg || '修改失败')
      }
    })
  }
  return (
    <div className="content-layout">
      <div className={styles.userProfile}>
        <h2>个人资料</h2>
        <div>
          <Form
            {...layout}
            form={form}
            className={styles.form}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="用户名"
              name="nickname"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="职位"
              name="job"
              rules={[{ required: false, message: '请输入职位' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="个人介绍"
              name="introduce"
              rules={[{ required: false, message: '请输入个人介绍' }]}
            >
              <Input.TextArea />
            </Form.Item>
            {/* 上传头像后续可尝试使用 ipfs+fil */}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
}
