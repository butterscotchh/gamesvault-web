import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { publicApi } from '../../api/axios';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

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

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-cyber-card border border-cyber-border rounded-sm overflow-hidden">
            <div className="w-full h-48 bg-cyber-border/30 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-cyber-border/40 rounded animate-pulse w-3/4" />
              <div className="h-px bg-cyber-border/20" />
              <div className="flex gap-2">
                <div className="h-7 bg-cyber-border/30 rounded-sm animate-pulse w-20" />
                <div className="h-7 bg-cyber-border/30 rounded-sm animate-pulse w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border border-cyber-border/50 border-dashed rounded-sm">
        <p className="font-mono text-slate-600 tracking-widest text-sm">// NO PRODUCTS FOUND</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-opacity duration-300">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Nav buttons */}
        {totalPages > 1 && (
          <>
            <button
              onClick={prevPage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 bg-cyber-card border border-cyber-border hover:border-cyber-cyan text-slate-400 hover:text-cyber-cyan w-10 h-10 flex items-center justify-center z-10 transition-all duration-200 hover:shadow-neon-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPage}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 bg-cyber-card border border-cyber-border hover:border-cyber-cyan text-slate-400 hover:text-cyber-cyan w-10 h-10 flex items-center justify-center z-10 transition-all duration-200 hover:shadow-neon-sm"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Page counter + dots */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <span className="font-mono text-xs text-slate-600 tracking-widest">
            {String(currentPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'w-8 bg-cyber-cyan shadow-neon-sm'
                    : 'w-1.5 bg-cyber-border hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
