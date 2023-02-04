import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return (
        axios.get(baseUrl)
            .then(res => res.data)
      )
}

const getOne = id => {
    return (
        axios.get(`${baseUrl}/${id}`)
    )
}

const create = newPerson => {
  return (
    axios.post(baseUrl, newPerson)
        .then(res => res.data)
  )
}

const deletePerson = id => {
    return (
        axios.delete(`${baseUrl}/${id}`)
    )
}

const update = (id, data) => {
    return (
        axios.put(`${baseUrl}/${id}`, data)
            .then(res => res.data)
    )
}

const exports = {
    create,
    getAll,
    deletePerson,
    update,
    getOne
};

export default exports;