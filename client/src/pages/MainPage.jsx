import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HandheldShowcase from '../components/3D/HandheldShowcase';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-brick-700 mb-4">
              Gaming Handheld Showroom
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Temukan koleksi gaming handheld terbaik dari berbagai generasi
            </p>
            <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500">
              <span>PSP</span>
              <span>•</span>
              <span>DS Lite</span>
              <span>•</span>
              <span>PS Vita</span>
              <span>•</span>
              <span>3DS</span>
              <span>•</span>
              <span>2DS</span>
            </div>
          </div>
        </section>

        {/* 3D Showcase - CP-3 */}
        <HandheldShowcase />

        {/* Placeholder untuk CP-4 Carousel */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Our Products
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center">
              <p className="text-gray-400">Product Carousel - Coming Soon (CP-4)</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
