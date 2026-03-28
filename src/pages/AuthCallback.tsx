import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

/**
 * Page de callback OAuth — Supabase redirige ici après Google Sign-In.
 * Route : /auth/callback
 *
 * Avec flowType:'pkce', Supabase doit d'abord échanger le ?code= contre
 * une session (async). On écoute onAuthStateChange au lieu d'appeler
 * getSession() immédiatement, qui pourrait retourner null trop tôt.
 */
export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/', { replace: true })
      } else if (event === 'SIGNED_OUT' || (!session && event !== 'INITIAL_SESSION')) {
        navigate('/login', { replace: true })
      }
    })

    // Fallback : si detectSessionInUrl a déjà traité le code avant le mount
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Auth callback error:', error.message)
        navigate('/login?error=' + encodeURIComponent(error.message), { replace: true })
      } else if (data.session) {
        navigate('/', { replace: true })
      }
    })

    return () => subscription.unsubscribe()
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
    </div>
  )
}
