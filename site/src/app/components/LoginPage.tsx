import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface LoginPageProps {
  mode: 'login' | 'signup';
  onSuccess: () => void;
  onSwitchMode: () => void;
}

export function LoginPage({ mode, onSuccess, onSwitchMode }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          toast.error('Please enter your name');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, name);
        if (error) {
          toast.error(error.message || 'Failed to create account');
        } else {
          toast.success('Account created! Please check your email to verify.');
          onSuccess();
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message || 'Invalid email or password');
        } else {
          toast.success('Welcome back!');
          onSuccess();
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl text-[#2F3E46] mb-2 tracking-wider" style={{ fontWeight: 500 }}>
              MITTS TECHNOLOGY
            </h1>
            <p className="text-[#354F52]">
              {mode === 'signup' ? 'Create your account' : 'Sign in to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div>
                <Label htmlFor="name" className="text-[#2F3E46]">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-1 rounded-lg border-[#84A98C] focus:border-[#52796F] focus:ring-[#52796F]"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-[#2F3E46]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1 rounded-lg border-[#84A98C] focus:border-[#52796F] focus:ring-[#52796F]"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#2F3E46]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 rounded-lg border-[#84A98C] focus:border-[#52796F] focus:ring-[#52796F]"
                required
                minLength={6}
              />
              {mode === 'signup' && (
                <p className="text-xs text-[#84A98C] mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-[#52796F] hover:text-[#354F52] transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52] rounded-full py-6 text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#354F52]">
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={onSwitchMode}
                className="text-[#52796F] hover:text-[#354F52] transition-colors"
                style={{ fontWeight: 500 }}
              >
                {mode === 'signup' ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
