import { Gamepad2, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-6 h-6 text-brick-600" />
              <span className="text-lg font-bold text-brick-700">
                Gamer<span className="text-gray-600">Handheld</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Showroom untuk para pecinta gaming handheld. Temukan koleksi 
              PSP, DS, PS Vita, dan lainnya di sini.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-brick-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brick-600 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brick-600 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-lg hover:bg-brick-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-600 hover:text-brick-600" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-lg hover:bg-brick-100 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-600 hover:text-brick-600" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-lg hover:bg-brick-100 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5 text-gray-600 hover:text-brick-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          &copy; {currentYear} GamerHandheld. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
