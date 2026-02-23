import { motion } from 'motion/react';
import { MessageSquare, Rocket, Wrench } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Tell Us Your Vision',
      description: 'Free consultation to understand your business and goals',
      number: '01',
    },
    {
      icon: Rocket,
      title: 'We Build & Launch',
      description: 'Custom development in weeks, not months',
      number: '02',
    },
    {
      icon: Wrench,
      title: 'We Handle the Tech',
      description: 'Monthly maintenance so you can focus on your business',
      number: '03',
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-[#2F3E46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[#CAD2C5] mb-4 tracking-tight" style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400, letterSpacing: '0.05em' }}>
            HOW IT WORKS
          </h2>
          <p className="text-xl text-[#84A98C] max-w-2xl mx-auto" style={{ fontFamily: "'Made Sunflower', sans-serif" }}>
            Simple process, powerful results
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12 relative"
        >
          {/* Connecting line - desktop only */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-[#52796F] -z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative z-10"
            >
              <div className="text-center">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#52796F] rounded-full mb-6 relative">
                  <span className="text-2xl text-[#CAD2C5]" style={{ fontWeight: 500 }}>
                    {step.number}
                  </span>
                  <div className="absolute inset-0 rounded-full bg-[#52796F] animate-ping opacity-20"></div>
                </div>

                {/* Icon */}
                <div className="bg-[#354F52] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <step.icon className="text-[#84A98C]" size={36} />
                </div>

                {/* Content */}
                <h3 className="text-2xl text-[#CAD2C5] mb-4" style={{ fontFamily: "'Made Sunflower', sans-serif", fontWeight: 600 }}>
                  {step.title}
                </h3>
                <p className="text-[#84A98C] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
