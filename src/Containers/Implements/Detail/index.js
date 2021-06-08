import React from 'react'
import { Card, Typography, Row, Col, Tag, Timeline } from 'antd'
import formattedDate from '../../../utils/parserDate'
import { priorityTranslate, operationTranslate, statusTranslate } from '../../../utils/implements.translate'
import { diff } from '../../../utils/diff'

const { Title } = Typography
const colors = {
  high: '#FF0062',
  medium: '#FFD700',
  low: '#00FF9D',
}

const Detail = ({
  source,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Operação</p>
              <Title level={5}>{source.operation && operationTranslate[source.operation]}</Title>
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Placa</p>
              <Title level={5}>
                {source.plate}
              </Title>
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Status</p>
              <Title level={5}>
                {source.status && statusTranslate[source.status]}
              </Title>
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Motivo</p>
              <Title level={5}>
                {source.reason}
              </Title>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Permanência</p>
              {diff(source.createdAt, source.updatedAt, source.status)}
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Prioridade</p>
              <Tag color={colors[source.priority]}>
                {priorityTranslate[source.priority]}
              </Tag>
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Data de criação</p>
              <Title level={5} style={{ marginBottom: '4px' }}>
               {formattedDate(source.createdAt, 'DD/MM/YYYY')}
              </Title>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={12}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <p>Eventos adicionados ao implemento</p>
            </Col>
            <Col span={24}>
            <Timeline>
              {source.implement_events && source.implement_events.map(implementEvent => (
                <Timeline.Item
                  key={implementEvent.id}
                >
                  {statusTranslate[implementEvent.status]}
                  <br />
                  {formattedDate(implementEvent.createdAt, 'DD/MM/YYYY HH:mm')}
                </Timeline.Item>
              ))}
            </Timeline>
            </Col> 
          </Row>
        </Card>
      </Col>
      
      <Col span={12}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <p>Abastecimento</p>
            </Col>
            <Col span={24}>
              {source.fuel ? (
                <Row gutter={[8, 8]}>
                  <Col span={6}>
                    <p style={{ marginBottom: '4px' }}>Combustível</p>
                    <Title level={5}>{source.fuel}</Title>
                  </Col>
                  <Col span={6}>
                    <p style={{ marginBottom: '4px' }}>Hodometrô</p>
                    <Title level={5}>
                      {source.pedometer}
                    </Title>
                  </Col>
                  <Col span={6}>
                    <p style={{ marginBottom: '4px' }}>Total de litros</p>
                    <Title level={5}>
                      {source.totalLiters} lts
                    </Title>
                  </Col>
                  <Col span={6}>
                    <p style={{ marginBottom: '4px' }}>Kilometragem</p>
                    <Title level={5}>
                      {source.mileage}
                    </Title>
                  </Col>
                </Row>
              ) : 'Sem registro de abastecimento para este implemento!'}
            </Col> 
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Detail
