/* ============================================
   PackingPage — Smart packing organizer
   ============================================ */
import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import EmptyState from '../../components/Shared/EmptyState';
import { PACKING_DEFAULTS, PACKING_CATEGORY_ICONS } from '../../data/mockData';
import { getItem, setItem, STORAGE_KEYS } from '../../utils/localStorage';
import toast from 'react-hot-toast';
import './PackingPage.css';

const CATEGORIES = ['All', 'Clothing', 'Electronics', 'Documents', 'Medicines', 'Accessories'];

export default function PackingPage() {
  const [items, setItems] = useState(() => getItem(STORAGE_KEYS.PACKING, PACKING_DEFAULTS));
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Clothing', quantity: 1, priority: 'medium' });

  const save = (list) => { setItems(list); setItem(STORAGE_KEYS.PACKING, list); };

  const togglePacked = (id) => {
    const updated = items.map(i => i.id === id ? { ...i, packed: !i.packed } : i);
    save(updated);
  };

  const removeItem = (id) => {
    save(items.filter(i => i.id !== id));
    toast.success('Item removed');
  };

  const addItem = () => {
    if (!newItem.name.trim()) return toast.error('Enter item name');
    const item = { ...newItem, id: uuidv4(), packed: false };
    save([item, ...items]);
    setNewItem({ name: '', category: 'Clothing', quantity: 1, priority: 'medium' });
    setShowAdd(false);
    toast.success('Item added!');
  };

  const resetAll = () => { save(PACKING_DEFAULTS); toast.success('Checklist reset'); };

  const filtered = useMemo(() => {
    let list = items;
    if (filter !== 'All') list = list.filter(i => i.category === filter);
    if (search) list = list.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [items, filter, search]);

  const totalItems = items.length;
  const packedCount = items.filter(i => i.packed).length;
  const progress = totalItems > 0 ? Math.round((packedCount / totalItems) * 100) : 0;

  return (
    <div className="packing-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />
      <main className="container packing-main">
        <div className="pk-header fade-in-up">
          <h1 className="pk-title">Packing <span className="gradient-text">Checklist</span></h1>
          <p className="pk-subtitle">Never forget essentials with smart packing</p>
        </div>

        {/* Progress */}
        <div className="pk-progress-card fade-in-up delay-1">
          <div className="pk-prog-info">
            <span className="pk-prog-label">Packing Progress</span>
            <span className="pk-prog-count">{packedCount}/{totalItems} items packed</span>
          </div>
          <div className="pk-prog-bar">
            <div className="pk-prog-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="pk-prog-pct">{progress}%</span>
        </div>

        {/* Weather suggestion */}
        <div className="pk-weather-tip fade-in-up delay-2">
          <i className="bi bi-cloud-sun"></i>
          <span>Tropical destination detected — pack light clothes, sunscreen & swimwear!</span>
        </div>

        {/* Actions */}
        <div className="pk-actions fade-in-up delay-2">
          <div className="pk-search-wrap">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-gradient btn-sm" onClick={() => setShowAdd(true)}>
            <i className="bi bi-plus-lg me-1"></i>Add Item
          </button>
          <button className="btn-glass btn-sm" onClick={resetAll}>
            <i className="bi bi-arrow-counterclockwise me-1"></i>Reset
          </button>
        </div>

        {/* Category Tabs */}
        <div className="pk-cat-tabs fade-in-up delay-3">
          {CATEGORIES.map(c => (
            <button key={c} className={`pk-cat-tab ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
              {c !== 'All' && <i className={`bi ${PACKING_CATEGORY_ICONS[c]} me-1`}></i>}
              {c}
            </button>
          ))}
        </div>

        {/* Items List */}
        {filtered.length === 0 ? (
          <EmptyState icon="bi-luggage" title="No items found" message="Add items to your packing list" />
        ) : (
          <div className="pk-items-list">
            {filtered.map((item, i) => (
              <div key={item.id} className={`pk-item fade-in-up ${item.packed ? 'packed' : ''}`} style={{ animationDelay: `${0.05 * i}s` }}>
                <button className={`pk-check ${item.packed ? 'checked' : ''}`} onClick={() => togglePacked(item.id)}>
                  {item.packed && <i className="bi bi-check-lg"></i>}
                </button>
                <div className="pk-item-info">
                  <span className="pk-item-name">{item.name}</span>
                  <div className="pk-item-meta">
                    <span className="pk-item-cat"><i className={`bi ${PACKING_CATEGORY_ICONS[item.category]}`}></i>{item.category}</span>
                    <span className="pk-item-qty">×{item.quantity}</span>
                  </div>
                </div>
                <span className={`pk-priority ${item.priority}`}>{item.priority}</span>
                <button className="pk-remove-btn" onClick={() => removeItem(item.id)}>
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Modal */}
        {showAdd && (
          <div className="pk-modal-overlay" onClick={() => setShowAdd(false)}>
            <div className="pk-add-modal fade-in-up" onClick={e => e.stopPropagation()}>
              <h3>Add Packing Item</h3>
              <input type="text" placeholder="Item name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="pk-input" />
              <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} className="pk-input">
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="pk-add-row">
                <input type="number" min="1" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })} className="pk-input" />
                <select value={newItem.priority} onChange={e => setNewItem({ ...newItem, priority: e.target.value })} className="pk-input">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="pk-add-actions">
                <button className="btn-gradient" onClick={addItem}>Add Item</button>
                <button className="btn-glass" onClick={() => setShowAdd(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
