import { motion } from 'motion/react';
import { MapPin, Phone, ChevronDown } from 'lucide-react';

export function RestaurantMini() {
  const appetizers = [
    { name: 'Kansas City Strip Steak', desc: '12oz prime cut', price: '$28' },
    { name: 'Bruschetta', desc: 'Fresh tomato & basil', price: '$8' },
    { name: 'Calamari', desc: 'Lightly fried', price: '$12' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#2F3E46] to-[#354F52] h-full w-full overflow-hidden">
      {/* Header */}
      <div className="bg-[#52796F] py-4 px-4">
        <div className="text-xl text-[#CAD2C5] tracking-wide" style={{ fontWeight: 300 }}>
          MAIN STREET BISTRO
        </div>
        <div className="text-xs text-[#CAD2C5]/70">Authentic Missouri Cuisine</div>
      </div>

      {/* Info Bar */}
      <div className="bg-[#354F52] py-2 px-4 flex gap-4 text-[10px] text-[#CAD2C5]">
        <div className="flex items-center gap-1">
          <MapPin size={10} />
          <span>St. Louis, MO</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone size={10} />
          <span>(314) 555-0123</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2">
        <div className="text-lg text-[#CAD2C5] mb-3" style={{ fontWeight: 300 }}>
          OUR MENU
        </div>

        {/* Appetizers - Expanded */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0 }}
          className="bg-[#84A98C] rounded-lg overflow-hidden"
        >
          <div className="p-3 cursor-pointer flex items-center justify-between">
            <span className="text-sm text-[#2F3E46]" style={{ fontWeight: 500 }}>
              Appetizers
            </span>
            <ChevronDown size={14} className="text-[#2F3E46]" />
          </div>
          
          {/* Expanded appetizer items */}
          <div className="px-3 pb-3 space-y-2">
            {appetizers.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                whileHover={{ backgroundColor: '#ffffff', x: 4 }}
                className="bg-white/90 rounded-lg p-2 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-[#2F3E46]" style={{ fontWeight: 500 }}>
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#354F52]">{item.desc}</div>
                  </div>
                  <div className="text-xs text-[#52796F]" style={{ fontWeight: 500 }}>
                    {item.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Categories - Collapsed */}
        {['Main Courses', 'Desserts'].map((category, idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (idx + 1) * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: '#84A98C' }}
            className="bg-[#CAD2C5] rounded-lg p-3 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#2F3E46]" style={{ fontWeight: 500 }}>
                {category}
              </span>
              <ChevronDown size={14} className="text-[#52796F]" />
            </div>
          </motion.div>
        ))}

        {/* Order Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#52796F] text-[#CAD2C5] rounded-full py-2 text-sm mt-4"
        >
          Order Online
        </motion.button>
      </div>
    </div>
  );
}
