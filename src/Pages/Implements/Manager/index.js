import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  compose,
} from 'ramda'
import { withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/Implements/Manager'
import { getAll } from '../../../Services/Implements'


const Manager = ({
  cleanCustomerSearch,
  customerSearch,
  setCustomerSearch,
  history
}) => {
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(10)

  useEffect(() => {
    getAllImplements()
  }, [page])

  const getAllImplements = async () => {
    setLoading(true)

    try {
      const { data } = await getAll({ page, limit: 10 })
      setSource(data)
      setTotal(data && data.length)
    } catch (error) {}

    setLoading(false)
  }

  const onChangeTable = ({current}) => {
    setPage(current)
  }

  const onChangeSearch = ({ target }) => {
    setCustomerSearch({ search_name_or_document: target.value })
  }

  const clearFilters = () => {
    cleanCustomerSearch()
  }

  const handleFilter = () => {
    if(page !== 1){
      setPage(1)
    } else {
      getAllCustomers()
    }
  }

  const goToDetail = (id) => {
    history.push('/logged/implement/detail/' + id) 
  }

  return (
    <ManagerContainer
      clearFilters={clearFilters}
      filters={customerSearch}
      handleFilter={handleFilter}
      onChangeSearch={onChangeSearch}
      openModalAdd={() => setVisibleModalAdd(true)}
      source={source}
      loading={loading}
      onChangeTable={onChangeTable}
      total={total}
      page={page}
      goToDetail={goToDetail}
    />
  )
}

const mapStateToProps = ({ customerSearch }) => ({
  customerSearch
})

const mapDispatchToProps = (dispatch) => ({
  setCustomerSearch: (payload) =>
    dispatch({ type: 'SET_CUSTOMER_GLOBAL_SEARCH', payload }),
  cleanCustomerSearch: () => dispatch({ type: 'CLEAN_CUSTOMER_GLOBAL_SEARCH' })
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

export default enhanced(Manager)
