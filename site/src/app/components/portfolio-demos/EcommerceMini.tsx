import { motion } from 'motion/react';
import { ShoppingCart, Heart } from 'lucide-react';

export function EcommerceMini() {
  const products = [
    { name: 'Wooden Bowl', price: '$45' },
    { name: 'Candle Set', price: '$28' },
    { name: 'Ceramic Mug', price: '$32' },
    { name: 'Throw Blanket', price: '$85' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#CAD2C5] to-white h-full w-full overflow-hidden">
      {/* Header */}
      <div className="bg-[#2F3E46] py-3 px-4 flex items-center justify-between">
        <div>
          <div className="text-lg text-[#CAD2C5] tracking-wide" style={{ fontWeight: 300 }}>
            RIVERSIDE CRAFTS
          </div>
          <div className="text-[10px] text-[#84A98C]">Handmade Goods</div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative bg-[#52796F] text-[#CAD2C5] p-2 rounded-full cursor-pointer"
        >
          <ShoppingCart size={16} />
          <span className="absolute -top-1 -right-1 bg-[#84A98C] text-[#2F3E46] w-4 h-4 rounded-full flex items-center justify-center text-[8px]" style={{ fontWeight: 500 }}>
            3
          </span>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="text-sm text-[#2F3E46] mb-3 text-center" style={{ fontWeight: 300 }}>
          SHOP OUR COLLECTION
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}
              className="bg-white rounded-xl overflow-hidden cursor-pointer shadow-md"
            >
              {/* Product Image Placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart size={12} className="text-[#52796F]" />
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-2">
                <div className="text-[10px] text-[#2F3E46] mb-1" style={{ fontWeight: 500 }}>
                  {product.name}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52796F]" style={{ fontWeight: 500 }}>
                    {product.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-[#52796F] text-[#CAD2C5] text-[8px] px-2 py-1 rounded-full"
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cart Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 bg-[#CAD2C5] rounded-xl p-3"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#2F3E46]" style={{ fontWeight: 500 }}>
              Cart Total:
            </span>
            <span className="text-sm text-[#52796F]" style={{ fontWeight: 500 }}>
              $105
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#52796F] text-[#CAD2C5] rounded-full py-2 text-xs"
          >
            Checkout
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
