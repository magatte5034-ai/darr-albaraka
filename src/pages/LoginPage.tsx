import GoogleSignInButton from '../components/Auth/GoogleSignInButton'

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '48px 40px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <div style={{ fontSize: '56px', marginBottom: '12px' }}>🛍️</div>
        <h1 style={{ color: '#2d5016', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
          Darr-Albaraka
        </h1>
        <p style={{ color: '#666', marginBottom: '36px', lineHeight: 1.6 }}>
          Connectez-vous pour accéder à la boutique
        </p>

        {/* Bouton Google */}
        <GoogleSignInButton />

        <p style={{ marginTop: '24px', fontSize: '12px', color: '#999' }}>
          En vous connectant, vous acceptez nos conditions d'utilisation
        </p>
      </div>
    </div>
  )
}
