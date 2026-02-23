import { motion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';

export function ServiceMini() {
  const dates = ['20', '21', '22', '23', '24'];
  const times = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM'];

  return (
    <div className="bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] h-full w-full overflow-hidden">
      {/* Header */}
      <div className="bg-[#2F3E46] py-4 px-4">
        <div className="text-xl text-[#CAD2C5] tracking-wide" style={{ fontWeight: 300 }}>
          RELIABLE ROOFING
        </div>
        <div className="text-xs text-[#84A98C]">Expert Roofing Services</div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Services */}
        <div className="space-y-2 mb-4">
          {['Roof Inspection', 'Roof Repair', 'Installation'].map((service, idx) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-lg p-2 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#2F3E46]" style={{ fontWeight: 500 }}>
                  {service}
                </span>
                <span className="text-[10px] text-[#52796F]">Book →</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Widget */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 text-sm text-[#2F3E46] mb-3" style={{ fontWeight: 500 }}>
            <Calendar size={14} className="text-[#52796F]" />
            Book Appointment
          </div>

          {/* Date Selection */}
          <div className="mb-3">
            <div className="text-[10px] text-[#354F52] mb-1">Select Date</div>
            <div className="flex gap-1">
              {dates.map((date, idx) => (
                <motion.button
                  key={date}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  whileHover={{ scale: 1.1, backgroundColor: '#52796F', color: '#CAD2C5' }}
                  className="flex-1 p-2 rounded-lg border-2 border-[#CAD2C5] text-xs text-[#2F3E46] transition-colors"
                >
                  {date}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <div className="text-[10px] text-[#354F52] mb-1 flex items-center gap-1">
              <Clock size={10} />
              Select Time
            </div>
            <div className="grid grid-cols-2 gap-1">
              {times.map((time, idx) => (
                <motion.button
                  key={time}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: '#52796F', color: '#CAD2C5' }}
                  className="p-2 rounded-lg border-2 border-[#CAD2C5] text-[10px] text-[#2F3E46] transition-colors"
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#52796F] text-[#CAD2C5] rounded-full py-2 text-xs mt-3"
          >
            Confirm Booking
          </motion.button>
        </div>
      </div>
    </div>
  );
}
