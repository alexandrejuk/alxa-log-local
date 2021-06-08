import React from 'react'
import {
  Card,
  Typography,
  Row,
  Col,
  Form,
} from 'antd'
import {
  always,
  applySpec,
  head,
  ifElse,
  keys,
  pipe,
  prop,
  replace,
  __
} from 'ramda'
import moment from 'moment'
import { cpf } from 'cpf-cnpj-validator'; 

import mask, { myInfoMask } from '../../utils/Masks'

const { Title, Text } = Typography

const MyInfo = ({ loading, user, updateMyInfo }) => {
  const [form] = Form.useForm()

  const buildIntialValues = applySpec({
    document: pipe(
      prop('document'),
      mask('##.###.###-#'),
      replace(/^\.\.-$/, '')
    ),
    phone: prop('phone'),
    birthday: ifElse(
      prop('birthday'),
      pipe(prop('birthday'), moment),
      always(undefined)
    )
  })

  const onValuesChange = (dataChange) => {
    const { name, value } = myInfoMask(
      applySpec({
        name: pipe(keys, head),
        value: (item) => pipe(pipe(keys, head), prop(__, item))(item)
      })(dataChange)
    )

    form.setFieldsValue({
      [name]: value
    })
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={5}>Informações do usuário</Title>
            </Col>
            <Col span={12}>
              <Text strong>Nome completo</Text>
              <p>{user && user.user.name}</p>
            </Col>
            <Col span={12}>
              <Text strong>Documento</Text>
              <p>{user && cpf.format(user.user.document)}</p>
            </Col>
          </Row>
        </Card>
      </Col>

    </Row>
  )
}

export default MyInfo
