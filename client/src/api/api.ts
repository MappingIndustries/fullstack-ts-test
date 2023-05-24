import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const refreshToken = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refreshToken')
  const response = await api.post('/auth/token', {
    token: refreshToken,
  })
  localStorage.setItem('accessToken', response.data.accessToken)
}

export const ensureAuthenticatedRequest = async (
  url: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<any>> => {
  let accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    await refreshToken()
    accessToken = localStorage.getItem('accessToken')
  }

  const response = await api({
    ...options,
    url,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
