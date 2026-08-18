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

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-8 text-gray-500">Belum ada produk</div>;
  }

  return (
    <div className="w-full">
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <>
            <button
              onClick={prevPage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full shadow-lg border p-2 hover:bg-gray-50 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPage}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full shadow-lg border p-2 hover:bg-gray-50 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentPage ? 'w-6 bg-brick-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
