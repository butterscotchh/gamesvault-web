import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import ProductCard from './ProductCard';
import { publicApi } from '../../api/axios';

const ProductCarousel = () => {
  const [products, setProducts]       = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading]         = useState(true);
  const itemsPerPage = 4;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await publicApi.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const nextPage   = () => setCurrentPage(p => (p + 1) % totalPages);
  const prevPage   = () => setCurrentPage(p => (p - 1 + totalPages) % totalPages);
  const goToPage   = (i) => setCurrentPage(i);

  useEffect(() => {
    if (totalPages > 1) {
      const t = setInterval(nextPage, 5000);
      return () => clearInterval(t);
    }
  }, [totalPages]);

  const currentItems = products.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

  /* ── Skeleton ── */
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="overflow-hidden" style={{ border: '2px solid #b89ee8', boxShadow: '4px 4px 0 #c0b0e0' }}>
            <div className="h-5" style={{ background: 'linear-gradient(90deg, #c9a8f5, #a8d8f5)' }} />
            <div className="h-44 animate-pulse" style={{ background: '#ede5ff' }} />
            <div className="p-3 space-y-2" style={{ background: '#e8deff' }}>
              <div className="h-3 rounded animate-pulse w-3/4" style={{ background: '#c9a8f5' }} />
              <div className="h-px" style={{ background: 'linear-gradient(90deg, #f5a8d0, #a8d8f5)' }} />
              <div className="flex gap-2">
                <div className="h-6 w-16 animate-pulse" style={{ background: '#d8c8f0' }} />
                <div className="h-6 w-16 animate-pulse" style={{ background: '#d8c8f0' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed" style={{ borderColor: '#b89ee8' }}>
        <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '10px', color: '#b89ee8', letterSpacing: '0.1em' }}>
          -- NO PRODUCTS FOUND --
        </p>
      </div>
    );
  }

  const NavBtn = ({ onClick, label, children }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center transition-all hover:-translate-y-0.5"
      style={{
        background: 'linear-gradient(135deg, #f0eaff, #e8deff)',
        border: '2px solid #b89ee8',
        boxShadow: '2px 2px 0 #c0b0e0',
        color: '#c9a8f5',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#f5a8d0'; e.currentTarget.style.color = '#f5a8d0'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#b89ee8'; e.currentTarget.style.color = '#c9a8f5'; }}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full">
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5">
              <NavBtn onClick={prevPage} label="Previous"><ChevronLeft className="w-5 h-5" /></NavBtn>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5">
              <NavBtn onClick={nextPage} label="Next"><ChevronRight className="w-5 h-5" /></NavBtn>
            </div>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#5a3d8a' }}>
            {String(currentPage + 1).padStart(2,'0')}/{String(totalPages).padStart(2,'0')}
          </span>
          <div className="flex gap-2 items-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                aria-label={`Slide ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width:  i === currentPage ? '28px' : '8px',
                  height: '8px',
                  background: i === currentPage ? 'linear-gradient(90deg, #f5a8d0, #c9a8f5)' : '#d0c0f0',
                  boxShadow: i === currentPage ? '0 0 8px #c9a8f5' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
          <Star className="w-3 h-3 animate-float" fill="currentColor"
            style={{ color: '#f5a8d0', filter: 'drop-shadow(0 0 3px #f5a8d0)', animationDelay: '0.3s' }} />
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
