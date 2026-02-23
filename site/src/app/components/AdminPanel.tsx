import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase, User } from '../../lib/supabase';
import { toast } from 'sonner';
import { Users, DollarSign, Send } from 'lucide-react';

export function AdminPanel() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [invoiceAmount, setInvoiceAmount] = useState('2500');
  const [invoiceDescription, setInvoiceDescription] = useState('Website Build - Initial');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'customer')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Could not fetch customers. Database may not be set up yet:', error.message);
        setCustomers([]);
      } else {
        setCustomers(data || []);
      }
    } catch (error) {
      console.warn('Error loading customers:', error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStripeCustomer = async (user: User) => {
    try {
      const response = await fetch('/api/create-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          name: user.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      toast.success(`Stripe customer created for ${user.name}`);
      fetchCustomers(); // Refresh to show updated data
    } catch (error: any) {
      toast.error(error.message || 'Failed to create Stripe customer');
    }
  };

  const handleSendInvoice = async () => {
    if (!selectedCustomer) return;

    try {
      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedCustomer.id,
          amount: parseFloat(invoiceAmount),
          description: invoiceDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      toast.success(`Invoice sent to ${selectedCustomer.email}`);
      setSelectedCustomer(null);
      setInvoiceAmount('2500');
      setInvoiceDescription('Website Build - Initial');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send invoice');
    }
  };

  const handleCreateSubscription = async (user: User) => {
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      toast.success(`Subscription created for ${user.name}`);
      fetchCustomers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create subscription');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl text-[#2F3E46] mb-2" style={{ fontWeight: 300 }}>
            Admin Panel
          </h1>
          <p className="text-[#354F52]">Manage customers, invoices, and subscriptions</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Statistics */}
          <Card className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#52796F] rounded-full flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-[#354F52]">Total Customers</p>
                <p className="text-2xl text-[#2F3E46]" style={{ fontWeight: 500 }}>
                  {customers.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#84A98C] rounded-full flex items-center justify-center">
                <DollarSign className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-[#354F52]">With Subscriptions</p>
                <p className="text-2xl text-[#2F3E46]" style={{ fontWeight: 500 }}>
                  {customers.filter(c => c.subscription_status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Customers Table */}
        <Card className="bg-white rounded-2xl p-6 shadow-lg mt-6">
          <h2 className="text-2xl text-[#2F3E46] mb-6" style={{ fontWeight: 500 }}>
            Customers
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#CAD2C5]">
                  <th className="text-left py-3 px-4 text-[#354F52]">Name</th>
                  <th className="text-left py-3 px-4 text-[#354F52]">Email</th>
                  <th className="text-left py-3 px-4 text-[#354F52]">Stripe Customer</th>
                  <th className="text-left py-3 px-4 text-[#354F52]">Subscription</th>
                  <th className="text-left py-3 px-4 text-[#354F52]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-[#CAD2C5] hover:bg-[#CAD2C5]/20">
                    <td className="py-3 px-4 text-[#2F3E46]">{customer.name}</td>
                    <td className="py-3 px-4 text-[#354F52]">{customer.email}</td>
                    <td className="py-3 px-4">
                      {customer.stripe_customer_id ? (
                        <span className="text-green-600 text-sm">✓ Created</span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleCreateStripeCustomer(customer)}
                          className="bg-[#52796F] text-white hover:bg-[#354F52] text-xs"
                        >
                          Create
                        </Button>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {customer.subscription_status === 'active' ? (
                        <span className="text-green-600 text-sm">Active</span>
                      ) : customer.stripe_customer_id ? (
                        <Button
                          size="sm"
                          onClick={() => handleCreateSubscription(customer)}
                          className="bg-[#84A98C] text-white hover:bg-[#52796F] text-xs"
                        >
                          Add Subscription
                        </Button>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {customer.stripe_customer_id && (
                        <Button
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
                          className="bg-[#2F3E46] text-white hover:bg-[#354F52] text-xs"
                        >
                          <Send size={12} className="mr-1" />
                          Invoice
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Invoice Modal */}
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl text-[#2F3E46] mb-6" style={{ fontWeight: 500 }}>
                Send Invoice to {selectedCustomer.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    type="text"
                    value={invoiceDescription}
                    onChange={(e) => setInvoiceDescription(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleSendInvoice}
                    className="flex-1 bg-[#52796F] text-white hover:bg-[#354F52]"
                  >
                    Send Invoice
                  </Button>
                  <Button
                    onClick={() => setSelectedCustomer(null)}
                    variant="outline"
                    className="flex-1 border-[#84A98C]"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
