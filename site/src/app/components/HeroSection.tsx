import { motion } from 'motion/react';
import { Button } from './ui/button';

interface HeroSectionProps {
  onGetQuoteClick: () => void;
}

export function HeroSection({ onGetQuoteClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#CAD2C5] overflow-hidden">
      {/* Clean subtle background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2352796F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-left order-2 lg:order-1"
          >
            {/* Main Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl mb-6 text-[#2F3E46] tracking-tight uppercase"
              style={{
                fontFamily: "'Made Sunflower', 'Futura', sans-serif",
                fontWeight: 700,
                letterSpacing: '-2px',
              }}
            >
              Mitts<br />Technology
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl mb-8 text-[#354F52]"
              style={{ 
                fontFamily: "'Made Sunflower', 'Futura', sans-serif",
                fontWeight: 500 
              }}
            >
              Web Development
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl mb-10 text-[#52796F] max-w-xl"
              style={{ fontWeight: 400 }}
            >
              Building modern, professional websites for Missouri businesses. From restaurants to contractors, we bring your vision to life.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={onGetQuoteClick}
                className="bg-[#52796F] text-white hover:bg-[#354F52] rounded-full px-8 py-6 text-lg transition-all hover:scale-105 shadow-lg"
                style={{ fontFamily: "'Made Sunflower', sans-serif", fontWeight: 600 }}
              >
                Start Your Project
              </Button>
              <Button
                onClick={() => {
                  const element = document.getElementById('portfolio');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="border-2 border-[#84A98C] text-[#2F3E46] bg-transparent hover:bg-[#84A98C]/10 rounded-full px-8 py-6 text-lg transition-all hover:scale-105"
                style={{ fontFamily: "'Made Sunflower', sans-serif", fontWeight: 600 }}
              >
                View Our Work
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Monitor */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="relative" style={{ perspective: '1500px' }}>
              <motion.div
                animate={{
                  rotateY: [0, 2, 0, -2, 0],
                  rotateX: [0, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(5deg) rotateY(-3deg)',
                }}
                className="relative pb-12"
              >
                {/* Monitor frame */}
                <div className="relative bg-[#2F3E46] rounded-2xl shadow-2xl">
                  {/* Screen bezel */}
                  <div className="p-4">
                    {/* Screen content */}
                    <div className="relative bg-white rounded-lg overflow-hidden shadow-inner aspect-video">
                    {/* Clean website mockup */}
                    <div className="w-full h-full bg-gradient-to-br from-white to-[#f5f5f5] p-6">
                      {/* Header bar */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        <div className="flex-1 h-6 bg-[#e5e5e5] rounded ml-4" />
                      </div>

                      {/* Content mockup */}
                      <div className="space-y-4">
                        {/* Nav */}
                        <div className="flex gap-3 mb-6">
                          <div className="h-3 w-16 bg-[#52796F] rounded" />
                          <div className="h-3 w-20 bg-[#84A98C] rounded" />
                          <div className="h-3 w-16 bg-[#84A98C] rounded" />
                        </div>

                        {/* Hero section */}
                        <div className="space-y-3">
                          <div className="h-8 w-3/4 bg-[#2F3E46] rounded" />
                          <div className="h-6 w-2/3 bg-[#84A98C] rounded" />
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-3 gap-2 mt-6">
                          <div className="h-16 bg-gradient-to-br from-[#84A98C] to-[#52796F] rounded shadow-sm" />
                          <div className="h-16 bg-gradient-to-br from-[#52796F] to-[#354F52] rounded shadow-sm" />
                          <div className="h-16 bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] rounded shadow-sm" />
                        </div>

                        {/* Content lines */}
                        <div className="space-y-2 mt-6">
                          <div className="h-2 w-full bg-[#e5e5e5] rounded" />
                          <div className="h-2 w-5/6 bg-[#e5e5e5] rounded" />
                          <div className="h-2 w-4/6 bg-[#e5e5e5] rounded" />
                        </div>
                      </div>
                    </div>

                    {/* Screen glare effect */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                      }}
                    />
                  </div>
                </div>

                {/* Monitor chin */}
                <div className="h-8 bg-[#2F3E46] rounded-b-2xl" />
              </div>

              {/* Monitor stand */}
              <div className="absolute left-1/2 -translate-x-1/2 w-20 h-16 bg-[#354F52] rounded-t-lg bottom-0" 
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
                }}
              />

              {/* Monitor base */}
              <div className="absolute left-1/2 -translate-x-1/2 w-48 h-4 bg-[#2F3E46] rounded-full -bottom-2"
                style={{
                  boxShadow: '0 8px 30px rgba(47, 62, 70, 0.4)',
                }}
              />

              {/* Floating shadow */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-3xl opacity-10 -z-10"
                style={{
                  background: 'radial-gradient(ellipse at center, #2F3E46 0%, transparent 70%)',
                  transform: 'translate(-50%, 30%) scale(0.9)',
                }}
              />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#52796F] rounded-full opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#354F52] rounded-full opacity-5 blur-3xl pointer-events-none" />
    </section>
  );
}
