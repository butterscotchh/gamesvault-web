import { ShoppingBag, Store, ExternalLink } from 'lucide-react';

const ProductCard = ({ product }) => {
  const hasShopee = product.shopeeLink && product.shopeeLink !== '#';
  const hasTokopedia = product.tokopediaLink && product.tokopediaLink !== '#';

  return (
    <div className="group relative bg-cyber-card border border-cyber-border rounded-sm overflow-hidden hover:border-cyber-cyan/60 transition-all duration-300 hover:shadow-card-glow">
      {/* Top accent line that grows on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan to-cyber-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyber-cyan/0 group-hover:border-cyber-cyan/80 transition-colors duration-300 z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyber-cyan/0 group-hover:border-cyber-cyan/80 transition-colors duration-300 z-10 pointer-events-none" />

      {/* Image */}
      <div className="relative overflow-hidden bg-cyber-dark">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        {/* Scanline overlay on image */}
        <div className="absolute inset-0 bg-repeating-linear-gradient pointer-events-none opacity-20"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)'
          }}
        />
        {/* Cyan tint overlay on hover */}
        <div className="absolute inset-0 bg-cyber-cyan/0 group-hover:bg-cyber-cyan/5 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="font-semibold text-slate-200 truncate font-mono text-sm tracking-wide group-hover:text-cyber-cyan transition-colors duration-200">
          {product.name}
        </h3>

        {/* Divider */}
        <div className="h-px bg-cyber-border my-3 group-hover:bg-cyber-cyan/20 transition-colors duration-300" />

        {/* Buy buttons */}
        <div className="flex flex-wrap gap-2">
          {hasShopee && (
            <a
              href={product.shopeeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/40 text-orange-400 hover:bg-orange-500 hover:text-white text-xs font-mono rounded-sm transition-all duration-200 tracking-wider"
            >
              <ShoppingBag className="w-3 h-3" />
              SHOPEE
            </a>
          )}
          {hasTokopedia && (
            <a
              href={product.tokopediaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/40 text-green-400 hover:bg-green-500 hover:text-white text-xs font-mono rounded-sm transition-all duration-200 tracking-wider"
            >
              <Store className="w-3 h-3" />
              TOKOPEDIA
            </a>
          )}
          {!hasShopee && !hasTokopedia && (
            <span className="text-xs font-mono text-slate-600 tracking-widest">NO LINK</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
