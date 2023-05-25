import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/auth'

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/register`, {
    username,
    password,
  })
  localStorage.setItem('accessToken', response.data.accessToken)
  localStorage.setItem('refreshToken', response.data.refreshToken)
}
