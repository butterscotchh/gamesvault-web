import { ShoppingBag, Store, Star } from 'lucide-react';

const titleBarGradients = [
  'linear-gradient(90deg, #f5a8d0, #c9a8f5)',
  'linear-gradient(90deg, #c9a8f5, #a8d8f5)',
  'linear-gradient(90deg, #a8d8f5, #a8e8c8)',
  'linear-gradient(90deg, #a8e8c8, #f5e8a8)',
];

let cardIndex = 0;

const ProductCard = ({ product }) => {
  const hasShopee    = product.shopeeLink    && product.shopeeLink    !== '#';
  const hasTokopedia = product.tokopediaLink && product.tokopediaLink !== '#';
  const gradient = titleBarGradients[cardIndex++ % titleBarGradients.length];
  const isSold = product.isSold || false;

  return (
    <div
      className="group holo-card overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 0 0 2px #b89ee8, 4px 4px 0 #c0b0e0, 0 0 15px #c9a8f520' }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-2 py-1 border-b-2" style={{ background: gradient, borderColor: '#b89ee8' }}>
        <div className="flex gap-1">
          {['#f5a8a8', '#f5e8a8', '#a8e8c8'].map(c => (
            <div key={c} className="w-2 h-2 rounded-full border" style={{ background: c, borderColor: 'rgba(74,53,112,0.15)' }} />
          ))}
        </div>
        <Star className="w-2.5 h-2.5 opacity-70" fill="currentColor" style={{ color: '#4a3570' }} />
      </div>

      {/* Image - dengan SOLD overlay */}
      <div className="relative overflow-hidden scanlines" style={{ background: '#ede5ff' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-all duration-500"
          style={{ opacity: isSold ? 0.4 : 0.95 }}
        />
        
        {/* ── SOLD OVERLAY ── */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <span className="px-4 py-2 text-sm font-bold tracking-widest border-2 rotate-[-15deg]" style={{
              fontFamily: '"Press Start 2P", monospace',
              color: '#4a3570',
              borderColor: '#4a3570',
              background: 'rgba(255,255,255,0.85)',
              boxShadow: '0 0 20px rgba(0,0,0,0.1)',
            }}>
              SOLD
            </span>
          </div>
        )}

        {/* Soft pastel tint on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #f5a8d015, #c9a8f510, #a8d8f515)' }} />
        <Star className="absolute top-1.5 right-1.5 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity animate-float"
          fill="currentColor" style={{ color: '#f5e8a8', filter: 'drop-shadow(0 0 3px #f5e8a8)' }} />
      </div>

      {/* Content */}
      <div className="p-3" style={{ background: 'linear-gradient(145deg, #ede5ff 0%, #e8deff 100%)' }}>
        <h3
          className="truncate mb-2 transition-colors group-hover:opacity-80"
          style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '11px', fontWeight: 700, color: '#4a3570', letterSpacing: '0.04em' }}
        >
          {product.name}
        </h3>

        {/* Pastel divider */}
        <div className="h-px mb-3" style={{ background: 'linear-gradient(90deg, #f5a8d0, #c9a8f5, #a8d8f5)' }} />

        <div className="flex flex-wrap gap-1.5">
          {!isSold && hasShopee && (
            <a href={product.shopeeLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-[8px] tracking-wide transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: '"Press Start 2P", monospace',
                background: 'linear-gradient(135deg, #f5c8a8, #f5a8a8)',
                color: '#4a3570',
                boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(184,158,232,0.3), 2px 2px 0 #c0b0e0',
              }}
            >
              <ShoppingBag className="w-2.5 h-2.5" />
              SHOPEE
            </a>
          )}
          {!isSold && hasTokopedia && (
            <a href={product.tokopediaLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-[8px] tracking-wide transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: '"Press Start 2P", monospace',
                background: 'linear-gradient(135deg, #a8e8c8, #a8d8c8)',
                color: '#4a3570',
                boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(184,158,232,0.3), 2px 2px 0 #c0b0e0',
              }}
            >
              <Store className="w-2.5 h-2.5" />
              TOPED
            </a>
          )}
          {!isSold && !hasShopee && !hasTokopedia && (
            <span style={{ fontFamily: '"VT323", monospace', fontSize: '14px', color: '#b89ee8' }}>-- NO LINK --</span>
          )}
          {isSold && (
            <span style={{ fontFamily: '"VT323", monospace', fontSize: '14px', color: '#8a7a6a' }}>-- SOLD OUT --</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
