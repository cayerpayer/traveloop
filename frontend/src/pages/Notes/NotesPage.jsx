/* ============================================
   NotesPage — Travel journal with rich editing
   ============================================ */
import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import SearchFilters from '../../components/Shared/SearchFilters';
import EmptyState from '../../components/Shared/EmptyState';
import { SAMPLE_NOTES, MOOD_OPTIONS } from '../../data/mockData';
import { getItem, setItem, STORAGE_KEYS } from '../../utils/localStorage';
import toast from 'react-hot-toast';
import './NotesPage.css';

export default function NotesPage() {
  const [notes, setNotes] = useState(() => getItem(STORAGE_KEYS.NOTES, SAMPLE_NOTES));
  const [query, setQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', mood: '😊', tags: '', city: '' });

  const save = (list) => { setNotes(list); setItem(STORAGE_KEYS.NOTES, list); };

  const openNew = () => { setForm({ title: '', content: '', mood: '😊', tags: '', city: '' }); setEditingNote(null); setShowEditor(true); };
  const openEdit = (note) => { setForm({ title: note.title, content: note.content, mood: note.mood, tags: note.tags.join(', '), city: note.city }); setEditingNote(note); setShowEditor(true); };

  const handleSave = () => {
    if (!form.title.trim()) return toast.error('Enter a title');
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (editingNote) {
      const updated = notes.map(n => n.id === editingNote.id ? { ...n, ...form, tags, date: new Date().toISOString().split('T')[0] } : n);
      save(updated);
      toast.success('Note updated!');
    } else {
      const newNote = { id: uuidv4(), ...form, tags, date: new Date().toISOString().split('T')[0], tripId: null };
      save([newNote, ...notes]);
      toast.success('Note created!');
    }
    setShowEditor(false);
  };

  const deleteNote = (id) => { save(notes.filter(n => n.id !== id)); toast.success('Note deleted'); };

  const filtered = useMemo(() => {
    if (!query) return notes;
    return notes.filter(n => n.title.toLowerCase().includes(query.toLowerCase()) || n.content.toLowerCase().includes(query.toLowerCase()) || n.city?.toLowerCase().includes(query.toLowerCase()));
  }, [notes, query]);

  return (
    <div className="notes-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />
      <main className="container notes-main">
        <div className="np-header fade-in-up">
          <div>
            <h1 className="np-title">Trip <span className="gradient-text">Journal</span></h1>
            <p className="np-subtitle">Capture memories, tips, and thoughts from your travels</p>
          </div>
          <button className="btn-gradient" onClick={openNew}><i className="bi bi-plus-lg me-1"></i>New Note</button>
        </div>

        <SearchFilters placeholder="Search notes..." value={query} onSearch={setQuery} filters={[]} />

        {filtered.length === 0 ? (
          <EmptyState icon="bi-journal-text" title="No notes yet" message="Start journaling your travel experiences" action={openNew} actionLabel="Create Note" />
        ) : (
          <div className="np-grid">
            {filtered.map((note, i) => (
              <div key={note.id} className="np-card fade-in-up" style={{ animationDelay: `${0.08 * i}s` }}>
                <div className="np-card-header">
                  <span className="np-card-mood">{note.mood}</span>
                  <div className="np-card-actions">
                    <button onClick={() => openEdit(note)}><i className="bi bi-pencil"></i></button>
                    <button onClick={() => deleteNote(note.id)}><i className="bi bi-trash3"></i></button>
                  </div>
                </div>
                <h3 className="np-card-title">{note.title}</h3>
                <p className="np-card-content">{note.content}</p>
                <div className="np-card-meta">
                  {note.city && <span className="np-card-city"><i className="bi bi-geo-alt"></i>{note.city}</span>}
                  <span className="np-card-date"><i className="bi bi-calendar3"></i>{note.date}</span>
                </div>
                <div className="np-card-tags">
                  {note.tags.map(t => <span key={t} className="cs-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Editor Modal */}
        {showEditor && (
          <div className="pk-modal-overlay" onClick={() => setShowEditor(false)}>
            <div className="np-editor-modal fade-in-up" onClick={e => e.stopPropagation()}>
              <div className="np-editor-header">
                <h3>{editingNote ? 'Edit Note' : 'New Note'}</h3>
                <button onClick={() => setShowEditor(false)}><i className="bi bi-x-lg"></i></button>
              </div>

              {/* Toolbar */}
              <div className="np-toolbar">
                <button title="Bold" onClick={() => setForm({...form, content: form.content + '**bold**'})}><i className="bi bi-type-bold"></i></button>
                <button title="Italic" onClick={() => setForm({...form, content: form.content + '*italic*'})}><i className="bi bi-type-italic"></i></button>
                <button title="List" onClick={() => setForm({...form, content: form.content + '\n- item'})}><i className="bi bi-list-ul"></i></button>
                <button title="Link" onClick={() => setForm({...form, content: form.content + '[text](url)'})}><i className="bi bi-link-45deg"></i></button>
              </div>

              <input type="text" className="pk-input" placeholder="Note title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <textarea className="pk-input np-textarea" placeholder="Write your thoughts..." value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={6} />
              <input type="text" className="pk-input" placeholder="City (optional)" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
              <input type="text" className="pk-input" placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} />

              {/* Mood Picker */}
              <div className="np-mood-picker">
                <span className="np-mood-label">Mood:</span>
                {MOOD_OPTIONS.map(m => (
                  <button key={m} className={`np-mood-btn ${form.mood === m ? 'active' : ''}`} onClick={() => setForm({...form, mood: m})}>{m}</button>
                ))}
              </div>

              <div className="np-editor-actions">
                <button className="btn-gradient" onClick={handleSave}><i className="bi bi-check-lg me-1"></i>Save Note</button>
                <button className="btn-glass" onClick={() => setShowEditor(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
