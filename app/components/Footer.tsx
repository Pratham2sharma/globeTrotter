import { Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold">GlobeTrotter</h3>
                <p className="text-sm text-teal-300">Premium Travel Planning</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted companion for extraordinary travel experiences worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/userprofile" className="text-gray-300 hover:text-yellow-400 transition-colors">Dashboard</a></li>
              <li><a href="/plan-trip" className="text-gray-300 hover:text-yellow-400 transition-colors">Plan Trip</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Destinations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@globetrotter.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 GlobeTrotter. Built for Odoo Hackathon 2025 by Bit Coders.
          </p>
        </div>
      </div>
    </footer>
  );
}