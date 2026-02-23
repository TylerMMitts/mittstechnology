import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Plus, Minus, X, Heart } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function EcommerceDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Handcrafted Wooden Bowl',
      price: 45,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
      category: 'Home Decor',
    },
    {
      id: 2,
      name: 'Missouri Wildflower Candle',
      price: 28,
      image: 'https://images.unsplash.com/photo-1602874801006-94c80e1a648b?w=400',
      category: 'Candles',
    },
    {
      id: 3,
      name: 'Artisan Ceramic Mug',
      price: 32,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
      category: 'Kitchenware',
    },
    {
      id: 4,
      name: 'Woven Throw Blanket',
      price: 85,
      image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400',
      category: 'Textiles',
    },
    {
      id: 5,
      name: 'Leather Journal',
      price: 38,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400',
      category: 'Stationery',
    },
    {
      id: 6,
      name: 'Macramé Wall Hanging',
      price: 65,
      image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400',
      category: 'Wall Art',
    },
  ];

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gradient-to-br from-[#CAD2C5] to-white min-h-screen">
      {/* Header */}
      <div className="bg-[#2F3E46] py-6 px-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-[#CAD2C5] tracking-wide" style={{ fontWeight: 300 }}>
              RIVERSIDE CRAFTS
            </h1>
            <p className="text-[#84A98C] text-sm">Handmade in Springfield, Missouri</p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative bg-[#52796F] text-[#CAD2C5] p-3 rounded-full hover:bg-[#354F52] transition-all"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#84A98C] text-[#2F3E46] w-6 h-6 rounded-full flex items-center justify-center text-sm" style={{ fontWeight: 500 }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-3xl text-[#2F3E46] mb-6 text-center" style={{ fontWeight: 300 }}>
          SHOP OUR COLLECTION
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-white border-none rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="relative aspect-square overflow-hidden bg-[#CAD2C5]">
                  <div className="w-full h-full bg-gradient-to-br from-[#CAD2C5] to-[#84A98C]"></div>
                  <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={20} className="text-[#52796F]" />
                  </button>
                </div>
                <div className="p-4">
                  <Badge className="bg-[#84A98C] text-white text-xs mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="text-lg text-[#2F3E46] mb-2" style={{ fontWeight: 500 }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-[#52796F]" style={{ fontWeight: 500 }}>
                      ${product.price}
                    </span>
                    <Button
                      onClick={() => addToCart(product)}
                      className="bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52] rounded-full"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Cart Header */}
              <div className="bg-[#2F3E46] p-6 flex items-center justify-between">
                <h2 className="text-2xl text-[#CAD2C5]" style={{ fontWeight: 500 }}>
                  Your Cart
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-[#CAD2C5] hover:text-[#84A98C] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart size={48} className="text-[#CAD2C5] mx-auto mb-4" />
                    <p className="text-[#354F52]">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-[#CAD2C5] rounded-xl p-4"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-[#84A98C] to-[#52796F] rounded-lg flex-shrink-0"></div>
                          <div className="flex-1">
                            <h3 className="text-[#2F3E46] mb-1" style={{ fontWeight: 500 }}>
                              {item.name}
                            </h3>
                            <p className="text-[#52796F] mb-2" style={{ fontWeight: 500 }}>
                              ${item.price}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#84A98C] transition-colors"
                              >
                                <Minus size={16} className="text-[#2F3E46]" />
                              </button>
                              <span className="text-[#2F3E46] w-8 text-center" style={{ fontWeight: 500 }}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#84A98C] transition-colors"
                              >
                                <Plus size={16} className="text-[#2F3E46]" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#354F52] hover:text-[#2F3E46]"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-[#CAD2C5] p-6 bg-[#CAD2C5]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl text-[#2F3E46]" style={{ fontWeight: 500 }}>
                      Total:
                    </span>
                    <span className="text-3xl text-[#52796F]" style={{ fontWeight: 500 }}>
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52] rounded-full py-6 text-lg">
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
