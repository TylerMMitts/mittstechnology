import { motion } from 'motion/react';
import { Code, Search, Headphones } from 'lucide-react';
import { Card } from './ui/card';

export function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: 'Custom Website Development',
      description: 'One-time build with ongoing monthly maintenance. Built from scratch to match your vision.',
    },
    {
      icon: Search,
      title: 'Local SEO & Optimization',
      description: 'Get found by Missouri customers. Optimized for local search and mobile devices.',
    },
    {
      icon: Headphones,
      title: 'Ongoing Support',
      description: 'Hosting, updates, and peace of mind. Focus on your business while we handle the tech.',
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
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[#2F3E46] mb-4 tracking-tight" style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400, letterSpacing: '0.05em' }}>
            WHAT WE DO
          </h2>
          <p className="text-xl text-[#354F52] max-w-2xl mx-auto" style={{ fontFamily: "'Made Sunflower', sans-serif" }}>
            Full-service web development designed for Missouri businesses
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-[#CAD2C5] border-none rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                <div className="bg-[#52796F] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="text-[#CAD2C5]" size={32} />
                </div>
                <h3 className="text-2xl text-[#2F3E46] mb-4" style={{ fontFamily: "'Made Sunflower', sans-serif", fontWeight: 600 }}>
                  {service.title}
                </h3>
                <p className="text-[#354F52] leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
