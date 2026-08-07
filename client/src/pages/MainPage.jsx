import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-brick-700 mb-4">
            Gaming Handheld Showroom
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Temukan koleksi gaming handheld terbaik
          </p>
          <p className="text-gray-400 text-sm">
            PSP · DS Lite · PS Vita · 3DS · 2DS
          </p>

          {/* Placeholder untuk CP-3 & CP-4 */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {['PSP', 'DS Lite', 'PS Vita', '3DS', '2DS'].map((device) => (
              <div
                key={device}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-3" />
                <p className="text-sm font-medium text-gray-700">{device}</p>
                <p className="text-xs text-gray-400">Coming Soon</p>
              </div>
            ))}
          </div>

          {/* Placeholder untuk CP-4 Carousel */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Products</h2>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <p className="text-gray-400">Product Carousel - Coming Soon (CP-4)</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
