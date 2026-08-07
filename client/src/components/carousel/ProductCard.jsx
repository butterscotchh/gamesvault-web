import { ShoppingBag, Store } from 'lucide-react';

const ProductCard = ({ product }) => {
  const hasShopee = product.shopeeLink && product.shopeeLink !== '#';
  const hasTokopedia = product.tokopediaLink && product.tokopediaLink !== '#';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200">
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {hasShopee && (
            <a
              href={product.shopeeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition"
            >
              <ShoppingBag className="w-4 h-4" />
              Shopee
            </a>
          )}
          {hasTokopedia && (
            <a
              href={product.tokopediaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition"
            >
              <Store className="w-4 h-4" />
              Tokopedia
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
