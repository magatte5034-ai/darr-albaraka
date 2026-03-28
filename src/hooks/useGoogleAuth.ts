import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redirige vers /auth/callback après la connexion Google
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) throw error
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur de connexion Google'
      setError(message)
      console.error('Google Sign-In error:', message)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur de déconnexion'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return { signInWithGoogle, signOut, loading, error }
}
