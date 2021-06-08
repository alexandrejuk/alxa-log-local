import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image, Tag } from 'antd'
import { map } from 'ramda'
import NoData from '../../../../Assets/noData.svg'
import { priorityTranslate, operationTranslate, statusTranslate } from '../../../../utils/implements.translate'
import { diff } from '../../../../utils/diff'

const colors = {
  high: '#FF0062',
  medium: '#FFD700',
  low: '#00FF9D',
}

const columns = ({ goToDetail }) => [
  {
    title: 'Operação',
    dataIndex: 'operation',
    key: 'operation',
    fixed: 'left',
    render: text => operationTranslate[text] 
  },
  {
    title: 'Placa',
    dataIndex: 'plate',
    key: 'plate',
    fixed: 'left'
  },
  {
    title: 'Frota',
    dataIndex: 'fleet',
    key: 'fleet',
    fixed: 'left'
  },
  {
    title: 'Motivo',
    dataIndex: 'reason',
    key: 'reason',
    fixed: 'left'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    render: text => statusTranslate[text] 
  },
  {
    title: 'Permanência',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    render: (_, record) => diff(record.createdAt, record.updatedAt, record.status)
  },
  
  {
    title: 'Prioridade',
    dataIndex: 'priority',
    key: 'priority',
    fixed: 'left',
    render: (text) => (
      <Tag color={colors[text]}>
        {priorityTranslate[text]}
      </Tag>
    )
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'right',
    render: (_, record) => (
      <Button onClick={() => goToDetail(record.id)}>Ver detalhes</Button>
    )
  }
]


const CustomerList = ({ datasource, goToDetail, loading, onChangeTable, total, page}) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
      description="Não há dados" 
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ total, current: page }}
        onChange={onChangeTable}
        columns={columns({ goToDetail })} 
        loading={loading} 
        dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource)}
      />
    </ConfigProvider>
  )
}

export default CustomerList
