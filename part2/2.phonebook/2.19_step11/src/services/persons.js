import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getData = () => {
  const request = axios.get(url)
  
  return request.then(response=>response.data)
}

const createData = (newObject) => {
  const request = axios.post(url,newObject)
  
  return request.then(response=>response.data)
}

const updateData = (id,newObject) => {
  const request = axios.put(`${url}/${id}`,newObject)
  
  return request.then(response=>response.data)
}

const deleteData = (id) => axios.delete(`${url}/${id}`)

export default {getData,createData,updateData,deleteData}