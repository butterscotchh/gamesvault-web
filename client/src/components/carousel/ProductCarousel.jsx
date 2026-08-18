import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { publicApi } from '../../api/axios';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  // Load dari API (public, ga pake token)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await publicApi.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  const goToPage = (index) => setCurrentPage(index);

  useEffect(() => {
    if (totalPages > 1) {
      const timer = setInterval(nextPage, 5000);
      return () => clearInterval(timer);
    }
  }, [totalPages]);

  const start = currentPage * itemsPerPage;
  const currentItems = products.slice(start, start + itemsPerPage);

  // ============ LOADING SKELETON ============
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="w-full h-48 bg-gray-200 animate-pulse" />
            <div className="p-4">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-3" />
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-16" />
                <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400">Belum ada produk tersedia</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative">
        {/* Grid dengan animasi transisi */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-opacity duration-300">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Tombol Navigasi */}
        {totalPages > 1 && (
          <>
            <button
              onClick={prevPage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-5 bg-white hover:bg-brick-50 text-gray-700 hover:text-brick-700 w-8 h-8 md:w-10 md:h-10 rounded-full shadow-lg border border-gray-200 hover:border-brick-300 flex items-center justify-center z-10 transition-all duration-200 hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={nextPage}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-5 bg-white hover:bg-brick-50 text-gray-700 hover:text-brick-700 w-8 h-8 md:w-10 md:h-10 rounded-full shadow-lg border border-gray-200 hover:border-brick-300 flex items-center justify-center z-10 transition-all duration-200 hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'w-8 bg-brick-600 shadow-sm shadow-brick-200'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
