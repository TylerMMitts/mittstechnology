import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MissouriRootsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#CAD2C5] to-[#84A98C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Heart className="text-[#52796F]" size={32} />
              <span className="text-[#52796F] tracking-widest">LOCAL ROOTS</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-[#2F3E46] mb-6 tracking-tight" style={{ fontWeight: 300 }}>
              BASED IN MISSOURI. BUILT FOR MISSOURI.
            </h2>
            <p className="text-xl text-[#354F52] mb-6 leading-relaxed">
              We understand local businesses because we are one. From the Gateway Arch to the Lake of the Ozarks, 
              we know what Missouri customers are looking for.
            </p>
            <p className="text-lg text-[#354F52] leading-relaxed">
              When you work with Mitts Technology, you're not just getting a website—you're getting a partner 
              who understands the Show-Me State and knows how to help your business thrive online.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1700887947714-8a96b0039ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzb3VyaSUyMGxhbmRzY2FwZSUyMHNjZW5pY3xlbnwxfHx8fDE3NzEzNTU2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Missouri landscape"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E46]/60 to-transparent"></div>
            </div>

            {/* Missouri State Outline SVG */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#52796F]">
                <path
                  fill="currentColor"
                  d="M10,30 L30,20 L50,15 L70,20 L85,25 L90,35 L88,50 L85,65 L75,75 L60,80 L40,82 L25,78 L15,70 L10,55 Z"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#52796F] rounded-full opacity-5 blur-3xl -z-0"></div>
    </section>
  );
}
