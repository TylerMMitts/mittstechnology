import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PricingSectionProps {
  onGetQuoteClick: () => void;
}

export function PricingSection({ onGetQuoteClick }: PricingSectionProps) {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[#2F3E46] mb-4 tracking-tight" style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400, letterSpacing: '0.05em' }}>
            CUSTOM PRICING FOR YOUR NEEDS
          </h2>
          <p className="text-xl text-[#354F52] max-w-2xl mx-auto" style={{ fontFamily: "'Made Sunflower', sans-serif" }}>
            Every website is unique. Let's discuss your vision and create a quote that fits your budget.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="rounded-3xl p-8 md:p-12 shadow-2xl bg-gradient-to-br from-[#52796F] to-[#354F52] border-none">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#CAD2C5] rounded-2xl mb-6">
                <Mail size={40} className="text-[#2F3E46]" />
              </div>
              <h3 className="text-3xl md:text-4xl text-[#CAD2C5] mb-4" style={{ fontFamily: "'Made Sunflower', sans-serif", fontWeight: 600 }}>
                Request Your Custom Quote
              </h3>
              <p className="text-lg text-[#84A98C] mb-8">
                The cost varies based on your specific needs, features, and complexity. Get in touch and we'll create a personalized proposal.
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
                <p className="text-[#84A98C] text-sm mb-2">Contact us at</p>
                <a
                  href="mailto:mittstechnologyllc@gmail.com"
                  className="text-[#84A98C] hover:text-white transition-colors break-all"
                >
                  mittstechnologyllc@gmail.com
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = 'mailto:mittstechnologyllc@gmail.com'}
                  className="bg-[#CAD2C5] text-[#2F3E46] hover:bg-white rounded-full py-6 px-8 text-lg transition-all hover:scale-105 shadow-lg"
                  style={{ fontFamily: "'Made Sunflower', sans-serif", fontWeight: 600 }}
                >
                  <Mail className="mr-2" size={20} />
                  Email for Quote
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  variant="outline"
                  className="border-2 border-[#CAD2C5] text-[#CAD2C5] hover:bg-[#CAD2C5] hover:text-[#2F3E46] rounded-full py-6 px-8 text-lg transition-all hover:scale-105"
                  style={{ fontFamily: "'Made Sunflower', sans-serif", fontWeight: 600 }}
                >
                  Get Started Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-[#354F52] text-sm">
            Quick response times • Free consultations • No obligation quotes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
