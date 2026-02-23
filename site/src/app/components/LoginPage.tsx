import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSignUpClick: () => void;
}

export function LoginPage({ onLogin, onSignUpClick }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
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
            <p className="text-[#354F52]">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              />
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-[#52796F] hover:text-[#354F52] transition-colors">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52] rounded-full py-6 text-lg transition-all hover:scale-105"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#354F52]">
              Don't have an account?{' '}
              <button
                onClick={onSignUpClick}
                className="text-[#52796F] hover:text-[#354F52] transition-colors"
                style={{ fontWeight: 500 }}
              >
                Sign Up
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#CAD2C5] text-center">
            <p className="text-sm text-[#84A98C]">
              Demo credentials: any email/password
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
