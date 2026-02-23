import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase, User } from '../../lib/supabase';
import { toast } from 'sonner';
import { Users, DollarSign, Send, RefreshCw, Edit } from 'lucide-react';
import { Badge } from './ui/badge';

export function AdminPanel() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState<'customer' | 'admin'>('customer');
  const [invoiceAmount, setInvoiceAmount] = useState('2500');
  const [invoiceDescription, setInvoiceDescription] = useState('Website Build - Initial');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Could not fetch users:', error.message);
        toast.error('Could not fetch users. Make sure database tables are created.');
        setCustomers([]);
      } else {
        setCustomers(data || []);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStripeCustomer = async (user: User) => {
    try {
      // Check if running on Vercel or localhost
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isLocalhost) {
        toast.error('Stripe API routes only work on deployed site (Vercel), not localhost.');
        return;
      }

      const response = await fetch('/api/create-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          name: user.name,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Failed to create customer' }));
        throw new Error(data.error || 'Failed to create customer');
      }

      const data = await response.json();
      toast.success(`Stripe customer created for ${user.name}`);
      fetchCustomers(); // Refresh to show updated data
    } catch (error: any) {
      toast.error(error.message || 'Failed to create Stripe customer');
    }
  };

  const handleSendInvoice = async () => {
    if (!selectedCustomer) return;

    try {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isLocalhost) {
        toast.error('Stripe API routes only work on deployed site (Vercel), not localhost.');
        return;
      }

      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedCustomer.id,
          amount: parseFloat(invoiceAmount),
          description: invoiceDescription,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Failed to send invoice' }));
        throw new Error(data.error || 'Failed to send invoice');
      }

      const data = await response.json();
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
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isLocalhost) {
        toast.error('Stripe API routes only work on deployed site (Vercel), not localhost.');
        return;
      }

      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Failed to create subscription' }));
        throw new Error(data.error || 'Failed to create subscription');
      }

      const data = await response.json();
      toast.success(`Subscription created for ${user.name}`);
      fetchCustomers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create subscription');
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: editName,
          role: editRole,
        })
        .eq('id', editingUser.id);

      if (error) throw error;

      toast.success(`Updated ${editName}`);
      setEditingUser(null);
      fetchCustomers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user');
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditRole(user.role);
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-[#2F3E46] mb-2" style={{ fontWeight: 300 }}>
                Admin Panel
              </h1>
              <p className="text-[#354F52]">Manage customers, invoices, and subscriptions</p>
            </div>
            <Button
              onClick={fetchCustomers}
              variant="outline"
              className="border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-white"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Statistics */}
          <Card className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#52796F] rounded-full flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-[#354F52]">Total Users</p>
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
                <p className="text-sm text-[#354F52]">Active Subscriptions</p>
                <p className="text-2xl text-[#2F3E46]" style={{ fontWeight: 500 }}>
                  {customers.filter(c => c.subscription_status === 'active').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#354F52] rounded-full flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-[#354F52]">Customers</p>
                <p className="text-2xl text-[#2F3E46]" style={{ fontWeight: 500 }}>
                  {customers.filter(c => c.role === 'customer').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Customers Table */}
        <Card className="bg-white rounded-2xl p-6 shadow-lg mt-6">
          <h2 className="text-2xl text-[#2F3E46] mb-6" style={{ fontWeight: 500 }}>
            All Users
          </h2>

          {customers.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto mb-4 text-[#84A98C]" />
              <p className="text-lg text-[#2F3E46] mb-2">No users found</p>
              <p className="text-sm text-[#354F52] mb-4">
                Make sure you've run the SQL setup script to create the database tables and trigger.
              </p>
              <p className="text-xs text-[#354F52]">
                See SETUP_GUIDE.md for instructions
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#CAD2C5]">
                    <th className="text-left py-3 px-4 text-[#354F52]">Name</th>
                    <th className="text-left py-3 px-4 text-[#354F52]">Email</th>
                    <th className="text-left py-3 px-4 text-[#354F52]">Role</th>
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
                        <Badge className={customer.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}>
                          {customer.role}
                        </Badge>
                      </td>
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
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => openEditModal(customer)}
                            variant="outline"
                            className="border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-white text-xs"
                          >
                            <Edit size={12} className="mr-1" />
                            Edit
                          </Button>
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl text-[#2F3E46] mb-6" style={{ fontWeight: 500 }}>
                Edit User
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-role">Role</Label>
                  <select
                    id="edit-role"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as 'customer' | 'admin')}
                    className="mt-1 w-full px-3 py-2 border border-[#CAD2C5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#52796F]"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="bg-[#CAD2C5]/30 p-3 rounded-lg text-sm">
                  <p className="text-[#354F52]">
                    <strong>Email:</strong> {editingUser.email}
                  </p>
                  <p className="text-[#354F52] mt-1">
                    <strong>ID:</strong> <span className="font-mono text-xs">{editingUser.id}</span>
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleUpdateUser}
                    className="flex-1 bg-[#52796F] text-white hover:bg-[#354F52]"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setEditingUser(null)}
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
