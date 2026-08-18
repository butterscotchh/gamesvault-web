import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductCarousel from '../components/carousel/ProductCarousel';
import HandheldShowcase from '../components/3D/HandheldShowcase';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-brick-700 mb-4">
              Gaming Handheld Showroom
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan koleksi gaming handheld terbaik dari berbagai generasi
            </p>
          </div>
        </section>

        {/* 3D Showcase */}
        <HandheldShowcase />

        {/* Product Carousel */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Our Products
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Koleksi handheld terbaik untuk kamu
            </p>
            <ProductCarousel />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
