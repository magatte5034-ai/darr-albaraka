import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

/**
 * Page de callback OAuth — Supabase redirige ici après Google Sign-In.
 * Route : /auth/callback
 *
 * Avec flowType:'pkce', Supabase inclut ?code= dans l'URL de redirect.
 * On appelle exchangeCodeForSession(code) explicitement pour éviter
 * tout problème de timing avec detectSessionInUrl sur Vercel/production.
 */
export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const errorParam = params.get('error')
    const errorDescription = params.get('error_description')

    // OAuth provider returned an error
    if (errorParam) {
      console.error('OAuth error:', errorParam, errorDescription)
      navigate('/login?error=' + encodeURIComponent(errorDescription || errorParam), { replace: true })
      return
    }

    // PKCE: exchange the authorization code for a session
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          console.error('exchangeCodeForSession error:', error.message)
          navigate('/login?error=' + encodeURIComponent(error.message), { replace: true })
        } else {
          navigate('/', { replace: true })
        }
      })
      return
    }

    // No code in URL — check if a session already exists (e.g. page refresh)
    supabase.auth.getSession().then(({ data }) => {
      navigate(data.session ? '/' : '/login', { replace: true })
    })
  }, [navigate])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '16px',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ fontSize: '40px' }}>🔐</div>
      <p style={{ color: '#4a7c2d', fontWeight: 600 }}>Connexion en cours...</p>
      <p style={{ color: '#6b7280', fontSize: '14px' }}>Veuillez patienter…</p>
    </div>
  )
}
