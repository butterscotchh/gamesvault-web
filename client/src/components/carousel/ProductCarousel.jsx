import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="overflow-hidden" style={{ border: '1px solid #bfbaa7', boxShadow: '3px 3px 0 #a8a390' }}>
            <div className="h-5" style={{ background: 'linear-gradient(90deg, #bfbaa7, #ccc7b5, #bfbaa7)' }} />
            <div className="h-44 animate-pulse" style={{ background: '#ccc7b5' }} />
            <div className="p-3 space-y-2" style={{ background: '#d5d0c0' }}>
              <div className="h-2.5 animate-pulse w-3/4" style={{ background: '#bfbaa7' }} />
              <div className="h-px" style={{ background: 'linear-gradient(90deg, #bfbaa7, #8a7a60, #bfbaa7)' }} />
              <div className="flex gap-2">
                <div className="h-6 w-16 animate-pulse" style={{ background: '#bfbaa7' }} />
                <div className="h-6 w-16 animate-pulse" style={{ background: '#bfbaa7' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed" style={{ borderColor: '#bfbaa7' }}>
        <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '9px', color: '#8a7a60', letterSpacing: '0.1em' }}>
          -- NO PRODUCTS FOUND --
        </p>
      </div>
    );
  }

  const NavBtn = ({ onClick, label, children }) => (
    <button
      onClick={onClick} aria-label={label}
      className="w-10 h-10 flex items-center justify-center transition-all hover:-translate-y-0.5"
      style={{ background: '#dedad0', border: '1px solid #bfbaa7', boxShadow: '2px 2px 0 #a8a390', color: '#8a7a60' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b3833'; e.currentTarget.style.color = '#040405'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#bfbaa7'; e.currentTarget.style.color = '#8a7a60'; }}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full">
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentItems.map(product => <ProductCard key={product.id} product={product} />)}
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
        <div className="flex justify-center items-center gap-5 mt-10">
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#8a7a60', letterSpacing: '0.1em' }}>
            {String(currentPage + 1).padStart(2,'0')}/{String(totalPages).padStart(2,'0')}
          </span>
          <div className="flex gap-2 items-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => goToPage(i)} aria-label={`Slide ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === currentPage ? '28px' : '8px', height: '4px',
                  background: i === currentPage ? '#3b3833' : '#bfbaa7',
                  boxShadow: i === currentPage ? '0 0 6px rgba(59,56,51,0.3)' : 'none',
                  border: 'none', cursor: 'pointer',
                }}
              />
            ))}
          </div>
          <div style={{ width: 6, height: 6, background: '#8a7a60', transform: 'rotate(45deg)' }} />
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
