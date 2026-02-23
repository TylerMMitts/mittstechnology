import { motion } from 'motion/react';
import { RestaurantMini } from './portfolio-demos/RestaurantMini';
import { ServiceMini } from './portfolio-demos/ServiceMini';
import { EcommerceMini } from './portfolio-demos/EcommerceMini';
import { PortfolioMini } from './portfolio-demos/PortfolioMini';
import { ShoppingCart, Calendar, Utensils, Camera } from 'lucide-react';

export function PortfolioSection() {
  const demos = [
    {
      title: 'Restaurant Menu',
      description: 'Interactive menus with online ordering capabilities. Perfect for cafes, bistros, and dining establishments.',
      features: ['Expandable categories', 'Item descriptions & pricing', 'Order buttons', 'Contact information'],
      component: <RestaurantMini />,
      icon: Utensils,
    },
    {
      title: 'Service Booking',
      description: 'Appointment scheduling for contractors, salons, and service providers. Streamline your bookings.',
      features: ['Calendar selection', 'Time slot booking', 'Service listings', 'Contact forms'],
      component: <ServiceMini />,
      icon: Calendar,
    },
    {
      title: 'E-Commerce Store',
      description: 'Full-featured online shops for retail, crafts, and product-based businesses.',
      features: ['Product catalog', 'Shopping cart', 'Quantity management', 'Checkout flow'],
      component: <EcommerceMini />,
      icon: ShoppingCart,
    },
    {
      title: 'Photography Portfolio',
      description: 'Stunning visual portfolios for photographers, artists, and creatives. Showcase your work beautifully.',
      features: ['Masonry galleries', 'Portfolio grid', 'Social integration', 'Booking forms'],
      component: <PortfolioMini />,
      icon: Camera,
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-white to-[#CAD2C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl text-[#2F3E46] mb-4 tracking-tight" style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400, letterSpacing: '0.05em' }}>
            OUR WORK
          </h2>
          <p className="text-xl text-[#354F52] max-w-2xl mx-auto" style={{ fontFamily: "'Made Sunflower', sans-serif" }}>
            See what we can build for your business
          </p>
        </motion.div>

        <div className="space-y-32">
          {demos.map((demo, index) => {
            const Icon = demo.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}
              >
                {/* Text Content */}
                <div className={`${isEven ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#52796F] text-[#CAD2C5] rounded-xl flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-3xl text-[#2F3E46]" style={{ fontFamily: "'Made Sunflower', sans-serif", fontWeight: 600 }}>
                      {demo.title}
                    </h3>
                  </div>
                  <p className="text-lg text-[#354F52] mb-6 leading-relaxed">
                    {demo.description}
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm text-[#52796F] uppercase tracking-wide" style={{ fontWeight: 500 }}>
                      Key Features:
                    </p>
                    <ul className="space-y-2">
                      {demo.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[#354F52]">
                          <div className="w-2 h-2 bg-[#84A98C] rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Demo Preview */}
                <div className={`${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-[#2F3E46] bg-[#2F3E46]"
                  >
                    {/* Browser Chrome */}
                    <div className="bg-[#2F3E46] px-4 py-3 flex items-center gap-2 border-b-2 border-[#354F52]">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 bg-[#354F52] rounded px-3 py-1 text-xs text-[#84A98C]">
                        example-site.com
                      </div>
                    </div>

                    {/* Demo Container - Fixed height, no scrolling */}
                    <div className="h-[500px] bg-white relative overflow-hidden">
                      {demo.component}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
