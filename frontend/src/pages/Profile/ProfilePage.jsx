/* ============================================
   ProfilePage — User settings dashboard
   ============================================ */
import { useState } from 'react';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useTripStats from '../../hooks/useTripStats';
import { getItem, setItem, STORAGE_KEYS } from '../../utils/localStorage';
import toast from 'react-hot-toast';
import './ProfilePage.css';

const BADGES = [
  { icon: '🌍', name: 'Explorer', desc: '5+ trips planned' },
  { icon: '📸', name: 'Storyteller', desc: '10+ journal entries' },
  { icon: '💰', name: 'Budget Pro', desc: 'Under budget 3 trips' },
  { icon: '🏔️', name: 'Adventurer', desc: 'Hiked 3+ trails' },
  { icon: '✈️', name: 'Frequent Flyer', desc: 'Visited 5+ countries' },
];

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Hindi'];
const CURRENCIES = ['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)', 'INR (₹)'];

export default function ProfilePage() {
  const { user, updatePassword, deleteAccount, logout } = useAuth();
  const navigate = useNavigate();
  const stats = useTripStats();
  const [profile, setProfile] = useState(() => getItem(STORAGE_KEYS.PROFILE, {
    name: user?.name || 'Demo User',
    email: user?.email || 'demo@traveloop.com',
    bio: 'Passionate traveler exploring the world one city at a time ✈️',
    language: 'English',
    currency: 'INR (₹)',
    notifications: true,
    darkMode: true,
    passport: { countries: 12, stamps: 28 },
  }));
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profile });
  
  // Password change modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Delete account modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const saveProfile = () => {
    setProfile(editData);
    setItem(STORAGE_KEYS.PROFILE, editData);
    setEditing(false);
    toast.success('Profile updated!');
  };

  const handleChangePassword = async () => {
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);
    try {
      const result = await updatePassword(passwordData.oldPassword, passwordData.newPassword);
      if (result.success) {
        toast.success('Password updated successfully!');
        setShowPasswordModal(false);
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(result.message || 'Failed to update password');
      }
    } catch (error) {
      toast.error('Error updating password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      const result = await deleteAccount();
      if (result.success) {
        toast.success('Account deleted successfully');
        logout();
        navigate('/login', { replace: true });
      } else {
        toast.error(result.message || 'Failed to delete account');
      }
    } catch (error) {
      toast.error('Error deleting account');
    } finally {
      setDeleteLoading(false);
    }
  };

  const savedCities = getItem(STORAGE_KEYS.SAVED_CITIES, []);

  const tabs = [
    { key: 'profile', icon: 'bi-person', label: 'Profile' },
    { key: 'preferences', icon: 'bi-sliders', label: 'Preferences' },
    { key: 'achievements', icon: 'bi-trophy', label: 'Achievements' },
    { key: 'account', icon: 'bi-gear', label: 'Account' },
  ];

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';

  return (
    <div className="profile-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />
      <main className="container profile-main">
        {/* Header */}
        <div className="pp-header fade-in-up">
          <div className="pp-avatar-wrap">
            <div className="pp-avatar">{getInitials(profile.name)}</div>
            <button className="pp-avatar-edit"><i className="bi bi-camera"></i></button>
          </div>
          <div className="pp-header-info">
            <h1 className="pp-name">{profile.name}</h1>
            <p className="pp-email">{profile.email}</p>
            <p className="pp-bio">{profile.bio}</p>
            <div className="pp-header-stats">
              <div className="pp-stat"><span className="pp-stat-val">{stats.totalTrips}</span><span className="pp-stat-label">Trips</span></div>
              <div className="pp-stat"><span className="pp-stat-val">{savedCities.length}</span><span className="pp-stat-label">Saved</span></div>
              <div className="pp-stat"><span className="pp-stat-val">{stats.destinations}</span><span className="pp-stat-label">Places</span></div>
              <div className="pp-stat"><span className="pp-stat-val">{stats.upcoming}</span><span className="pp-stat-label">Upcoming</span></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pp-tabs fade-in-up delay-1">
          {tabs.map(t => (
            <button key={t.key} className={`pp-tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
              <i className={`bi ${t.icon}`}></i><span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="pp-section fade-in-up">
            <div className="pp-section-header">
              <h3>Personal Info</h3>
              <button className="btn-glass btn-sm" onClick={() => { setEditing(!editing); setEditData({ ...profile }); }}>
                <i className={`bi ${editing ? 'bi-x' : 'bi-pencil'} me-1`}></i>{editing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className="pp-form-grid">
              <div className="pp-field">
                <label>Full Name</label>
                {editing ? <input type="text" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className="pp-input" />
                  : <p>{profile.name}</p>}
              </div>
              <div className="pp-field">
                <label>Email</label>
                {editing ? <input type="email" value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} className="pp-input" />
                  : <p>{profile.email}</p>}
              </div>
              <div className="pp-field full">
                <label>Bio</label>
                {editing ? <textarea value={editData.bio} onChange={e => setEditData({ ...editData, bio: e.target.value })} className="pp-input" rows={2} />
                  : <p>{profile.bio}</p>}
              </div>
            </div>
            {editing && <button className="btn-gradient mt-3" onClick={saveProfile}><i className="bi bi-check-lg me-1"></i>Save Changes</button>}

            {/* Passport Tracker */}
            <div className="pp-passport">
              <h4><i className="bi bi-passport me-2"></i>Passport Tracker</h4>
              <div className="pp-passport-grid">
                <div className="pp-passport-stat"><span className="pp-passport-val">{profile.passport.countries}</span><span>Countries Visited</span></div>
                <div className="pp-passport-stat"><span className="pp-passport-val">{profile.passport.stamps}</span><span>Passport Stamps</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="pp-section fade-in-up">
            <h3>Preferences</h3>
            <div className="pp-pref-list">
              <div className="pp-pref-item">
                <div><span className="pp-pref-label">Language</span><span className="pp-pref-desc">App display language</span></div>
                <select value={profile.language} onChange={e => { const p = { ...profile, language: e.target.value }; setProfile(p); setItem(STORAGE_KEYS.PROFILE, p); }} className="pp-select">
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="pp-pref-item">
                <div><span className="pp-pref-label">Currency</span><span className="pp-pref-desc">Default currency for budgets</span></div>
                <select value={profile.currency} onChange={e => { const p = { ...profile, currency: e.target.value }; setProfile(p); setItem(STORAGE_KEYS.PROFILE, p); }} className="pp-select">
                  {['INR (₹)'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="pp-pref-item">
                <div><span className="pp-pref-label">Notifications</span><span className="pp-pref-desc">Trip alerts & reminders</span></div>
                <button className={`pp-toggle ${profile.notifications ? 'on' : ''}`} onClick={() => { const p = { ...profile, notifications: !profile.notifications }; setProfile(p); setItem(STORAGE_KEYS.PROFILE, p); }}>
                  <span className="pp-toggle-thumb"></span>
                </button>
              </div>
              <div className="pp-pref-item">
                <div><span className="pp-pref-label">Dark Mode</span><span className="pp-pref-desc">Use dark theme</span></div>
                <button className={`pp-toggle ${profile.darkMode ? 'on' : ''}`} onClick={() => { const p = { ...profile, darkMode: !profile.darkMode }; setProfile(p); setItem(STORAGE_KEYS.PROFILE, p); }}>
                  <span className="pp-toggle-thumb"></span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="pp-section fade-in-up">
            <h3>Travel Badges</h3>
            <div className="pp-badges-grid">
              {BADGES.map((b, i) => (
                <div key={i} className="pp-badge-card" style={{ animationDelay: `${0.1 * i}s` }}>
                  <span className="pp-badge-icon">{b.icon}</span>
                  <span className="pp-badge-name">{b.name}</span>
                  <span className="pp-badge-desc">{b.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div className="pp-section fade-in-up">
            <h3>Account Settings</h3>
            <div className="pp-account-list">
              <button className="pp-account-item" onClick={() => setShowPasswordModal(true)}>
                <i className="bi bi-lock"></i><span>Change Password</span><i className="bi bi-chevron-right"></i>
              </button>
              <button className="pp-account-item" onClick={() => toast('Privacy settings coming soon!')}>
                <i className="bi bi-shield-lock"></i><span>Privacy Settings</span><i className="bi bi-chevron-right"></i>
              </button>
              <button className="pp-account-item" onClick={() => toast('Data export coming soon!')}>
                <i className="bi bi-download"></i><span>Export Data</span><i className="bi bi-chevron-right"></i>
              </button>
              <button className="pp-account-item danger" onClick={() => setShowDeleteModal(true)}>
                <i className="bi bi-trash3"></i><span>Delete Account</span><i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="pp-modal-overlay" onClick={() => setShowPasswordModal(false)}>
            <div className="pp-modal" onClick={e => e.stopPropagation()}>
              <div className="pp-modal-header">
                <h4>Change Password</h4>
                <button className="pp-modal-close" onClick={() => setShowPasswordModal(false)}>
                  <i className="bi bi-x"></i>
                </button>
              </div>
              <div className="pp-modal-body">
                <div className="pp-field">
                  <label>Current Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter current password"
                    value={passwordData.oldPassword}
                    onChange={e => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                    className="pp-input"
                  />
                </div>
                <div className="pp-field">
                  <label>New Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="pp-input"
                  />
                </div>
                <div className="pp-field">
                  <label>Confirm Password</label>
                  <input 
                    type="password" 
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="pp-input"
                  />
                </div>
              </div>
              <div className="pp-modal-footer">
                <button className="btn-glass" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button 
                  className="btn-gradient" 
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                >
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="pp-modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="pp-modal pp-modal-danger" onClick={e => e.stopPropagation()}>
              <div className="pp-modal-header">
                <h4>Delete Account</h4>
                <button className="pp-modal-close" onClick={() => setShowDeleteModal(false)}>
                  <i className="bi bi-x"></i>
                </button>
              </div>
              <div className="pp-modal-body">
                <div className="pp-danger-warning">
                  <i className="bi bi-exclamation-triangle"></i>
                  <p>This action cannot be undone. Your account and all associated data will be permanently deleted.</p>
                </div>
              </div>
              <div className="pp-modal-footer">
                <button className="btn-glass" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button 
                  className="btn-danger" 
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
