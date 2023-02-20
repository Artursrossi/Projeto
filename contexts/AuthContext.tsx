import React, { createContext, useEffect } from 'react'

export const AuthContext = createContext({})

export function AuthProvider({ children }: any): JSX.Element {
  const isAuthenticated = false

  useEffect(() => {}, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
