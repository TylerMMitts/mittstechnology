import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export function TrustBar() {
  return (
    <section className="py-12 bg-[#2F3E46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-[#CAD2C5] text-lg">
            <MapPin className="text-[#84A98C]" />
            <span className="tracking-wide">
              Proudly Serving Missouri Businesses Since 2024
            </span>
          </div>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-[#CAD2C5] text-sm tracking-widest">ST. LOUIS</div>
            <div className="w-1 h-1 bg-[#52796F] rounded-full"></div>
            <div className="text-[#CAD2C5] text-sm tracking-widest">COLUMBIA</div>
            <div className="w-1 h-1 bg-[#52796F] rounded-full"></div>
            <div className="text-[#CAD2C5] text-sm tracking-widest">KANSAS CITY</div>
            <div className="w-1 h-1 bg-[#52796F] rounded-full"></div>
            <div className="text-[#CAD2C5] text-sm tracking-widest">SPRINGFIELD</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
