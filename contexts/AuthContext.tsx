import { createContext, useEffect } from 'react'
import axios from 'axios'
import { parseCookies } from 'nookies'

type AuthContextType = {
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const isAuthenticated = false

  useEffect(() => {
    const { token: token } = parseCookies()
    if (token) {
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
