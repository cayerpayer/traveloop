/* ============================================
   DashboardPage — Premium AI-powered travel
   planning dashboard assembling all sections.
   ============================================ */

import { useRef } from 'react';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import WelcomeHero from '../../components/Dashboard/WelcomeHero';
import QuickActionCard from '../../components/Dashboard/QuickActionCard';
import TripCard from '../../components/Dashboard/TripCard';
import DestinationCard from '../../components/Dashboard/DestinationCard';
import BudgetCard from '../../components/Dashboard/BudgetCard';
import ActivityTimeline from '../../components/Dashboard/ActivityTimeline';
import TravelInsightCard from '../../components/Dashboard/TravelInsightCard';
import FloatingActionButton from '../../components/Dashboard/FloatingActionButton';

import {
  TRIPS_DATA,
  DESTINATIONS_DATA,
  BUDGET_DATA,
  QUICK_ACTIONS_DATA,
  ACTIVITY_DATA,
  INSIGHTS_DATA,
} from '../../data/dashboardData';

import './DashboardPage.css';

// Budget cards config
const BUDGET_CARDS = [
  { icon: 'bi-wallet2', label: 'Total Budget', value: BUDGET_DATA.totalBudget, trend: BUDGET_DATA.trends.budget, color: '#4F46E5', percentage: 100 },
  { icon: 'bi-credit-card', label: 'Amount Spent', value: BUDGET_DATA.amountSpent, trend: BUDGET_DATA.trends.spent, color: '#F59E0B', percentage: Math.round((BUDGET_DATA.amountSpent / BUDGET_DATA.totalBudget) * 100) },
  { icon: 'bi-piggy-bank', label: 'Savings', value: BUDGET_DATA.savings, trend: BUDGET_DATA.trends.savings, color: '#10B981', percentage: Math.round((BUDGET_DATA.savings / BUDGET_DATA.totalBudget) * 100) },
  { icon: 'bi-calendar-check', label: 'Upcoming Expenses', value: BUDGET_DATA.upcomingExpenses, trend: BUDGET_DATA.trends.upcoming, color: '#06B6D4', percentage: Math.round((BUDGET_DATA.upcomingExpenses / BUDGET_DATA.totalBudget) * 100) },
];

export default function DashboardPage() {
  const tripsScrollRef = useRef(null);

  const scrollTrips = (dir) => {
    if (tripsScrollRef.current) {
      tripsScrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="dashboard-page page-transition" id="dashboard-page">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <main className="dash-main container">
        {/* 1. Welcome Hero */}
        <WelcomeHero />

        {/* 2. Quick Action Cards */}
        <section className="dash-section" id="quick-actions-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">
              <i className="bi bi-lightning-charge me-2"></i>Quick Actions
            </h2>
          </div>
          <div className="quick-actions-grid">
            {QUICK_ACTIONS_DATA.map((action, i) => (
              <QuickActionCard key={action.id} {...action} index={i} />
            ))}
          </div>
        </section>

        {/* 3. Upcoming Trips — Horizontal Scroll */}
        <section className="dash-section" id="upcoming-trips-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">
              <i className="bi bi-airplane-engines me-2"></i>Upcoming Trips
            </h2>
            <div className="dash-scroll-controls">
              <button className="dash-scroll-btn" onClick={() => scrollTrips(-1)} aria-label="Scroll left">
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="dash-scroll-btn" onClick={() => scrollTrips(1)} aria-label="Scroll right">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="trips-scroll-container" ref={tripsScrollRef}>
            {TRIPS_DATA.map((trip, i) => (
              <TripCard key={trip.id} trip={trip} index={i} />
            ))}
          </div>
        </section>

        {/* 4. Budget Highlights */}
        <section className="dash-section" id="budget-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">
              <i className="bi bi-bar-chart-line me-2"></i>Budget Highlights
            </h2>
          </div>
          <div className="budget-grid">
            {BUDGET_CARDS.map((card, i) => (
              <BudgetCard key={i} {...card} index={i} />
            ))}
          </div>
        </section>

        {/* 5. Recommended Destinations */}
        <section className="dash-section" id="destinations-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">
              <i className="bi bi-globe-americas me-2"></i>Recommended Destinations
            </h2>
            <button className="btn-glass dash-section-btn" id="view-all-destinations">
              View All <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
          <div className="destinations-grid">
            {DESTINATIONS_DATA.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        </section>

        {/* 6. AI Insights + Activity Timeline — Two Column Layout */}
        <div className="dash-two-col" id="insights-activity-section">
          {/* AI Travel Insights */}
          <section className="dash-section dash-col-left">
            <div className="dash-section-header">
              <h2 className="dash-section-title">
                <i className="bi bi-cpu me-2"></i>Smart Travel Insights
              </h2>
              <span className="ai-badge">
                <i className="bi bi-stars me-1"></i>AI Powered
              </span>
            </div>
            <div className="insights-list">
              {INSIGHTS_DATA.map((insight, i) => (
                <TravelInsightCard key={insight.id} insight={insight} index={i} />
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="dash-section dash-col-right">
            <div className="dash-section-header">
              <h2 className="dash-section-title">
                <i className="bi bi-activity me-2"></i>Recent Activity
              </h2>
            </div>
            <div className="activity-wrap glass-card-subtle">
              <ActivityTimeline activities={ACTIVITY_DATA} />
            </div>
          </section>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
