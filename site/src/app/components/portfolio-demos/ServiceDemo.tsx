import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle, MapPin, Phone } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function ServiceDemo() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const services = [
    { id: 1, name: 'Roof Inspection', duration: '1 hour', price: 'Free' },
    { id: 2, name: 'Roof Repair', duration: '2-4 hours', price: 'From $500' },
    { id: 3, name: 'New Roof Installation', duration: '1-3 days', price: 'From $8,000' },
    { id: 4, name: 'Gutter Cleaning', duration: '1 hour', price: '$150' },
  ];

  const availableDates = [
    { date: '2024-02-20', day: 'Tue', dayNum: '20' },
    { date: '2024-02-21', day: 'Wed', dayNum: '21' },
    { date: '2024-02-22', day: 'Thu', dayNum: '22' },
    { date: '2024-02-23', day: 'Fri', dayNum: '23' },
    { date: '2024-02-24', day: 'Sat', dayNum: '24' },
  ];

  const timeSlots = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];

  const beforeAfter = [
    {
      before: 'https://images.unsplash.com/photo-1562259929-14ab7afcd6e6?w=400',
      after: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400',
      title: 'Shingle Replacement',
    },
    {
      before: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
      after: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400',
      title: 'Complete Roof Overhaul',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] min-h-screen">
      {/* Header */}
      <div className="bg-[#2F3E46] py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl text-[#CAD2C5] mb-2 tracking-wide" style={{ fontWeight: 300 }}>
            RELIABLE ROOFING
          </h1>
          <p className="text-[#84A98C]">Columbia's Trusted Roofing Experts Since 2010</p>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-[#354F52] py-4 px-4 text-[#CAD2C5]">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#84A98C]" />
            <span>Serving Columbia & surrounding areas</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-[#84A98C]" />
            <span>(573) 555-0199</span>
          </div>
          <Badge className="bg-[#52796F] text-[#CAD2C5]">24/7 Emergency Service</Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Services & Booking */}
          <div>
            <h2 className="text-3xl text-[#2F3E46] mb-6" style={{ fontWeight: 300 }}>
              OUR SERVICES
            </h2>
            <div className="space-y-3 mb-8">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className="bg-white border-none rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg text-[#2F3E46]" style={{ fontWeight: 500 }}>
                        {service.name}
                      </h3>
                      <p className="text-sm text-[#354F52]">{service.duration}</p>
                    </div>
                    <div className="text-[#52796F]" style={{ fontWeight: 500 }}>
                      {service.price}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Booking Widget */}
            <Card className="bg-white border-none rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl text-[#2F3E46] mb-4 flex items-center gap-2" style={{ fontWeight: 500 }}>
                <Calendar className="text-[#52796F]" />
                Book Your Appointment
              </h3>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="text-sm text-[#354F52] mb-2 block">Select Date</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {availableDates.map((date) => (
                    <button
                      key={date.date}
                      onClick={() => setSelectedDate(date.date)}
                      className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                        selectedDate === date.date
                          ? 'border-[#52796F] bg-[#52796F] text-[#CAD2C5]'
                          : 'border-[#CAD2C5] bg-[#CAD2C5] text-[#2F3E46] hover:border-[#84A98C]'
                      }`}
                    >
                      <span className="text-xs mb-1">{date.day}</span>
                      <span className="text-2xl" style={{ fontWeight: 500 }}>
                        {date.dayNum}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <label className="text-sm text-[#354F52] mb-2 block flex items-center gap-2">
                    <Clock size={16} />
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTime === time
                            ? 'border-[#52796F] bg-[#52796F] text-[#CAD2C5]'
                            : 'border-[#CAD2C5] bg-[#CAD2C5] text-[#2F3E46] hover:border-[#84A98C]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Confirm Button */}
              {selectedDate && selectedTime && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button className="w-full bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52] rounded-full py-6 text-lg">
                    <CheckCircle className="mr-2" />
                    Confirm Booking
                  </Button>
                </motion.div>
              )}
            </Card>
          </div>

          {/* Before & After Gallery */}
          <div>
            <h2 className="text-3xl text-[#2F3E46] mb-6" style={{ fontWeight: 300 }}>
              BEFORE & AFTER
            </h2>
            <div className="space-y-6">
              {beforeAfter.map((project, idx) => (
                <Card key={idx} className="bg-white border-none rounded-2xl overflow-hidden shadow-xl">
                  <div className="p-4">
                    <h3 className="text-xl text-[#2F3E46] mb-4" style={{ fontWeight: 500 }}>
                      {project.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                    <div>
                      <p className="text-xs text-[#354F52] mb-2">BEFORE</p>
                      <div className="aspect-video bg-[#354F52] rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-[#354F52] to-[#2F3E46]"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#354F52] mb-2">AFTER</p>
                      <div className="aspect-video bg-[#52796F] rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-[#52796F] to-[#84A98C]"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Service Areas */}
            <Card className="mt-6 bg-white border-none rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl text-[#2F3E46] mb-4 flex items-center gap-2" style={{ fontWeight: 500 }}>
                <MapPin className="text-[#52796F]" />
                Service Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Columbia', 'Jefferson City', 'Fulton', 'Boonville', 'Ashland'].map((city) => (
                  <Badge key={city} className="bg-[#CAD2C5] text-[#2F3E46]">
                    {city}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
