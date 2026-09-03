import { ShoppingBag, Store } from 'lucide-react';

const SigilMark = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: '#8a7a60' }}>
    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="0.6" />
    <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="0.5" />
    <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="5" cy="5" r="1.2" fill="currentColor" />
  </svg>
);

const ProductCard = ({ product }) => {
  const hasShopee    = product.shopeeLink    && product.shopeeLink    !== '#';
  const hasTokopedia = product.tokopediaLink && product.tokopediaLink !== '#';
  const isSold       = product.isSold || false;

  return (
    <div
      className="group nier-card overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{ boxShadow: '0 0 0 1px #bfbaa7, 3px 3px 0 #a8a390' }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-2 py-1" style={{
        background: 'linear-gradient(90deg, #bfbaa7, #ccc7b5, #bfbaa7)',
        borderBottom: '1px solid #a8a390',
      }}>
        <div className="flex gap-1.5">
          {['#e6e1d1', '#bfbaa7', '#a8a390'].map(c => (
            <div key={c} className="w-2 h-2" style={{ background: c, outline: '1px solid rgba(0,0,0,0.15)' }} />
          ))}
        </div>
        <SigilMark />
      </div>

      {/* Image */}
      <div className="relative overflow-hidden scanlines" style={{ background: '#ccc7b5' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover transition-all duration-500 group-hover:scale-105"
          style={{ opacity: isSold ? 0.35 : 0.92 }}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(88,80,70,0.04), transparent)' }} />

        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-4 py-2 tracking-widest" style={{
              fontFamily: '"Press Start 2P", monospace', fontSize: '10px',
              color: '#040405', border: '1px solid #3b3833',
              background: 'rgba(230,225,209,0.9)',
              transform: 'rotate(-12deg)', boxShadow: '2px 2px 0 #bfbaa7',
            }}>
              SOLD
            </span>
          </div>
        )}

        <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none">
          <SigilMark />
        </div>
      </div>

      {/* Content */}
      <div className="p-3" style={{ background: 'linear-gradient(145deg, #dedad0 0%, #d5d0c0 100%)' }}>
        <h3 className="truncate mb-2 transition-colors" style={{
          fontFamily: '"Orbitron", sans-serif', fontSize: '10px', fontWeight: 700,
          color: '#3b3833', letterSpacing: '0.06em',
        }}>
          {product.name}
        </h3>

        <div className="h-px mb-3" style={{ background: 'linear-gradient(90deg, #bfbaa7, #8a7a60, #bfbaa7)' }} />

        <div className="flex flex-wrap gap-1.5">
          {!isSold && hasShopee && (
            <a href={product.shopeeLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: '"Press Start 2P", monospace', fontSize: '7px',
                background: 'linear-gradient(135deg, #ccc7b5, #bfbaa7)',
                color: '#3b3833', border: '1px solid #a8a390',
                boxShadow: '2px 2px 0 #a8a390', letterSpacing: '0.05em',
              }}
            >
              <ShoppingBag className="w-2.5 h-2.5" />
              SHOPEE
            </a>
          )}
          {!isSold && hasTokopedia && (
            <a href={product.tokopediaLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: '"Press Start 2P", monospace', fontSize: '7px',
                background: 'linear-gradient(135deg, #585046, #3b3833)',
                color: '#e6e1d1', border: '1px solid #3b3833',
                boxShadow: '2px 2px 0 #3b3833', letterSpacing: '0.05em',
              }}
            >
              <Store className="w-2.5 h-2.5" />
              TOPED
            </a>
          )}
          {!isSold && !hasShopee && !hasTokopedia && (
            <span style={{ fontFamily: '"VT323", monospace', fontSize: '14px', color: '#a8a390' }}>-- NO LINK --</span>
          )}
          {isSold && (
            <span style={{ fontFamily: '"VT323", monospace', fontSize: '14px', color: '#a8a390' }}>-- SOLD OUT --</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
