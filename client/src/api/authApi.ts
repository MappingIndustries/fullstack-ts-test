import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/auth'

// export const login = async (username: string, password: string) => {
//   const response = await axios.post(`${BASE_URL}/login`, { username, password })
//   localStorage.setItem('accessToken', response.data.accessToken)
//   localStorage.setItem('refreshToken', response.data.refreshToken)
// }

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/register`, {
    username,
    password,
  })
  localStorage.setItem('accessToken', response.data.accessToken)
  localStorage.setItem('refreshToken', response.data.refreshToken)
}

// export const refreshToken = async () => {
//   const refreshToken = localStorage.getItem('refreshToken')
//   const response = await axios.post(`${BASE_URL}/token`, {
//     token: refreshToken,
//   })
//   localStorage.setItem('accessToken', response.data.accessToken)
// }

// export const logout = async () => {
//   const refreshToken = localStorage.getItem('refreshToken')
//   await axios.delete(`${BASE_URL}/logout`, { data: { token: refreshToken } })
//   localStorage.removeItem('accessToken')
//   localStorage.removeItem('refreshToken')
// }
