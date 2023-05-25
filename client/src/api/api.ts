import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const BASE_URL = 'http://localhost:5000/api'

export const ensureAuthenticatedRequest = async (
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new Error('Access token is missing.')
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const requestConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...config?.headers,
      ...headers,
    },
  }

  try {
    const response = await axios.request({
      ...requestConfig,
      url: `${BASE_URL}${url}`,
    })
    return response
  } catch (error: any) {
    throw new Error(`Request failed: ${error.message}`)
  }
}
