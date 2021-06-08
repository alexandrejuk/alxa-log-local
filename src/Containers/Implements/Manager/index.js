import React from 'react'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import ImplementList from './ImplementList'

const { Title } = Typography

const Manager = ({
  clearFilters,
  filters,
  handleFilter,
  loading,
  onChangeSearch,
  source,
  onChangeTable,
  total,
  page,
  goToDetail
}) => (
  <Row gutter={[8, 16]}>
    <Col span={24}>
      <Card bordered={false}>
        <Row>
          <Col span={12}>
            <Title style={{ marginBottom: 0 }} level={4}>
              Gerencie seus implementos
            </Title>
            <p style={{ marginBottom: 0 }}>Agilidade e praticidade nos processos</p>
          </Col>
        </Row>
      </Card>
    </Col>
    <Col span={24}>
      <Card bordered={false}>
        <Row gutter={[8, 8]}>
          <Col span={16}>
            <Input
              name="search_name_or_document"
              placeholder="Filtre por nome ou documento."
              prefix={<SearchOutlined />}
              value={filters.search_name_or_document}
              onChange={onChangeSearch}
            />
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button style={{ marginRight: '16px' }} onClick={clearFilters}>
              Limpar filtros
            </Button>
            <Button type="primary" onClick={handleFilter}>
              Filtrar
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
    <Col span={24}>
      <Card bordered={false}>
        <ImplementList 
          onChangeTable={onChangeTable} 
          datasource={source} 
          total={total}
          goToDetail={goToDetail}
          loading={loading}
          page={page}
        />
      </Card>
    </Col>
  </Row>
)

export default Manager
