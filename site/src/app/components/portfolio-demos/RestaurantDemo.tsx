import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MapPin, Phone, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export function RestaurantDemo() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('appetizers');

  const menuCategories = [
    {
      id: 'appetizers',
      name: 'Appetizers',
      items: [
        { name: 'Missouri BBQ Wings', price: '$12', description: 'Smoked wings with KC BBQ sauce' },
        { name: 'Toasted Ravioli', price: '$10', description: 'St. Louis classic with marinara' },
        { name: 'Spinach Artichoke Dip', price: '$11', description: 'Served with tortilla chips' },
      ],
    },
    {
      id: 'entrees',
      name: 'Main Courses',
      items: [
        { name: 'Gateway Burger', price: '$16', description: 'Half-pound angus beef, aged cheddar' },
        { name: 'Kansas City Strip Steak', price: '$28', description: '12oz prime cut with garlic butter' },
        { name: 'Missouri Trout', price: '$22', description: 'Pan-seared with lemon herb butter' },
        { name: 'Veggie Pasta Primavera', price: '$18', description: 'Fresh seasonal vegetables' },
      ],
    },
    {
      id: 'desserts',
      name: 'Desserts',
      items: [
        { name: 'Gooey Butter Cake', price: '$8', description: 'St. Louis signature dessert' },
        { name: 'Apple Pie', price: '$7', description: 'Homemade with vanilla ice cream' },
        { name: 'Chocolate Lava Cake', price: '$9', description: 'Warm with berry compote' },
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#2F3E46] to-[#354F52] min-h-screen text-[#CAD2C5]">
      {/* Header */}
      <div className="bg-[#52796F] py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl mb-2 tracking-wide" style={{ fontWeight: 300 }}>
            MAIN STREET BISTRO
          </h1>
          <p className="text-[#CAD2C5]/80">Authentic Missouri Cuisine</p>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-[#354F52] py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#84A98C]" />
            <span>123 Main St, St. Louis, MO</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-[#84A98C]" />
            <span>(314) 555-0123</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#84A98C]" />
            <span>Mon-Sat 11am-10pm</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-3xl mb-6 text-center" style={{ fontWeight: 300 }}>
          OUR MENU
        </h2>

        <div className="space-y-4">
          {menuCategories.map((category) => (
            <Card key={category.id} className="bg-[#CAD2C5] border-none rounded-2xl overflow-hidden">
              <button
                onClick={() =>
                  setExpandedCategory(expandedCategory === category.id ? null : category.id)
                }
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#84A98C] transition-colors"
              >
                <h3 className="text-2xl text-[#2F3E46]" style={{ fontWeight: 500 }}>
                  {category.name}
                </h3>
                <motion.div
                  animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-[#52796F]" size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedCategory === category.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {category.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start justify-between bg-white rounded-lg p-4"
                        >
                          <div className="flex-1">
                            <h4 className="text-lg text-[#2F3E46] mb-1" style={{ fontWeight: 500 }}>
                              {item.name}
                            </h4>
                            <p className="text-sm text-[#354F52]">{item.description}</p>
                          </div>
                          <div className="text-xl text-[#52796F] ml-4" style={{ fontWeight: 500 }}>
                            {item.price}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>

        {/* Order Button */}
        <div className="mt-8 text-center">
          <Button className="bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52] rounded-full px-12 py-6 text-lg">
            Order Online Now
          </Button>
        </div>
      </div>
    </div>
  );
}
