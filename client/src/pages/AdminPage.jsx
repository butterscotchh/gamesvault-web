import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Edit, X, Save, Home, History, RefreshCw } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // ─── LOGIN LOGS STATE ───
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsFilter, setLogsFilter] = useState('all');
  const [showLogs, setShowLogs] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    shopeeLink: '',
    tokopediaLink: ''
  });

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

  // ─── LOAD LOGS ───
  const loadLogs = async (filter = 'all') => {
    setLogsLoading(true);
    try {
      const response = await api.get(`/admin/login-logs?filter=${filter}&limit=50`);
      setLogs(response.data);
    } catch (error) {
      console.error('Error loading logs:', error);
      toast.error('Gagal load login logs!');
    } finally {
      setLogsLoading(false);
    }
  };

  const handleShowLogs = () => {
    setShowLogs(true);
    loadLogs(logsFilter);
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setLogsFilter(filter);
    loadLogs(filter);
  };

  const handleCleanupLogs = async () => {
    if (!window.confirm('Hapus log lebih dari 30 hari?')) return;
    try {
      const response = await api.delete('/admin/login-logs/cleanup');
      toast.success(`Berhasil hapus ${response.data.deleted} log!`);
      loadLogs(logsFilter);
    } catch (error) {
      console.error('Error cleaning logs:', error);
      toast.error('Gagal hapus log!');
    }
  };

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
        name: product.name,
        image: product.image || '',
        shopeeLink: product.shopeeLink || '',
        tokopediaLink: product.tokopediaLink || '',
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
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: '#2c2c2c' }}>Admin Panel</span>
            <span className="text-xs hidden sm:inline" style={{ color: '#8a7a6a' }}>| Manage Products</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => navigate('/')} className="px-2 py-1 text-xs" style={{ color: '#4a3a2a' }}>Home</button>
            <button onClick={handleShowLogs} className="px-2 py-1 text-xs flex items-center gap-1" style={{ color: '#4a3a2a' }}>
              <History className="w-3 h-3" /> Logs
            </button>
            <button onClick={() => navigate('/admin/settings')} className="px-2 py-1 text-xs" style={{ color: '#4a3a2a' }}>Settings</button>
            <button onClick={handleLogout} className="px-2 py-1 text-xs" style={{ color: '#cc0000' }}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-lg font-bold" style={{ color: '#2c2c2c' }}>Products</h1>
            <p className="text-xs" style={{ color: '#6a5a4a' }}>Kelola katalog produk kamu</p>
          </div>
          {!showForm && (
            <button onClick={handleAdd} className="flex items-center gap-1 px-3 py-1.5 text-xs shrink-0" style={{ background: '#2c2c2c', color: '#f5f0eb' }}>
              <Plus className="w-3.5 h-3.5" /> Add Product
            </button>
          )}
        </div>

        {/* ─── LOGIN LOGS SECTION ─── */}
        {showLogs && (
          <div className="mb-6 border" style={{ background: '#ffffff', borderColor: '#d5c8b8' }}>
            <div className="p-3 border-b flex items-center justify-between flex-wrap gap-2" style={{ borderColor: '#d5c8b8', background: '#f5f0eb' }}>
              <div className="flex items-center gap-3">
                <History className="w-4 h-4" style={{ color: '#2c2c2c' }} />
                <span className="text-sm font-semibold" style={{ color: '#2c2c2c' }}>Login History</span>
                <select
                  value={logsFilter}
                  onChange={handleFilterChange}
                  className="text-xs px-2 py-1 border"
                  style={{ borderColor: '#d5c8b8', background: '#ffffff', color: '#2c2c2c' }}
                >
                  <option value="all">All</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadLogs(logsFilter)}
                  className="p-1 transition-all hover:opacity-70"
                  style={{ color: '#4a3a2a' }}
                  title="Refresh"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleCleanupLogs}
                  className="px-2 py-1 text-[10px] border"
                  style={{ borderColor: '#cc0000', color: '#cc0000' }}
                  title="Hapus log > 30 hari"
                >
                  Cleanup
                </button>
                <button
                  onClick={() => setShowLogs(false)}
                  className="p-1"
                  style={{ color: '#8a7a6a' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {logsLoading ? (
                <div className="p-6 text-center text-xs" style={{ color: '#8a7a6a' }}>Loading logs...</div>
              ) : logs.length === 0 ? (
                <div className="p-6 text-center text-xs" style={{ color: '#8a7a6a' }}>Belum ada log.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="border-b" style={{ background: '#faf8f6', borderColor: '#ece3d8' }}>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium" style={{ color: '#4a3a2a' }}>Status</th>
                      <th className="px-3 py-2 text-left text-xs font-medium" style={{ color: '#4a3a2a' }}>Username</th>
                      <th className="px-3 py-2 text-left text-xs font-medium" style={{ color: '#4a3a2a' }}>Reason</th>
                      <th className="px-3 py-2 text-left text-xs font-medium" style={{ color: '#4a3a2a' }}>Time</th>
                      <th className="px-3 py-2 text-left text-xs font-medium hidden md:table-cell" style={{ color: '#4a3a2a' }}>User Agent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id} className="border-b" style={{ borderColor: '#ece3d8' }}>
                        <td className="px-3 py-2">
                          <span
                            className="px-2 py-0.5 text-[10px] border"
                            style={{
                              borderColor: log.success ? '#3b3833' : '#cc0000',
                              background: log.success ? '#3b3833' : 'transparent',
                              color: log.success ? '#f5f0eb' : '#cc0000',
                            }}
                          >
                            {log.success ? 'SUCCESS' : 'FAILED'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs font-medium" style={{ color: '#2c2c2c' }}>{log.username}</td>
                        <td className="px-3 py-2 text-xs" style={{ color: '#6a5a4a' }}>{log.reason || '-'}</td>
                        <td className="px-3 py-2 text-xs" style={{ color: '#6a5a4a' }}>
                          {new Date(log.timestamp).toLocaleString('id-ID')}
                        </td>
                        <td className="px-3 py-2 text-xs truncate max-w-[200px] hidden md:table-cell" style={{ color: '#8a7a6a' }}>
                          {log.userAgent?.substring(0, 50)}...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="p-4 mb-4 border" style={{ background: '#ffffff', borderColor: '#d5c8b8' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold" style={{ color: '#2c2c2c' }}>
                {isEditing ? 'Edit Product' : 'Tambah Product Baru'}
              </h2>
              <button onClick={resetForm} className="p-1" style={{ color: '#8a7a6a' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                    Nama Produk <span style={{ color: '#cc0000' }}>*</span>
                  </label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Contoh: PSP 3000" className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1" style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }} required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>URL Gambar</label>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg" className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1" style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>Link Shopee</label>
                  <input type="text" name="shopeeLink" value={formData.shopeeLink} onChange={handleInputChange} placeholder="https://shopee.co.id/..." className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1" style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>Link Tokopedia</label>
                  <input type="text" name="tokopediaLink" value={formData.tokopediaLink} onChange={handleInputChange} placeholder="https://tokopedia.com/..." className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1" style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={resetForm} className="px-3 py-1.5 border text-xs" style={{ borderColor: '#d5c8b8', color: '#4a3a2a' }}>Batal</button>
                <button type="submit" className="px-3 py-1.5 text-xs" style={{ background: '#2c2c2c', color: '#f5f0eb' }}>
                  {isEditing ? 'Update Produk' : 'Simpan Produk'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LIST PRODUCTS */}
        <div className="border" style={{ background: '#ffffff', borderColor: '#d5c8b8' }}>
          <div className="hidden sm:block">
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
                  <tr><td colSpan="7" className="px-3 py-6 text-center text-xs" style={{ color: '#8a7a6a' }}>Belum ada produk.</td></tr>
                ) : (
                  products.map((product, index) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50" style={{ borderColor: '#ece3d8' }}>
                      <td className="px-3 py-2 text-xs" style={{ color: '#6a5a4a' }}>{index + 1}</td>
                      <td className="px-3 py-2">
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" onError={(e) => { e.target.src = 'https://placehold.co/300x200/9e6b54/ffffff?text=No+Image'; }} />
                      </td>
                      <td className="px-3 py-2 text-xs font-medium" style={{ color: '#2c2c2c' }}>{product.name}</td>
                      <td className="px-3 py-2">
                        {product.shopeeLink ? <a href={product.shopeeLink} target="_blank" rel="noopener" className="text-xs" style={{ color: '#cc0000' }}>Link</a> : <span className="text-xs" style={{ color: '#8a7a6a' }}>-</span>}
                      </td>
                      <td className="px-3 py-2">
                        {product.tokopediaLink ? <a href={product.tokopediaLink} target="_blank" rel="noopener" className="text-xs" style={{ color: '#cc0000' }}>Link</a> : <span className="text-xs" style={{ color: '#8a7a6a' }}>-</span>}
                      </td>
                      <td className="px-3 py-2">
                        <button onClick={() => handleToggleSold(product.id)} className="px-2 py-0.5 text-[10px] border transition-colors whitespace-nowrap" style={{ borderColor: product.isSold ? '#2c2c2c' : '#d5c8b8', background: product.isSold ? '#2c2c2c' : 'transparent', color: product.isSold ? '#f5f0eb' : '#4a3a2a' }}>
                          {product.isSold ? 'SOLD' : 'Active'}
                        </button>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => handleEdit(product)} className="p-1" style={{ color: '#4a3a2a' }}><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(product.id)} className="p-1" style={{ color: '#cc0000' }}><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden divide-y" style={{ borderColor: '#ece3d8' }}>
            {products.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs" style={{ color: '#8a7a6a' }}>Belum ada produk.</div>
            ) : (
              products.map((product, index) => (
                <div key={product.id} className="px-3 py-3 flex items-start gap-3">
                  <span className="text-xs shrink-0" style={{ color: '#6a5a4a' }}>{index + 1}.</span>
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded shrink-0" onError={(e) => { e.target.src = 'https://placehold.co/300x200/9e6b54/ffffff?text=No+Image'; }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate" style={{ color: '#2c2c2c' }}>{product.name}</div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      {product.shopeeLink ? <a href={product.shopeeLink} target="_blank" rel="noopener" className="text-[10px]" style={{ color: '#cc0000' }}>Shopee</a> : null}
                      {product.tokopediaLink ? <a href={product.tokopediaLink} target="_blank" rel="noopener" className="text-[10px]" style={{ color: '#cc0000' }}>Tokped</a> : null}
                      {!product.shopeeLink && !product.tokopediaLink ? <span className="text-[10px]" style={{ color: '#8a7a6a' }}>-</span> : null}
                    </div>
                    <button onClick={() => handleToggleSold(product.id)} className="mt-1.5 px-2 py-0.5 text-[9px] border transition-colors" style={{ borderColor: product.isSold ? '#2c2c2c' : '#d5c8b8', background: product.isSold ? '#2c2c2c' : 'transparent', color: product.isSold ? '#f5f0eb' : '#4a3a2a' }}>
                      {product.isSold ? 'SOLD' : 'Active'}
                    </button>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleEdit(product)} className="p-1" style={{ color: '#4a3a2a' }}><Edit className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-1" style={{ color: '#cc0000' }}><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-2 text-xs" style={{ color: '#8a7a6a' }}>Total: {products.length} produk</div>
      </div>
    </div>
  );
};

export default AdminPage;