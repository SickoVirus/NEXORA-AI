'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// PayPal SDK global types
declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        createOrder: (data: unknown, actions: { order: { create: (arg: { purchase_units: { description: string; amount: { value: string; currency_code: string } }[] }) => Promise<unknown> } }) => unknown
        onApprove: (data: unknown, actions: { order: { capture: () => Promise<unknown> } }) => unknown
        onCancel: () => void
        onError: (err: unknown) => void
        style?: Record<string, string | number>
      }) => {
        render: (element: HTMLElement) => Promise<void>
      }
    }
  }
}

// Track if SDK is already loaded globally (avoids duplicate script loads)
let sdkLoaded = false

interface PayPalButtonProps {
  amount: number
  planName: string
  billingCycle?: 'monthly' | 'annual'
  onSuccess?: () => void
  onError?: () => void
}

export function PayPalButton({ amount, planName, billingCycle = 'monthly', onSuccess, onError }: PayPalButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const renderButton = useCallback(() => {
    if (!buttonRef.current || !window.paypal) return

    // Clear previous button
    buttonRef.current.innerHTML = ''

    window.paypal.Buttons({
      createOrder: (_data: unknown, actions: { order: { create: (arg0: { purchase_units: { description: string; amount: { value: string; currency_code: string } }[] }) => unknown } }) => {
        return actions.order.create({
          purchase_units: [{
            description: `NEXORA AI - ${planName} Plan (${billingCycle})`,
            amount: {
              value: amount.toString(),
              currency_code: 'USD',
            },
          }],
        })
      },
      onApprove: (_data: unknown, actions: { order: { capture: () => Promise<unknown> } }) => {
        return actions.order.capture().then(() => {
          onSuccess?.()
          router.push('/dashboard?payment=success')
        })
      },
      onCancel: () => {
        console.log('Payment cancelled')
      },
      onError: (err: unknown) => {
        console.error('PayPal error:', err)
        setError('Payment failed. Please try again.')
        onError?.()
      },
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'subscribe',
        height: 45,
      },
    }).render(buttonRef.current)
  }, [amount, planName, billingCycle, onSuccess, onError, router])

  useEffect(() => {
    // If SDK already loaded, render immediately
    if (window.paypal) {
      sdkLoaded = true
      setLoaded(true)
      renderButton()
      return
    }

    // Check if script tag is already in the DOM
    if (document.querySelector('script[src*="paypal.com/sdk/js"]')) {
      // Script is loading or loaded, wait for it
      const checkPayPal = setInterval(() => {
        if (window.paypal) {
          sdkLoaded = true
          setLoaded(true)
          renderButton()
          clearInterval(checkPayPal)
        }
      }, 200)
      return () => clearInterval(checkPayPal)
    }

    // Load PayPal SDK dynamically
    const script = document.createElement('script')
    script.src = 'https://www.paypal.com/sdk/js?client-id=BAAr2Ofo-h2rEq3MOv_6yCHcCRleUagByOA-A0wQ2bWqJkTtdrepTmeKPonLtIbuUZeJtF5obrvkRLrJ3o&components=buttons&disable-funding=venmo&currency=USD'
    script.async = true
    script.onload = () => {
      sdkLoaded = true
      setLoaded(true)
      renderButton()
    }
    script.onerror = () => {
      setError('Failed to load PayPal SDK. Please refresh and try again.')
      onError?.()
    }
    document.body.appendChild(script)

    // No cleanup for script — it stays in the DOM for other instances
  }, [renderButton, onError])

  return (
    <div className="w-full">
      {error && (
        <div className="text-xs text-danger mb-2 bg-danger/5 rounded-lg px-3 py-2 border border-danger/10">
          {error}
        </div>
      )}
      <div ref={buttonRef} className="min-h-[45px] paypal-button-container" />
      {!loaded && !error && (
        <div className="flex items-center justify-center h-[45px] rounded-lg bg-white/[0.03] border border-glass-border">
          <div className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
      )}
    </div>
  )
}
