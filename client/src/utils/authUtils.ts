import jwt_decode from 'jwt-decode'

export const getUserIdFromToken = (token: string) => {
  if (token) {
    const decodedToken = jwt_decode<{ userId: string }>(token)
    return decodedToken.userId
  }
  return null
}
