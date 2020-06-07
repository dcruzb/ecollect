import axios from "axios"

export const apiBaseURL = 'http://localhost:3333'

const api = axios.create({
  baseURL: apiBaseURL
})

export const apiIBGE = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
})

export default api