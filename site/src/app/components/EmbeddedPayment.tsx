import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { X, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentFormProps {
  clientSecret: string;
  amount: number;
  description: string;
  onSuccess: () => void;
  onCancel: () => void;
}

function PaymentForm({ clientSecret, amount, description, onSuccess, onCancel }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        onSuccess();
      }
    } catch (err: any) {
      toast.error(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Details Card */}
      <Card className="bg-[#CAD2C5] border-none rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#52796F] to-[#354F52] rounded-xl flex items-center justify-center">
              <CreditCard className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg text-[#2F3E46] font-medium">
                Payment Details
              </h3>
              <p className="text-sm text-[#354F52]">{description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-[#354F52] hover:text-[#2F3E46] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[#354F52]">Total Amount</span>
            <span className="text-2xl text-[#2F3E46] font-semibold">
              {formatCurrency(amount)}
            </span>
          </div>
        </div>
      </Card>

      {/* Payment Element */}
      <Card className="bg-white border-[#CAD2C5] border-2 rounded-2xl p-6">
        <PaymentElement
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                email: '',
              },
            },
          }}
        />
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="flex-1 border-[#52796F] text-[#52796F] hover:bg-[#CAD2C5] rounded-full py-6 text-lg"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-gradient-to-r from-[#52796F] to-[#354F52] hover:from-[#354F52] hover:to-[#2F3E46] text-white rounded-full py-6 text-lg shadow-lg"
        >
          {loading ? 'Processing...' : `Pay ${formatCurrency(amount)}`}
        </Button>
      </div>
    </form>
  );
}

interface EmbeddedPaymentProps {
  invoiceId: string;
  amount: number;
  description: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function EmbeddedPayment({
  invoiceId,
  amount,
  description,
  onSuccess,
  onCancel,
}: EmbeddedPaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch client secret on mount
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ invoiceId }),
        });

        if (!response.ok) {
          throw new Error('Failed to initialize payment');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message || 'Failed to load payment form');
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [invoiceId]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#52796F] mx-auto mb-4"></div>
          <p className="text-[#354F52]">Loading payment form...</p>
        </div>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Card className="bg-red-50 border-red-200 rounded-2xl p-6 max-w-md">
          <p className="text-red-600 text-center mb-4">
            {error || 'Failed to load payment form'}
          </p>
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full border-red-600 text-red-600 hover:bg-red-100 rounded-full"
          >
            Close
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#52796F',
              colorBackground: '#ffffff',
              colorText: '#2F3E46',
              colorDanger: '#ef4444',
              fontFamily: 'system-ui, sans-serif',
              spacingUnit: '4px',
              borderRadius: '12px',
            },
          },
        }}
      >
        <PaymentForm
          clientSecret={clientSecret}
          amount={amount}
          description={description}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </Elements>
    </div>
  );
}
