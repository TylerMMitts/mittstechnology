import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  onGetQuoteClick: () => void;
}

export function PricingSection({ onGetQuoteClick }: PricingSectionProps) {
  const pricingPlans = [
    {
      name: 'Initial Build',
      price: '$2,500',
      period: 'one-time',
      description: 'Custom website built from scratch',
      features: [
        'Custom design & development',
        'Mobile-responsive layout',
        'SEO optimization',
        'Contact forms & integrations',
        'Up to 5 pages',
        'Free stock images',
        'Launch support',
      ],
      highlighted: false,
    },
    {
      name: 'Monthly Maintenance',
      price: '$149',
      period: 'per month',
      description: 'Ongoing support and peace of mind',
      features: [
        'Website hosting',
        'Regular updates & backups',
        'Security monitoring',
        'Performance optimization',
        'Content updates',
        'Technical support',
        'Analytics reporting',
      ],
      highlighted: true,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

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
            SIMPLE, TRANSPARENT PRICING
          </h2>
          <p className="text-xl text-[#354F52] max-w-2xl mx-auto" style={{ fontFamily: "'Made Sunflower', sans-serif" }}>
            No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all ${
                  plan.highlighted
                    ? 'bg-[#52796F] border-2 border-[#354F52] scale-105'
                    : 'bg-[#CAD2C5] border-none'
                }`}
              >
                <div className="mb-6">
                  <h3
                    className={`text-2xl mb-2 ${
                      plan.highlighted ? 'text-[#CAD2C5]' : 'text-[#2F3E46]'
                    }`}
                    style={{ fontFamily: "'Made Sunflower', sans-serif", fontWeight: 600 }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className={`text-5xl ${
                        plan.highlighted ? 'text-[#CAD2C5]' : 'text-[#2F3E46]'
                      }`}
                      style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400 }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-lg ${
                        plan.highlighted ? 'text-[#84A98C]' : 'text-[#354F52]'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`${
                      plan.highlighted ? 'text-[#84A98C]' : 'text-[#354F52]'
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check
                        className={`${
                          plan.highlighted ? 'text-[#84A98C]' : 'text-[#52796F]'
                        } flex-shrink-0 mt-0.5`}
                        size={20}
                      />
                      <span
                        className={`${
                          plan.highlighted ? 'text-[#CAD2C5]' : 'text-[#354F52]'
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={onGetQuoteClick}
                  className={`w-full rounded-full py-6 text-lg transition-all hover:scale-105 ${
                    plan.highlighted
                      ? 'bg-[#CAD2C5] text-[#2F3E46] hover:bg-[#84A98C]'
                      : 'bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52]'
                  }`}
                >
                  Get Started
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-[#354F52] text-sm">
            * Prices may vary based on project complexity. Contact us for a custom quote.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
