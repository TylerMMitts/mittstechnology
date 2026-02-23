import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function PortfolioDemo() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const galleryImages = [
    { id: 1, title: 'Morning Flow', category: 'Vinyasa' },
    { id: 2, title: 'Sunset Meditation', category: 'Meditation' },
    { id: 3, title: 'Warrior Pose', category: 'Hatha' },
    { id: 4, title: 'Group Session', category: 'Classes' },
    { id: 5, title: 'Balance Practice', category: 'Vinyasa' },
    { id: 6, title: 'Restorative', category: 'Gentle' },
    { id: 7, title: 'Studio Space', category: 'Studio' },
    { id: 8, title: 'Private Session', category: 'One-on-One' },
  ];

  const schedule = [
    { day: 'Monday', classes: [{ time: '6:00 AM', name: 'Morning Flow', instructor: 'Sarah' }, { time: '6:00 PM', name: 'Restorative', instructor: 'Mike' }] },
    { day: 'Wednesday', classes: [{ time: '6:00 AM', name: 'Vinyasa', instructor: 'Sarah' }, { time: '7:00 PM', name: 'Hatha', instructor: 'Lisa' }] },
    { day: 'Friday', classes: [{ time: '6:00 AM', name: 'Power Yoga', instructor: 'Mike' }, { time: '6:00 PM', name: 'Gentle Flow', instructor: 'Sarah' }] },
    { day: 'Saturday', classes: [{ time: '9:00 AM', name: 'All Levels', instructor: 'Lisa' }] },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-[#CAD2C5] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#52796F] to-[#84A98C] py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl text-white mb-4 tracking-wide"
            style={{ fontWeight: 300 }}
          >
            ZEN DEN YOGA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#CAD2C5]"
          >
            Find Your Balance in Kansas City
          </motion.p>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl text-[#2F3E46] mb-4" style={{ fontWeight: 300 }}>
              WELCOME TO OUR STUDIO
            </h2>
            <p className="text-[#354F52] mb-4 leading-relaxed">
              At Zen Den Yoga, we believe in creating a peaceful sanctuary where students of all
              levels can explore the transformative power of yoga. Our experienced instructors guide
              you through mindful practices that strengthen both body and mind.
            </p>
            <p className="text-[#354F52] leading-relaxed">
              Whether you're a beginner or an advanced practitioner, you'll find a welcoming
              community and classes tailored to your needs.
            </p>
          </div>
          <div className="space-y-4">
            <Card className="bg-[#CAD2C5] border-none rounded-xl p-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#52796F]" size={24} />
                <div>
                  <p className="text-sm text-[#354F52]">Location</p>
                  <p className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                    456 Oak St, Kansas City, MO
                  </p>
                </div>
              </div>
            </Card>
            <Card className="bg-[#CAD2C5] border-none rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Phone className="text-[#52796F]" size={24} />
                <div>
                  <p className="text-sm text-[#354F52]">Phone</p>
                  <p className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                    (816) 555-0147
                  </p>
                </div>
              </div>
            </Card>
            <Card className="bg-[#CAD2C5] border-none rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Mail className="text-[#52796F]" size={24} />
                <div>
                  <p className="text-sm text-[#354F52]">Email</p>
                  <p className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                    hello@zendenyoga.com
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Class Schedule */}
        <div className="mb-16">
          <h2 className="text-3xl text-[#2F3E46] mb-6 text-center" style={{ fontWeight: 300 }}>
            CLASS SCHEDULE
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {schedule.map((day, idx) => (
              <Card
                key={day.day}
                className="bg-white border-none rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-xl text-[#2F3E46] mb-4 text-center" style={{ fontWeight: 500 }}>
                  {day.day}
                </h3>
                <div className="space-y-3">
                  {day.classes.map((cls, cidx) => (
                    <div key={cidx} className="bg-[#CAD2C5] rounded-lg p-3">
                      <p className="text-sm text-[#52796F]" style={{ fontWeight: 500 }}>
                        {cls.time}
                      </p>
                      <p className="text-[#2F3E46]" style={{ fontWeight: 500 }}>
                        {cls.name}
                      </p>
                      <p className="text-xs text-[#354F52]">with {cls.instructor}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl text-[#2F3E46] mb-6 text-center" style={{ fontWeight: 300 }}>
            GALLERY
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedImage(img.id)}
                className="aspect-square bg-gradient-to-br from-[#52796F] to-[#84A98C] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-lg relative group"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontWeight: 500 }}>
                    {img.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-8">
          <h2 className="text-3xl text-[#2F3E46] mb-6 text-center" style={{ fontWeight: 300 }}>
            GET IN TOUCH
          </h2>
          <Card className="bg-white border-none rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <form className="space-y-4">
              <div>
                <label className="text-sm text-[#354F52] mb-1 block">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="rounded-lg border-[#CAD2C5] focus:border-[#52796F]"
                />
              </div>
              <div>
                <label className="text-sm text-[#354F52] mb-1 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="rounded-lg border-[#CAD2C5] focus:border-[#52796F]"
                />
              </div>
              <div>
                <label className="text-sm text-[#354F52] mb-1 block">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your yoga journey..."
                  className="rounded-lg border-[#CAD2C5] focus:border-[#52796F] min-h-32"
                />
              </div>
              <Button className="w-full bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52] rounded-full py-6 text-lg">
                Send Message
              </Button>
            </form>
          </Card>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <button className="w-12 h-12 bg-[#52796F] text-[#CAD2C5] rounded-full flex items-center justify-center hover:bg-[#354F52] transition-colors">
            <Instagram size={20} />
          </button>
          <button className="w-12 h-12 bg-[#52796F] text-[#CAD2C5] rounded-full flex items-center justify-center hover:bg-[#354F52] transition-colors">
            <Facebook size={20} />
          </button>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full aspect-video bg-gradient-to-br from-[#52796F] to-[#84A98C] rounded-2xl"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#CAD2C5] transition-colors"
                >
                  <X className="text-[#2F3E46]" />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
