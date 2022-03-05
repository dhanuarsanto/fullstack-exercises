import axios from 'axios'

const url = '/api/persons'

const getData = () => {
  const request = axios.get(url)
  const fakeData = {
    name:"fake account",
    number:"081315782912",
    id:999
  }
  return request.then(response=>response.data.concat(fakeData))
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

const personService = {getData,createData,updateData,deleteData}
export default personService