import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/implements', { params })
}

const getImplementById = async (id) => {
  return await axiosIntance.get(`/implements/${id}`)
}

export { 
  getAll,
  getImplementById
}
