import { motion } from 'motion/react';
import { Camera, Instagram, Facebook, Mail } from 'lucide-react';

export function PortfolioMini() {
  const portfolioImages = Array(6).fill(0);

  return (
    <div className="bg-[#2F3E46] h-full w-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#354F52] py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="text-[#CAD2C5]" size={18} />
          <div className="text-lg text-[#CAD2C5] tracking-wider" style={{ fontWeight: 300 }}>
            ALEX RIVERS
          </div>
        </div>
        <div className="flex gap-2">
          <motion.div
            whileHover={{ scale: 1.1, borderColor: '#84A98C' }}
            className="w-6 h-6 border border-[#52796F] rounded flex items-center justify-center cursor-pointer transition-colors"
          >
            <Instagram size={12} className="text-[#84A98C]" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, borderColor: '#84A98C' }}
            className="w-6 h-6 border border-[#52796F] rounded flex items-center justify-center cursor-pointer transition-colors"
          >
            <Facebook size={12} className="text-[#84A98C]" />
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 border-b border-[#354F52]">
        <div className="text-2xl text-[#CAD2C5] mb-2 tracking-tight" style={{ fontWeight: 700 }}>
          PORTRAIT
        </div>
        <div className="text-[10px] text-[#84A98C] mb-3 leading-relaxed uppercase tracking-widest">
          Photographer based in St. Louis, MO
        </div>
        <div className="text-[10px] text-[#CAD2C5]/80 leading-relaxed">
          Capturing authentic moments through a lens. Specializing in editorial, portrait, and lifestyle photography.
        </div>
      </div>

      {/* Gallery Grid - Masonry style */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-1.5">
          {portfolioImages.map((_, idx) => {
            // Create varied heights for masonry effect
            const heights = ['h-20', 'h-24', 'h-20', 'h-28', 'h-20', 'h-24'];
            const gradients = [
              'from-[#52796F] to-[#354F52]',
              'from-[#84A98C] to-[#52796F]',
              'from-[#354F52] to-[#52796F]',
              'from-[#52796F] to-[#84A98C]',
              'from-[#84A98C] to-[#354F52]',
              'from-[#354F52] to-[#84A98C]',
            ];
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={`${heights[idx]} bg-gradient-to-br ${gradients[idx]} rounded cursor-pointer relative overflow-hidden group`}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#CAD2C5] opacity-0 group-hover:opacity-20 transition-opacity" />
                
                {/* Photo indicator */}
                <div className="absolute bottom-1 right-1 w-3 h-3 border border-[#84A98C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={8} className="text-[#CAD2C5] m-auto mt-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-4 pb-4">
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: '#84A98C' }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#52796F] text-[#CAD2C5] rounded py-2 text-xs font-medium tracking-wide transition-all flex items-center justify-center gap-2"
        >
          <Mail size={12} />
          Book a Session
        </motion.button>
      </div>

      {/* Footer info */}
      <div className="px-4 pb-3 text-center">
        <div className="text-[8px] text-[#84A98C] uppercase tracking-widest">
          Available for commissions
        </div>
      </div>
    </div>
  );
}
