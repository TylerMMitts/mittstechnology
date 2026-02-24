import { Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-[#2F3E46] text-[#CAD2C5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl mb-4 tracking-wider" style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400, letterSpacing: '0.1em' }}>
              MITTS TECHNOLOGY
            </h3>
            <p className="text-[#84A98C] mb-4" style={{ fontFamily: "'Made Sunflower', sans-serif" }}>
              Local Code. Missouri Roots.
            </p>
            <div className="flex items-center gap-2 text-[#84A98C] mb-2">
              <MapPin size={16} />
              <span>Based in Missouri</span>
            </div>
            <div className="flex items-center gap-2 text-[#84A98C]">
              <Mail size={16} />
              <a href="mailto:mittstechnologyllc@gmail.com" className="hover:text-[#CAD2C5] transition-colors">
                mittstechnologyllc@gmail.com
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg mb-4" style={{ fontWeight: 500 }}>
              Legal
            </h4>
            <div className="space-y-2">
              <a href="#" className="block text-[#84A98C] hover:text-[#CAD2C5] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-[#84A98C] hover:text-[#CAD2C5] transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#354F52] pt-8 text-center">
          <p className="text-[#84A98C] text-sm">
            © 2024 Mitts Technology. Proudly based in Missouri.
          </p>
        </div>
      </div>
    </footer>
  );
}
