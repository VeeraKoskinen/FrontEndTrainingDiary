import React from 'react';
import axios from 'axios';

const baseUrl = '/api/events'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const configuration = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newObject, configuration)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const configuration = {
    headers: { 'Authorization': token }
  }
  
  const response = await axios.delete(`${baseUrl}/${id}`, configuration)
  return response.data
}

export default { getAll, setToken, create, update, remove }
