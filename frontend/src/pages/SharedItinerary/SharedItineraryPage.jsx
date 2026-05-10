/* ============================================
   SharedItineraryPage — Public trip showcase
   ============================================ */
import { useState } from 'react';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import { getItem, STORAGE_KEYS } from '../../utils/localStorage';
import { CITIES_DATA } from '../../data/mockData';
import toast from 'react-hot-toast';
import './SharedItineraryPage.css';

const SLOT_ICONS = { Morning: 'bi-sunrise', Afternoon: 'bi-sun', Evening: 'bi-moon-stars' };
const REACTIONS = ['🔥', '❤️', '😍', '✈️', '🌟'];

export default function SharedItineraryPage() {
  const itineraries = getItem(STORAGE_KEYS.ITINERARIES, []);
  const itinerary = itineraries[0] || null;
  const [likes, setLikes] = useState(42);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, author: 'Sarah K.', text: 'Amazing itinerary! Bali is on my bucket list 🌴', time: '2 days ago' },
    { id: 2, author: 'Mike R.', text: 'Great budget planning, very helpful!', time: '1 day ago' },
  ]);
  const [newComment, setNewComment] = useState('');
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleLike = () => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); };
  const handleCopyTrip = () => toast.success('Trip copied to your account!');
  const handleShare = () => { navigator.clipboard.writeText(window.location.href); toast.success('Share link copied!'); };
  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), author: 'You', text: newComment, time: 'Just now' }]);
    setNewComment('');
    toast.success('Comment added!');
  };

  const totalActivities = itinerary?.days?.reduce((s, d) =>
    s + Object.values(d.slots).reduce((sum, slot) => sum + slot.length, 0), 0
  ) || 0;

  return (
    <div className="shared-itinerary-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />
      <main className="container si-main">
        {/* Hero */}
        <div className="si-hero fade-in-up">
          <div className="si-hero-cover">
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=400&fit=crop" alt="Trip cover" />
            <div className="si-hero-overlay">
              <div className="si-hero-badge"><i className="bi bi-globe me-1"></i>Public Trip</div>
              <h1 className="si-hero-title">{itinerary?.title || 'Tropical Paradise Escape'}</h1>
              <div className="si-hero-author">
                <div className="si-author-avatar">DU</div>
                <div>
                  <span className="si-author-name">Demo User</span>
                  <span className="si-author-date">Created May 2026</span>
                </div>
              </div>
              <div className="si-hero-stats">
                <span><i className="bi bi-calendar3"></i>{itinerary?.totalDays || 7} Days</span>
                <span><i className="bi bi-geo-alt"></i>{itinerary?.cities?.length || 2} Cities</span>
                <span><i className="bi bi-lightning"></i>{totalActivities} Activities</span>
                <span><i className="bi bi-wallet2"></i>${itinerary?.budget || 3000}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="si-action-bar fade-in-up delay-1">
          <button className={`si-like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
            <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`}></i>{likes}
          </button>
          <div className="si-reactions">
            {REACTIONS.map(r => (
              <button key={r} className={`si-reaction ${selectedReaction === r ? 'active' : ''}`} onClick={() => { setSelectedReaction(r); toast(`${r} reacted!`); }}>
                {r}
              </button>
            ))}
          </div>
          <div className="si-action-right">
            <button className="btn-gradient btn-sm" onClick={handleCopyTrip}><i className="bi bi-copy me-1"></i>Copy Trip</button>
            <button className="btn-glass btn-sm" onClick={handleShare}><i className="bi bi-share me-1"></i>Share</button>
          </div>
        </div>

        {/* Timeline */}
        <div className="si-timeline fade-in-up delay-2">
          <h3 className="cs-section-title"><i className="bi bi-list-nested me-2"></i>Trip Timeline</h3>
          {itinerary?.days?.map((day, i) => (
            <div key={day.id} className="iv-timeline-day" style={{ animationDelay: `${0.1 * i}s` }}>
              <div className="iv-tl-connector"><div className="iv-tl-dot"></div>{i < itinerary.days.length - 1 && <div className="iv-tl-line"></div>}</div>
              <div className="iv-tl-content">
                <span className="iv-tl-day-badge">Day {day.day}</span>
                {Object.entries(day.slots).map(([slot, acts]) =>
                  acts.length > 0 && (
                    <div key={slot} className="iv-tl-slot" style={{ marginTop: '0.75rem' }}>
                      <span className="iv-tl-slot-label"><i className={`bi ${SLOT_ICONS[slot]} me-1`}></i>{slot}</span>
                      {acts.map(act => (
                        <div key={act.slotId} className="iv-tl-act">
                          <img src={act.image} alt={act.name} className="iv-tl-act-img" />
                          <div className="iv-tl-act-info">
                            <span className="iv-tl-act-name">{act.name}</span>
                            <div className="iv-tl-act-meta">
                              <span><i className="bi bi-clock"></i>{act.duration}</span>
                              <span><i className="bi bi-wallet2"></i>${act.cost}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
                {Object.values(day.slots).every(s => s.length === 0) && <p className="iv-tl-empty" style={{ marginTop: '0.5rem' }}>Free day — explore on your own!</p>}
              </div>
            </div>
          )) || <p className="iv-tl-empty">No itinerary data available</p>}
        </div>

        {/* Gallery */}
        <div className="si-gallery fade-in-up delay-3">
          <h3 className="cs-section-title"><i className="bi bi-images me-2"></i>Gallery</h3>
          <div className="si-gallery-grid">
            {CITIES_DATA.slice(0, 4).map(c => (
              <div key={c.id} className="si-gallery-item">
                <img src={c.image} alt={c.name} loading="lazy" />
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="si-comments fade-in-up delay-4">
          <h3 className="cs-section-title"><i className="bi bi-chat-dots me-2"></i>Comments ({comments.length})</h3>
          <div className="si-comments-list">
            {comments.map(c => (
              <div key={c.id} className="si-comment">
                <div className="si-comment-avatar">{c.author[0]}</div>
                <div className="si-comment-body">
                  <div className="si-comment-header">
                    <span className="si-comment-author">{c.author}</span>
                    <span className="si-comment-time">{c.time}</span>
                  </div>
                  <p className="si-comment-text">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="si-comment-input">
            <input type="text" placeholder="Add a comment..." value={newComment} onChange={e => setNewComment(e.target.value)} onKeyDown={e => e.key === 'Enter' && addComment()} />
            <button onClick={addComment}><i className="bi bi-send"></i></button>
          </div>
        </div>
      </main>
    </div>
  );
}
