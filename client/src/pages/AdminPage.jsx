import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Edit, X, Save, Home } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    shopeeLink: '',
    tokopediaLink: ''
  });

  // LOAD: Fetch dari API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Gagal load produk!');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: '', image: '', shopeeLink: '', tokopediaLink: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      image: product.image || '',
      shopeeLink: product.shopeeLink || '',
      tokopediaLink: product.tokopediaLink || ''
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Nama produk wajib diisi!');
      return;
    }
    
    if (!formData.shopeeLink.trim() && !formData.tokopediaLink.trim()) {
      toast.error('Minimal satu link (Shopee/Tokopedia) harus diisi!');
      return;
    }

    try {
      if (editingId) {
        const response = await api.put(`/products/${editingId}`, {
          name: formData.name.trim(),
          image: formData.image.trim(),
          shopeeLink: formData.shopeeLink.trim(),
          tokopediaLink: formData.tokopediaLink.trim()
        });
        setProducts(products.map(p => p.id === editingId ? response.data : p));
        toast.success('Produk berhasil diupdate!');
      } else {
        const response = await api.post('/products', {
          name: formData.name.trim(),
          image: formData.image.trim(),
          shopeeLink: formData.shopeeLink.trim(),
          tokopediaLink: formData.tokopediaLink.trim()
        });
        setProducts([...products, response.data]);
        toast.success('Produk berhasil ditambahkan!');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.error || 'Gagal menyimpan produk!');
    }

    resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus produk ini?')) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
      toast.success('Produk berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Gagal menghapus produk!');
    }
  };

  const handleToggleSold = async (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    try {
      const response = await api.put(`/products/${id}`, {
        ...product,
        isSold: !product.isSold
      });
      setProducts(products.map(p => p.id === id ? response.data : p));
      toast.success(`Produk ${response.data.isSold ? 'ditandai SOLD' : 'dibuka kembali'}`);
    } catch (error) {
      console.error('Error toggling sold status:', error);
      toast.error('Gagal mengubah status!');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const isEditing = editingId !== null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f5f0eb' }}>
        <div style={{ color: '#6a5a4a' }}>Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#f5f0eb' }}>
      {/* Navbar Admin */}
      <nav className="border-b px-4 py-2" style={{ background: '#ffffff', borderColor: '#d5c8b8' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: '#2c2c2c' }}>Admin Panel</span>
            <span className="text-xs" style={{ color: '#8a7a6a' }}>| Manage Products</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1 text-xs transition-colors"
              style={{ color: '#4a3a2a' }}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/admin/settings')}
              className="px-3 py-1 text-xs transition-colors"
              style={{ color: '#4a3a2a' }}
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-xs transition-colors"
              style={{ color: '#cc0000' }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-lg font-bold" style={{ color: '#2c2c2c' }}>Products</h1>
            <p className="text-xs" style={{ color: '#6a5a4a' }}>Kelola katalog produk kamu</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 px-3 py-1.5 text-xs transition-colors"
              style={{ background: '#2c2c2c', color: '#f5f0eb' }}
            >
              <Plus className="w-3.5 h-3.5" />
              Add Product
            </button>
          )}
        </div>

        {/* Form Tambah/Edit Product */}
        {showForm && (
          <div className="p-4 mb-4 border" style={{ background: '#ffffff', borderColor: '#d5c8b8' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold" style={{ color: '#2c2c2c' }}>
                {isEditing ? 'Edit Product' : 'Tambah Product Baru'}
              </h2>
              <button
                onClick={resetForm}
                className="p-1 transition-colors"
                style={{ color: '#8a7a6a' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                    Nama Produk <span style={{ color: '#cc0000' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: PSP 3000"
                    className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1"
                    style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                    URL Gambar
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1"
                    style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                    Link Shopee
                  </label>
                  <input
                    type="text"
                    name="shopeeLink"
                    value={formData.shopeeLink}
                    onChange={handleInputChange}
                    placeholder="https://shopee.co.id/..."
                    className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1"
                    style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                    Link Tokopedia
                  </label>
                  <input
                    type="text"
                    name="tokopediaLink"
                    value={formData.tokopediaLink}
                    onChange={handleInputChange}
                    placeholder="https://tokopedia.com/..."
                    className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1"
                    style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3 py-1.5 border text-xs transition-colors"
                  style={{ borderColor: '#d5c8b8', color: '#4a3a2a' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs transition-colors"
                  style={{ background: '#2c2c2c', color: '#f5f0eb' }}
                >
                  {isEditing ? 'Update Produk' : 'Simpan Produk'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List Products */}
        <div className="border" style={{ background: '#ffffff', borderColor: '#d5c8b8' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b" style={{ background: '#f5f0eb', borderColor: '#d5c8b8' }}>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium" style={{ color: '#4a3a2a' }}>#</th>
                  <th className="px-3 py-2 text-left text-xs font-medium" style={{ color: '#4a3a2a' }}>Image</th>
                  <th className="px-3 py-2 text-left text-xs font-medium" style={{ color: '#4a3a2a' }}>Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium" style={{ color: '#4a3a2a' }}>Shopee</th>
                  <th className="px-3 py-2 text-left text-xs font-medium" style={{ color: '#4a3a2a' }}>Tokopedia</th>
                  <th className="px-3 py-2 text-left text-xs font-medium" style={{ color: '#4a3a2a' }}>Status</th>
                  <th className="px-3 py-2 text-right text-xs font-medium" style={{ color: '#4a3a2a' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-3 py-6 text-center text-xs" style={{ color: '#8a7a6a' }}>
                      Belum ada produk. Tambahkan produk baru!
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr key={product.id} className="border-b transition-colors hover:bg-gray-50" style={{ borderColor: '#ece3d8' }}>
                      <td className="px-3 py-2 text-xs" style={{ color: '#6a5a4a' }}>{index + 1}</td>
                      <td className="px-3 py-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/300x200/9e6b54/ffffff?text=No+Image';
                          }}
                        />
                      </td>
                      <td className="px-3 py-2 text-xs font-medium" style={{ color: '#2c2c2c' }}>{product.name}</td>
                      <td className="px-3 py-2">
                        {product.shopeeLink ? (
                          <a
                            href={product.shopeeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs"
                            style={{ color: '#cc0000' }}
                          >
                            Link
                          </a>
                        ) : (
                          <span className="text-xs" style={{ color: '#8a7a6a' }}>-</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {product.tokopediaLink ? (
                          <a
                            href={product.tokopediaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs"
                            style={{ color: '#cc0000' }}
                          >
                            Link
                          </a>
                        ) : (
                          <span className="text-xs" style={{ color: '#8a7a6a' }}>-</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => handleToggleSold(product.id)}
                          className="px-2 py-0.5 text-xs border transition-colors"
                          style={{
                            borderColor: product.isSold ? '#2c2c2c' : '#d5c8b8',
                            background: product.isSold ? '#2c2c2c' : 'transparent',
                            color: product.isSold ? '#f5f0eb' : '#4a3a2a',
                          }}
                        >
                          {product.isSold ? 'SOLD' : 'Active'}
                        </button>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1 transition-colors"
                            style={{ color: '#4a3a2a' }}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1 transition-colors"
                            style={{ color: '#cc0000' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Products */}
        <div className="mt-2 text-xs" style={{ color: '#8a7a6a' }}>
          Total: {products.length} produk
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
