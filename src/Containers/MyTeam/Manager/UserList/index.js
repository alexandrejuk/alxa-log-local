import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image } from 'antd'
import { map } from 'ramda'
import NoData from '../../../../Assets/noData.svg'
import { cpf } from 'cpf-cnpj-validator'

const columns = (chooseUser) => [
  {
    title: 'Usuário',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Documento',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
    render: (text) => cpf.format(text)
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      <Button type="link" onClick={() => chooseUser(record)}>
        Editar
      </Button>
    )
  }
]

const UserList = ({ datasource, chooseUser, loading, onChangeTable, total, page, handleSubmitUpdate }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty
      description="Não há dados"
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ total, current: page }}
        onChange={onChangeTable}
        columns={columns(chooseUser, handleSubmitUpdate)} 
        loading={loading} 
        dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource)} />
    </ConfigProvider>
  )
}

export default UserList
