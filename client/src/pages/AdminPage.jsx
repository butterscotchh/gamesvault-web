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
        // EDIT
        const response = await api.put(`/products/${editingId}`, {
          name: formData.name.trim(),
          image: formData.image.trim(),
          shopeeLink: formData.shopeeLink.trim(),
          tokopediaLink: formData.tokopediaLink.trim()
        });
        setProducts(products.map(p => p.id === editingId ? response.data : p));
        toast.success('Produk berhasil diupdate!');
      } else {
        // ADD
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

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const isEditing = editingId !== null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Admin */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-brick-700">Admin Panel</span>
            <span className="text-sm text-gray-500 hidden sm:inline">| Manage Products</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm text-gray-600 hover:text-brick-600 font-medium transition flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={() => navigate('/admin/settings')}
              className="px-4 py-2 text-sm text-gray-600 hover:text-brick-600 font-medium transition"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Products</h1>
            <p className="text-gray-500 text-sm">Kelola katalog produk kamu</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-brick-600 text-white rounded-lg hover:bg-brick-700 transition shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          )}
        </div>

        {/* Form Tambah/Edit Product */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {isEditing ? 'Edit Product' : 'Tambah Product Baru'}
              </h2>
              <button
                onClick={resetForm}
                className="p-1 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Produk <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: PSP 3000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Gambar
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Shopee
                  </label>
                  <input
                    type="text"
                    name="shopeeLink"
                    value={formData.shopeeLink}
                    onChange={handleInputChange}
                    placeholder="https://shopee.co.id/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Tokopedia
                  </label>
                  <input
                    type="text"
                    name="tokopediaLink"
                    value={formData.tokopediaLink}
                    onChange={handleInputChange}
                    placeholder="https://tokopedia.com/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-brick-600 text-white rounded-lg hover:bg-brick-700 transition"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4" />
                      Update Produk
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Simpan Produk
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List Products */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">#</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Shopee</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tokopedia</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      Belum ada produk. Tambahkan produk baru!
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                      <td className="px-4 py-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x200/9e6b54/ffffff?text=No+Image';
                          }}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{product.name}</td>
                      <td className="px-4 py-3">
                        {product.shopeeLink ? (
                          <a
                            href={product.shopeeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:text-orange-600 text-sm"
                          >
                            Link
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {product.tokopediaLink ? (
                          <a
                            href={product.tokopediaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 hover:text-green-600 text-sm"
                          >
                            Link
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-5 h-5" />
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
        <div className="mt-4 text-sm text-gray-500">
          Total: {products.length} produk
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
