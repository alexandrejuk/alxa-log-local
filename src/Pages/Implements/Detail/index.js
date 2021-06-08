import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import DetailContainer from '../../../Containers/Implements/Detail'

import { getImplementById } from '../../../Services/Implements'

const Detail = ({ match }) => {
  const [source, setSource] = useState({
    active: null,
    createdAt: null,
    fleet: null,
    fuel: null,
    id: null,
    implement_events: [],
    mileage: null,
    operation: null,
    pedometer: null,
    plate: null,
    priority: null,
    reason: null,
    registrationDriver: null,
    status: null,
    totalLiters: null,
    updatedAt: null,
  })

  useEffect(() => {
    getImplement()
  }, [])

  const getImplement = async () => {
    try {
      const { data } = await getImplementById(match.params.id)
      setSource(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DetailContainer source={source}  />
  )
}

export default withRouter(Detail)
