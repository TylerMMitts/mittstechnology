import { useState } from 'react';
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
} from 'lucide-react';
import { Badge } from './ui/badge';

interface DashboardProps {
  user: { name: string; email: string };
}

export function Dashboard({ user }: DashboardProps) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Home', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'payment', label: 'Payment Methods', icon: Wallet },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  const invoices = [
    {
      id: 'INV-001',
      date: '2024-02-01',
      description: 'Monthly Maintenance - February 2024',
      amount: '$149.00',
      status: 'Paid',
    },
    {
      id: 'INV-002',
      date: '2024-01-15',
      description: 'Website Build - Initial',
      amount: '$2,500.00',
      status: 'Paid',
    },
    {
      id: 'INV-003',
      date: '2024-01-01',
      description: 'Monthly Maintenance - January 2024',
      amount: '$149.00',
      status: 'Paid',
    },
  ];

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
                        Maintenance Pro
                      </h3>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle size={12} className="mr-1" />
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-[#354F52] mb-4">
                    Next billing: March 1, 2024
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
                  <div className="space-y-3">
                    {invoices.slice(0, 3).map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="text-sm text-[#2F3E46]" style={{ fontWeight: 500 }}>
                            {invoice.description}
                          </p>
                          <p className="text-xs text-[#354F52]">{invoice.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                            {invoice.amount}
                          </p>
                          <Badge className="bg-green-100 text-green-700">
                            {invoice.status}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-[#52796F] hover:text-[#354F52]"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  <div className="flex items-center justify-between bg-white rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-[#52796F] to-[#354F52] rounded"></div>
                      <div>
                        <p className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                          •••• •••• •••• 4242
                        </p>
                        <p className="text-sm text-[#354F52]">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setCurrentTab('payment')}
                      variant="outline"
                      className="border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-[#CAD2C5] rounded-full"
                    >
                      Update
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        );

      case 'invoices':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl text-[#2F3E46] mb-6" style={{ fontWeight: 300 }}>
              Invoices
            </h2>
            <Card className="bg-white border-none rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#CAD2C5]">
                    <tr>
                      <th className="px-6 py-4 text-left text-[#2F3E46]">Invoice #</th>
                      <th className="px-6 py-4 text-left text-[#2F3E46]">Date</th>
                      <th className="px-6 py-4 text-left text-[#2F3E46]">Description</th>
                      <th className="px-6 py-4 text-left text-[#2F3E46]">Amount</th>
                      <th className="px-6 py-4 text-left text-[#2F3E46]">Status</th>
                      <th className="px-6 py-4 text-left text-[#2F3E46]">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-[#CAD2C5]">
                        <td className="px-6 py-4 text-[#2F3E46]" style={{ fontWeight: 500 }}>
                          {invoice.id}
                        </td>
                        <td className="px-6 py-4 text-[#354F52]">{invoice.date}</td>
                        <td className="px-6 py-4 text-[#354F52]">{invoice.description}</td>
                        <td className="px-6 py-4 text-[#2F3E46]" style={{ fontWeight: 500 }}>
                          {invoice.amount}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-100 text-green-700">
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-[#52796F] hover:text-[#354F52]"
                          >
                            <Download size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              <div className="mb-6">
                <h3 className="text-2xl text-[#2F3E46] mb-2" style={{ fontWeight: 500 }}>
                  Maintenance Pro
                </h3>
                <p className="text-[#354F52] mb-4">$149/month</p>
                <Badge className="bg-green-500 text-white">
                  <CheckCircle size={12} className="mr-1" />
                  Active
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <span className="text-[#354F52]">Next billing date</span>
                  <span className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                    March 1, 2024
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <span className="text-[#354F52]">Billing cycle</span>
                  <span className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                    Monthly
                  </span>
                </div>
              </div>

              <div className="border-t border-[#84A98C] pt-6">
                <Button
                  variant="destructive"
                  className="rounded-full"
                >
                  Cancel Subscription
                </Button>
                <p className="text-sm text-[#354F52] mt-2">
                  Cancel anytime. No questions asked.
                </p>
              </div>
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
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-white rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-10 bg-gradient-to-r from-[#52796F] to-[#354F52] rounded"></div>
                    <div>
                      <p className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                        •••• •••• •••• 4242
                      </p>
                      <p className="text-sm text-[#354F52]">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-[#CAD2C5] rounded-full"
                  >
                    Edit
                  </Button>
                </div>

                <Button className="w-full bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52] rounded-full">
                  Add Payment Method
                </Button>
              </div>
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
    </div>
  );
}
