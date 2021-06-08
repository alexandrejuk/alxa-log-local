import React, { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'

const Add = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  return (
    <Modal
      width={350}
      visible={visible}
      title="CRIAR USUÁRIO"
      onCancel={() => {
        onCancel()
        form.resetFields()
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            onCancel()
            form.resetFields()
          }}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => {
            setLoading(true)
            form
              .validateFields()
              .then((values) => {
                form.resetFields()
                onCreate(values)
                setLoading(false)
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
                setLoading(false)
              })
          }}>
          Criar usuário
        </Button>
      ]}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        validateTrigger="onBlur">
        <Form.Item
          name="name"
          label="Nome do usuário"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input placeholder="Insira o nome do usuário"/>
        </Form.Item>
        <Form.Item
          name="document"
          label="CPF"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input placeholder="Insira o cpf do usuário"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Add
