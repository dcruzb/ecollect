import axios from "axios"


const api = axios.create({
  baseURL: 'http://192.168.25.36:3333'
})

export const apiIBGE = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
})

export default api