import axiosIntance from '../../utils/axiosInstance'

const getAll = async () => {
  return await axiosIntance.get('/implements')
}

const getImplementById = async (id) => {
  return await axiosIntance.get(`/implements/${id}`)
}

export { 
  getAll,
  getImplementById
}
