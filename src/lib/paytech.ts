// ============================================================
//  PayTech Payment Service — Darr-Albaraka
//  Documentation: https://paytech.sn/documentation
//  Supporte : Wave · Orange Money · Carte bancaire
// ============================================================

const PAYTECH_API_URL = 'https://paytech.sn/api/payment/request-payment'

export interface PayTechRequestParams {
  item_name: string
  item_price: number
  currency: 'XOF' | 'EUR' | 'USD'
  ref_command: string
  command_name: string
  env: 'test' | 'prod'
  ipn_url: string
  success_url: string
  cancel_url: string
  custom_field?: string
}

export interface PayTechResponse {
  success: number
  token?: string
  redirect_url?: string
  errors?: string[]
}

/**
 * Initie un paiement PayTech et retourne l'URL de redirection.
 * L'utilisateur sera redirigé vers la page PayTech où il pourra
 * choisir Wave, Orange Money ou Carte bancaire.
 */
export async function initiatePayTechPayment(
  params: PayTechRequestParams
): Promise<PayTechResponse> {
  const API_KEY = import.meta.env.VITE_PAYTECH_API_KEY
  const API_SECRET = import.meta.env.VITE_PAYTECH_API_SECRET

  if (!API_KEY || !API_SECRET) {
    throw new Error(
      'Clés PayTech non configurées. Ajoutez VITE_PAYTECH_API_KEY et VITE_PAYTECH_API_SECRET dans votre .env.local'
    )
  }

  const response = await fetch(PAYTECH_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': API_KEY,
      'API_SECRET': API_SECRET,
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    throw new Error(`Erreur PayTech API: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * Génère un identifiant unique pour la commande
 * Format: DA-TIMESTAMP-RANDOM
 */
export function generateRefCommand(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9).toUpperCase()
  return `DA-${timestamp}-${random}`
}

/**
 * Construit les paramètres PayTech à partir des données de la commande
 */
export function buildPayTechParams(options: {
  orderRef: string
  totalAmount: number
  customerName: string
  appUrl: string
}): PayTechRequestParams {
  const { orderRef, totalAmount, customerName, appUrl } = options
  const isProduction = import.meta.env.VITE_PAYTECH_ENV === 'prod'

  return {
    item_name: `Commande Darr-Albaraka — ${orderRef}`,
    item_price: totalAmount,
    currency: 'XOF',
    ref_command: orderRef,
    command_name: `Paiement commande ${orderRef} par ${customerName}`,
    env: isProduction ? 'prod' : 'test',
    ipn_url: `${appUrl}/payment/ipn`,
    success_url: `${appUrl}/payment/success?ref=${orderRef}`,
    cancel_url: `${appUrl}/payment/cancel?ref=${orderRef}`,
    custom_field: JSON.stringify({ customer: customerName, ref: orderRef }),
  }
}
