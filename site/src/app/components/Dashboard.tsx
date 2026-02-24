import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Wallet,
  HelpCircle,
  Download,
  CheckCircle,
  Clock,
  Menu,
  X,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { supabase, type User, type Invoice } from '../../lib/supabase';
import { EmbeddedPayment } from './EmbeddedPayment';
import { toast } from 'sonner';

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentInvoice, setPaymentInvoice] = useState<Invoice | null>(null);
  const [syncingInvoices, setSyncingInvoices] = useState<Set<string>>(new Set());

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Home', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'payment', label: 'Payment Methods', icon: Wallet },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  useEffect(() => {
    fetchInvoices();
  }, [user.id]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Could not fetch invoices. Database may not be set up yet:', error.message);
        setInvoices([]);
      } else {
        setInvoices(data || []);
      }
    } catch (error) {
      console.warn('Error loading invoices:', error);
      setInvoices([]);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      paid: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      failed: { color: 'bg-red-100 text-red-700', icon: AlertCircle },
    };
    const config = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    const Icon = config.icon;
    return (
      <Badge className={config.color}>
        <Icon size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleDownloadInvoice = async (stripeInvoiceId: string) => {
    // Open Stripe invoice in new tab
    window.open(`https://invoice.stripe.com/i/${stripeInvoiceId.split('_')[1]}`, '_blank');
  };

  const handlePayInvoice = (invoice: Invoice) => {
    setPaymentInvoice(invoice);
  };

  const handlePaymentSuccess = async () => {
    toast.success('Payment successful! Updating invoice status...');
    setPaymentInvoice(null);
    
    // Wait 2 seconds for webhook to process, then refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    await fetchInvoices();
    
    // If still pending after 2 seconds, try again
    setTimeout(async () => {
      await fetchInvoices();
    }, 3000);
  };

  const handlePaymentCancel = () => {
    setPaymentInvoice(null);
  };

  const handleSyncInvoiceStatus = async (invoice: Invoice) => {
    setSyncingInvoices(prev => new Set(prev).add(invoice.id));
    
    try {
      const response = await fetch('/api/sync-invoice-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId: invoice.id }),
      });

      const data = await response.json();
      
      if (data.wasUpdated) {
        toast.success(`Invoice status updated to: ${data.status}`);
        await fetchInvoices();
      } else {
        toast.info(data.message || 'Invoice status is already up to date');
      }
    } catch (error: any) {
      console.error('Sync error:', error);
      toast.error('Failed to sync invoice status');
    } finally {
      setSyncingInvoices(prev => {
        const newSet = new Set(prev);
        newSet.delete(invoice.id);
        return newSet;
      });
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl text-[#2F3E46] mb-6" style={{ fontWeight: 300 }}>
                Welcome back, {user.name}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Subscription Status Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="bg-[#CAD2C5] border-none rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-[#354F52] mb-1">Current Plan</p>
                      <h3 className="text-xl text-[#2F3E46]" style={{ fontWeight: 500 }}>
                        {user.subscription_status === 'active' ? 'Maintenance Pro' : 'No Active Plan'}
                      </h3>
                    </div>
                    {user.subscription_status === 'active' ? (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle size={12} className="mr-1" />
                        Active
                      </Badge>
                    ) : user.subscription_status === 'past_due' ? (
                      <Badge className="bg-yellow-500 text-white">
                        <Clock size={12} className="mr-1" />
                        Past Due
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-400 text-white">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#354F52] mb-4">
                    {user.stripe_customer_id 
                      ? 'Manage your subscription in Stripe Customer Portal' 
                      : 'No subscription configured yet'}
                  </p>
                  <Button
                    onClick={() => setCurrentTab('subscription')}
                    variant="outline"
                    className="w-full border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-[#CAD2C5] rounded-full"
                  >
                    Manage Plan
                  </Button>
                </Card>
              </motion.div>

              {/* Recent Invoices Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-2"
              >
                <Card className="bg-[#CAD2C5] border-none rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl text-[#2F3E46] mb-4" style={{ fontWeight: 500 }}>
                    Recent Invoices
                  </h3>
                  {loading ? (
                    <div className="text-center py-8 text-[#354F52]">Loading invoices...</div>
                  ) : invoices.length === 0 ? (
                    <div className="text-center py-8 text-[#354F52]">
                      No invoices yet. Your admin will send you invoices here.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {invoices.slice(0, 3).map((invoice) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg gap-2"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#2F3E46] truncate" style={{ fontWeight: 500 }}>
                              {invoice.description}
                            </p>
                            <p className="text-xs text-[#354F52]">{formatDate(invoice.created_at)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-[#2F3E46] whitespace-nowrap" style={{ fontWeight: 500 }}>
                              {formatCurrency(invoice.amount)}
                            </p>
                            {getStatusBadge(invoice.status)}
                            {invoice.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handlePayInvoice(invoice)}
                                  className="bg-gradient-to-r from-[#52796F] to-[#354F52] hover:from-[#354F52] hover:to-[#2F3E46] text-white rounded-full px-3"
                                >
                                  Pay
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleSyncInvoiceStatus(invoice)}
                                  disabled={syncingInvoices.has(invoice.id)}
                                  className="text-[#52796F] hover:text-[#354F52] px-2"
                                  title="Check payment status in Stripe"
                                >
                                  <RefreshCw size={14} className={syncingInvoices.has(invoice.id) ? 'animate-spin' : ''} />
                                </Button>
                              </>
                            )}
                            {invoice.status === 'paid' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-[#52796F] hover:text-[#354F52]"
                                onClick={() => handleDownloadInvoice(invoice.stripe_invoice_id)}
                              >
                                <Download size={16} />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    onClick={() => setCurrentTab('invoices')}
                    variant="ghost"
                    className="w-full mt-4 text-[#52796F] hover:bg-[#84A98C]"
                  >
                    View All Invoices
                  </Button>
                </Card>
              </motion.div>

              {/* Payment Method Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="md:col-span-3"
              >
                <Card className="bg-[#CAD2C5] border-none rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl text-[#2F3E46] mb-4" style={{ fontWeight: 500 }}>
                    Payment Method
                  </h3>
                  {user.stripe_customer_id ? (
                    <div className="flex items-center justify-between bg-white rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-[#52796F] to-[#354F52] rounded flex items-center justify-center">
                          <Wallet size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                            Payment methods available
                          </p>
                          <p className="text-sm text-[#354F52]">Managed through Stripe</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setCurrentTab('payment')}
                        variant="outline"
                        className="border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-[#CAD2C5] rounded-full"
                      >
                        Manage
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-4 text-center">
                      <p className="text-sm text-[#354F52]">
                        No payment method configured yet
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        );

      case 'invoices':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl text-[#2F3E46]" style={{ fontWeight: 300 }}>
                Invoices
              </h2>
              <Button
                onClick={fetchInvoices}
                variant="outline"
                disabled={loading}
                className="border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-white rounded-full"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin mr-2' : 'mr-2'} />
                Refresh
              </Button>
            </div>
            <Card className="bg-white border-none rounded-2xl overflow-hidden shadow-lg">
              {loading ? (
                <div className="text-center py-12 text-[#354F52]">Loading invoices...</div>
              ) : invoices.length === 0 ? (
                <div className="text-center py-12 text-[#354F52]">
                  <FileText size={48} className="mx-auto mb-4 text-[#84A98C]" />
                  <p className="text-lg mb-2">No invoices yet</p>
                  <p className="text-sm">Your admin will send you invoices here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#CAD2C5]">
                      <tr>
                        <th className="px-6 py-4 text-left text-[#2F3E46]">Date</th>
                        <th className="px-6 py-4 text-left text-[#2F3E46]">Description</th>
                        <th className="px-6 py-4 text-left text-[#2F3E46]">Amount</th>
                        <th className="px-6 py-4 text-left text-[#2F3E46]">Status</th>
                        <th className="px-6 py-4 text-left text-[#2F3E46]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-[#CAD2C5]">
                          <td className="px-6 py-4 text-[#354F52]">{formatDate(invoice.created_at)}</td>
                          <td className="px-6 py-4 text-[#354F52]">{invoice.description}</td>
                          <td className="px-6 py-4 text-[#2F3E46]" style={{ fontWeight: 500 }}>
                            {formatCurrency(invoice.amount)}
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(invoice.status)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              {invoice.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handlePayInvoice(invoice)}
                                    className="bg-gradient-to-r from-[#52796F] to-[#354F52] hover:from-[#354F52] hover:to-[#2F3E46] text-white rounded-full"
                                  >
                                    Pay Now
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleSyncInvoiceStatus(invoice)}
                                    disabled={syncingInvoices.has(invoice.id)}
                                    className="border-[#52796F] text-[#52796F] hover:bg-[#CAD2C5] rounded-full"
                                  >
                                    <RefreshCw size={14} className={syncingInvoices.has(invoice.id) ? 'animate-spin mr-1' : 'mr-1'} />
                                    {syncingInvoices.has(invoice.id) ? 'Checking...' : 'Check Status'}
                                  </Button>
                                </>
                              )}
                              {invoice.status === 'paid' && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-[#52796F] hover:text-[#354F52]"
                                  onClick={() => handleDownloadInvoice(invoice.stripe_invoice_id)}
                                >
                                  <Download size={16} />
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
          </div>
        );

      case 'subscription':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl text-[#2F3E46] mb-6" style={{ fontWeight: 300 }}>
              Subscription Management
            </h2>
            <Card className="bg-[#CAD2C5] border-none rounded-2xl p-8 shadow-lg">
              {!user.stripe_customer_id ? (
                <div className="text-center py-8">
                  <CreditCard size={48} className="mx-auto mb-4 text-[#84A98C]" />
                  <p className="text-lg text-[#2F3E46] mb-2">No subscription configured</p>
                  <p className="text-sm text-[#354F52]">
                    Your admin will set up a subscription for you if needed.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl text-[#2F3E46] mb-2" style={{ fontWeight: 500 }}>
                      {user.subscription_status === 'active' ? 'Maintenance Pro' : 'Subscription'}
                    </h3>
                    <p className="text-[#354F52] mb-4">$149/month</p>
                    {user.subscription_status === 'active' ? (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle size={12} className="mr-1" />
                        Active
                      </Badge>
                    ) : user.subscription_status === 'past_due' ? (
                      <Badge className="bg-yellow-500 text-white">
                        <Clock size={12} className="mr-1" />
                        Past Due
                      </Badge>
                    ) : user.subscription_status === 'canceled' ? (
                      <Badge className="bg-gray-500 text-white">
                        Canceled
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-400 text-white">
                        Inactive
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <span className="text-[#354F52]">Subscription Status</span>
                      <span className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                        {user.subscription_status ? user.subscription_status.charAt(0).toUpperCase() + user.subscription_status.slice(1).replace('_', ' ') : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <span className="text-[#354F52]">Stripe Customer ID</span>
                      <span className="text-[#2F3E46] text-sm font-mono">
                        {user.stripe_customer_id}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-[#84A98C] pt-6">
                    <Button
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/create-portal-session', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId: user.id }),
                          });
                          const data = await response.json();
                          if (data.url) {
                            window.location.href = data.url;
                          }
                        } catch (error) {
                          console.error('Failed to open customer portal:', error);
                        }
                      }}
                      className="bg-[#52796F] hover:bg-[#354F52] text-white rounded-full"
                    >
                      Manage Subscription in Stripe
                    </Button>
                    <p className="text-sm text-[#354F52] mt-2">
                      Manage your subscription, payment methods, and billing information.
                    </p>
                  </div>
                </>
              )}
            </Card>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl text-[#2F3E46] mb-6" style={{ fontWeight: 300 }}>
              Payment Methods
            </h2>
            <Card className="bg-[#CAD2C5] border-none rounded-2xl p-8 shadow-lg">
              {!user.stripe_customer_id ? (
                <div className="text-center py-8">
                  <Wallet size={48} className="mx-auto mb-4 text-[#84A98C]" />
                  <p className="text-lg text-[#2F3E46] mb-2">No payment methods yet</p>
                  <p className="text-sm text-[#354F52]">
                    Your admin will set up billing for you if needed.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[#354F52] mb-4">
                    Your payment methods are managed securely through Stripe.
                  </p>
                  <Button
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/create-portal-session', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ userId: user.id }),
                        });
                        const data = await response.json();
                        if (data.url) {
                          window.location.href = data.url;
                        }
                      } catch (error) {
                        console.error('Failed to open customer portal:', error);
                      }
                    }}
                    className="w-full bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52] rounded-full"
                  >
                    Manage Payment Methods in Stripe
                  </Button>
                  <p className="text-sm text-[#354F52] text-center">
                    Add, edit, or remove payment methods securely.
                  </p>
                </div>
              )}
            </Card>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl text-[#2F3E46] mb-6" style={{ fontWeight: 300 }}>
              Support & Contact
            </h2>
            <Card className="bg-[#CAD2C5] border-none rounded-2xl p-8 shadow-lg">
              <p className="text-[#354F52] mb-6">
                Need help? We're here for you. Reach out to us anytime.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-[#354F52] mb-1">Email</p>
                  <a
                    href="mailto:support@mittstech.com"
                    className="text-[#52796F] hover:text-[#354F52]"
                    style={{ fontWeight: 500 }}
                  >
                    support@mittstech.com
                  </a>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-[#354F52] mb-1">Response Time</p>
                  <p className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                    Within 24 hours
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CAD2C5] to-[#84A98C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block">
            <Card className="bg-[#2F3E46] border-none rounded-2xl p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-[#CAD2C5] text-lg mb-1" style={{ fontWeight: 500 }}>
                  {user.name}
                </h3>
                <p className="text-[#84A98C] text-sm">{user.email}</p>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      currentTab === item.id
                        ? 'bg-[#52796F] text-[#CAD2C5]'
                        : 'text-[#84A98C] hover:bg-[#354F52] hover:text-[#CAD2C5]'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </aside>

          {/* Mobile Menu Button */}
          <div className="lg:hidden col-span-full">
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full bg-[#2F3E46] text-[#CAD2C5] hover:bg-[#354F52] rounded-full"
            >
              {mobileMenuOpen ? <X className="mr-2" /> : <Menu className="mr-2" />}
              Menu
            </Button>
            {mobileMenuOpen && (
              <Card className="mt-4 bg-[#2F3E46] border-none rounded-2xl p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        currentTab === item.id
                          ? 'bg-[#52796F] text-[#CAD2C5]'
                          : 'text-[#84A98C] hover:bg-[#354F52] hover:text-[#CAD2C5]'
                      }`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <main className="lg:col-span-3">{renderContent()}</main>
        </div>
      </div>

      {/* Payment Modal */}
      {paymentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <EmbeddedPayment
              invoiceId={paymentInvoice.id}
              amount={paymentInvoice.amount}
              description={paymentInvoice.description}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
