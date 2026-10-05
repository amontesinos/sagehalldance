/**
 * Sage Hall Dance - Interactive Application Logic
 */

import { VENUES, INITIAL_EVENTS, REELS_DATA } from './events-data.js';

// Application State
const STATE = {
  events: [],
  currentFilter: 'all',
  currentView: 'agenda', // 'agenda' or 'calendar'
  currentCalDate: new Date(),
  isAdmin: false,
  selectedReel: null
};

// Storage Key
const STORAGE_KEY = 'sagehall_dance_events_v1';
const ADMIN_AUTH_KEY = 'sagehall_admin_auth';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadEventsFromStorage();
  checkAdminSession();
  initHeroNextDance();
  renderEvents();
  renderCalendar();
  renderReels();
  bindEventListeners();
});

function loadEventsFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      STATE.events = JSON.parse(saved);
    } catch (e) {
      STATE.events = [...INITIAL_EVENTS];
    }
  } else {
    STATE.events = [...INITIAL_EVENTS];
    saveEventsToStorage();
  }
}

function saveEventsToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE.events));
}

function checkAdminSession() {
  STATE.isAdmin = sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  updateAdminUI();
}

function updateAdminUI() {
  const adminBtn = document.getElementById('adminToggleBtn');
  const addEventBtn = document.getElementById('addEventScheduleBtn');
  
  if (adminBtn) {
    adminBtn.innerHTML = STATE.isAdmin 
      ? '<span>🔓 Admin Active</span>' 
      : '<span>🔒 Organizer Sign-In</span>';
  }

  if (addEventBtn) {
    addEventBtn.style.display = STATE.isAdmin ? 'inline-flex' : 'none';
  }
}

// -------------------------------------------------------------
// Hero Banner: Calculate Next Dance
// -------------------------------------------------------------
function initHeroNextDance() {
  const nextDanceWrap = document.getElementById('heroNextDance');
  const alertBanner = document.getElementById('topAlertText');
  if (!STATE.events.length) return;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Sort events chronologically
  const sorted = [...STATE.events].sort((a, b) => new Date(a.date) - new Date(b.date));
  const upcoming = sorted.find(ev => new Date(ev.date) >= now) || sorted[0];

  if (upcoming && nextDanceWrap) {
    const venue = VENUES[upcoming.venueId] || { name: 'Logan, UT' };
    const dateObj = new Date(upcoming.date + 'T00:00:00');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    nextDanceWrap.innerHTML = `
      <div class="highlight-label">🤠 NEXT UPCOMING DANCE</div>
      <div class="highlight-venue">${upcoming.title} @ ${venue.name}</div>
      <div class="highlight-meta">
        <strong>${dayName}, ${monthDay}</strong> • Lesson: ${upcoming.lessonTime || '8:00 PM'} • ${upcoming.price || '$8 Entry'}
      </div>
    `;

    if (alertBanner) {
      alertBanner.innerHTML = `Next Dance: <strong>${dayName}, ${monthDay}</strong> at <strong>${venue.name}</strong> • Lessons start ${upcoming.lessonTime || '8:00 PM'}!`;
    }
  }
}

// -------------------------------------------------------------
// Render Agenda / List View
// -------------------------------------------------------------
function renderEvents() {
  const container = document.getElementById('eventsAgendaGrid');
  if (!container) return;

  let filtered = STATE.events;
  if (STATE.currentFilter !== 'all') {
    filtered = filtered.filter(ev => ev.venueId === STATE.currentFilter);
  }

  filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px; background: white; border-radius: 12px; border: 1px dashed var(--border-color);">
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--bg-leather);">No dances scheduled for this filter.</p>
        <button class="btn btn-outline btn-sm" style="margin-top: 12px;" onclick="window.resetFilters()">Show All Events</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ev => {
    const venue = VENUES[ev.venueId] || { name: 'Logan Venue', address: 'Logan, UT', mapUrl: '#' };
    const dateObj = new Date(ev.date + 'T00:00:00');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = dateObj.getDate();
    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });

    const gcalUrl = generateGoogleCalendarUrl(ev, venue);

    const adminActions = STATE.isAdmin ? `
      <div style="display: flex; gap: 6px; margin-top: 8px;">
        <button class="btn btn-outline btn-sm" onclick="window.editEvent('${ev.id}')" style="font-size: 0.75rem; padding: 4px 8px;">✏️ Edit</button>
        <button class="btn btn-outline btn-sm" onclick="window.deleteEvent('${ev.id}')" style="font-size: 0.75rem; padding: 4px 8px; color: #c53030;">🗑️ Delete</button>
      </div>
    ` : '';

    return `
      <article class="event-card" data-event-id="${ev.id}">
        <div class="event-date-box">
          <span class="event-day-name">${dayName}</span>
          <span class="event-day-number">${dayNum}</span>
          <span class="event-month-name">${monthName}</span>
        </div>

        <div class="event-details-col">
          <div class="event-tags-row">
            <span class="badge ${venue.badgeClass || 'badge-all-ages'}">${venue.ageRestriction || 'All Ages'}</span>
            <span class="badge badge-fairgrounds">${venue.name}</span>
            ${ev.theme ? `<span style="font-size: 0.8rem; font-weight: 600; color: var(--honey);">★ ${ev.theme}</span>` : ''}
          </div>

          <h3 class="event-title">${ev.title}</h3>
          
          <div class="event-venue-line">
            📍 <span>${venue.fullName}</span>
            <a href="${venue.mapUrl}" target="_blank" rel="noopener" style="font-size: 0.8rem; color: var(--primary); text-decoration: underline;">(Directions)</a>
          </div>

          <div class="event-schedule-breakdown">
            <span class="schedule-item">🕒 <strong>Total Time:</strong> ${ev.time}</span>
            <span class="schedule-item">🎓 <strong>Lesson:</strong> ${ev.lessonTime}</span>
            <span class="schedule-item">💃 <strong>Social:</strong> ${ev.socialTime}</span>
          </div>

          ${ev.notes ? `<p style="font-size: 0.84rem; color: var(--text-muted); margin-top: 4px;">ℹ️ ${ev.notes}</p>` : ''}
          ${adminActions}
        </div>

        <div class="event-actions-col">
          <span class="event-price">${ev.price}</span>
          <div class="event-button-row">
            <a href="${gcalUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" title="Add to Google Calendar">
              📅 + Google Cal
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// -------------------------------------------------------------
// Google Calendar URL Generator
// -------------------------------------------------------------
function generateGoogleCalendarUrl(ev, venue) {
  const title = encodeURIComponent(`Sage Hall Dance: ${ev.title} @ ${venue.name}`);
  const location = encodeURIComponent(`${venue.fullName}, ${venue.address}`);
  const details = encodeURIComponent(
    `Sage Hall Country Swing Dance!\n\n` +
    `• Lesson: ${ev.lessonTime}\n` +
    `• Social Dance: ${ev.socialTime}\n` +
    `• Admission: ${ev.price}\n` +
    `• Notes: ${ev.notes || 'No partner required!'}\n\n` +
    `Follow @sagehalldance for weekly announcements!`
  );

  // Format date: YYYYMMDD
  const rawDate = ev.date.replace(/-/g, '');
  const dates = `${rawDate}T200000/${rawDate}T233000`; // 8:00 PM to 11:30 PM

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

// -------------------------------------------------------------
// Calendar Grid View Render
// -------------------------------------------------------------
function renderCalendar() {
  const monthTitle = document.getElementById('calMonthTitle');
  const daysGrid = document.getElementById('calDaysGrid');
  if (!monthTitle || !daysGrid) return;

  const current = STATE.currentCalDate;
  const year = current.getFullYear();
  const month = current.getMonth();

  monthTitle.textContent = current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // First day of month & total days
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  let cellsHtml = '';

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    cellsHtml += `<div class="cal-day-cell other-month"><span class="cal-date-number">${prevMonthDays - i}</span></div>`;
  }

  const todayStr = new Date().toISOString().split('T')[0];

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${year}-${mm}-${dd}`;

    const dayEvents = STATE.events.filter(e => e.date === dateStr);
    const isToday = dateStr === todayStr;

    let eventPills = dayEvents.map(e => `
      <div class="cal-event-pill venue-${e.venueId}" title="${e.title} (${e.time})" onclick="window.selectDateEvent('${e.id}')">
        ${e.title}
      </div>
    `).join('');

    cellsHtml += `
      <div class="cal-day-cell ${dayEvents.length ? 'has-event' : ''} ${isToday ? 'today-cell' : ''}">
        <span class="cal-date-number">${day}</span>
        ${eventPills}
      </div>
    `;
  }

  // Trailing next month days to fill 35 or 42 grid cells
  const totalRendered = firstDayIndex + daysInMonth;
  const remaining = totalRendered > 35 ? 42 - totalRendered : 35 - totalRendered;
  for (let j = 1; j <= remaining; j++) {
    cellsHtml += `<div class="cal-day-cell other-month"><span class="cal-date-number">${j}</span></div>`;
  }

  daysGrid.innerHTML = cellsHtml;
}

// -------------------------------------------------------------
// Render Instagram Reels Section
// -------------------------------------------------------------
function renderReels() {
  const container = document.getElementById('reelsGrid');
  if (!container) return;

  const gradients = [
    'linear-gradient(145deg, #742A16 0%, #2A1108 100%)',
    'linear-gradient(145deg, #1A365D 0%, #0F172A 100%)',
    'linear-gradient(145deg, #5B3A1C 0%, #241408 100%)',
    'linear-gradient(145deg, #2D4A3E 0%, #0E1E17 100%)'
  ];

  const icons = ['✨', '🔥', '👢', '🎵'];

  container.innerHTML = REELS_DATA.map((reel, index) => `
    <div class="reel-card" onclick="window.openReelModal('${reel.id}')">
      <div class="reel-video-preview">
        <div class="reel-mock-canvas" style="background: ${gradients[index % gradients.length]};">
          <div class="reel-play-btn">▶</div>
          <span style="font-size: 2rem; margin-bottom: 6px;">${icons[index % icons.length]}</span>
          <span style="font-family: var(--font-serif); font-weight: 800; font-size: 1.15rem; color: white;">@sagehalldance</span>
          <span style="font-size: 0.8rem; color: var(--honey); margin-top: 4px;">🎵 Original Country Audio</span>
          <span style="font-size: 0.75rem; color: #CBD5E1; margin-top: 2px;">${reel.duration}</span>
        </div>
        <span class="reel-pill-tag">${reel.tag}</span>
        <div class="reel-stats-overlay">
          <span>👁️ ${reel.views}</span>
          <span>❤️ ${reel.likes}</span>
        </div>
      </div>
      <div class="reel-info">
        <div>
          <h4 class="reel-title">${reel.title}</h4>
          <p class="reel-caption">${reel.caption}</p>
        </div>
        <a href="${reel.instagramUrl}" target="_blank" rel="noopener" class="reel-instagram-link" onclick="event.stopPropagation();">
          Watch on Instagram &rarr;
        </a>
      </div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// Event Listeners & Interactive Handlers
// -------------------------------------------------------------
function bindEventListeners() {
  // Filter pills
  document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      STATE.currentFilter = e.target.dataset.filter;
      renderEvents();
    });
  });

  // View toggle (Agenda vs Calendar)
  const agendaBtn = document.getElementById('viewAgendaBtn');
  const calendarBtn = document.getElementById('viewCalendarBtn');
  const agendaView = document.getElementById('eventsAgendaGrid');
  const calendarView = document.getElementById('calendarGridView');

  if (agendaBtn && calendarBtn) {
    agendaBtn.addEventListener('click', () => {
      agendaBtn.classList.add('active');
      calendarBtn.classList.remove('active');
      agendaView.style.display = 'grid';
      calendarView.style.display = 'none';
    });

    calendarBtn.addEventListener('click', () => {
      calendarBtn.classList.add('active');
      agendaBtn.classList.remove('active');
      agendaView.style.display = 'none';
      calendarView.style.display = 'block';
      renderCalendar();
    });
  }

  // Calendar prev/next navigation
  const prevBtn = document.getElementById('calPrevBtn');
  const nextBtn = document.getElementById('calNextBtn');
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      STATE.currentCalDate.setMonth(STATE.currentCalDate.getMonth() - 1);
      renderCalendar();
    });
    nextBtn.addEventListener('click', () => {
      STATE.currentCalDate.setMonth(STATE.currentCalDate.getMonth() + 1);
      renderCalendar();
    });
  }

  // Admin login toggle modal
  const adminBtn = document.getElementById('adminToggleBtn');
  const adminModal = document.getElementById('adminModal');
  const closeAdminBtn = document.getElementById('closeAdminModal');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const addEventForm = document.getElementById('addEventForm');

  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      if (STATE.isAdmin) {
        // Toggle logout or open dashboard
        openAdminModal();
      } else {
        openAdminModal();
      }
    });
  }

  if (closeAdminBtn && adminModal) {
    closeAdminBtn.addEventListener('click', () => adminModal.classList.remove('active'));
  }

  // Admin Login Handler
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pin = document.getElementById('adminPinInput').value;
      // Allow demo PIN: 1234 or sagehall
      if (pin === '1234' || pin.toLowerCase() === 'sagehall' || pin === '') {
        STATE.isAdmin = true;
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
        updateAdminUI();
        showAdminDashboardView();
        renderEvents();
        showToast('🔓 Signed in as Sage Hall Organizer!');
      } else {
        alert('Invalid PIN. Use demo PIN: 1234');
      }
    });
  }

  // Add Event Form Handler
  if (addEventForm) {
    addEventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newEv = {
        id: 'sh-' + Date.now(),
        title: document.getElementById('evTitle').value,
        date: document.getElementById('evDate').value,
        time: document.getElementById('evTime').value || '8:00 PM - 11:30 PM',
        lessonTime: document.getElementById('evLessonTime').value || '8:00 PM',
        socialTime: document.getElementById('evSocialTime').value || '9:00 PM - 11:30 PM',
        venueId: document.getElementById('evVenue').value,
        price: document.getElementById('evPrice').value || '$8 Entry',
        theme: document.getElementById('evTheme').value || '',
        notes: document.getElementById('evNotes').value || 'No partner required!'
      };

      STATE.events.push(newEv);
      saveEventsToStorage();
      renderEvents();
      renderCalendar();
      initHeroNextDance();
      adminModal.classList.remove('active');
      addEventForm.reset();
      showToast('🎉 New Dance Event successfully added to calendar!');
    });
  }

  // Admin Tab Switcher
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-pane').forEach(p => p.style.display = 'none');
      e.target.classList.add('active');
      const pane = document.getElementById(e.target.dataset.tab);
      if (pane) pane.style.display = 'block';
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '74px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--border-color)';
      }
    });
  }
}

function openAdminModal() {
  const modal = document.getElementById('adminModal');
  if (!modal) return;
  modal.classList.add('active');
  if (STATE.isAdmin) {
    showAdminDashboardView();
  } else {
    document.getElementById('adminAuthSection').style.display = 'block';
    document.getElementById('adminDashboardSection').style.display = 'none';
  }
}

function showAdminDashboardView() {
  document.getElementById('adminAuthSection').style.display = 'none';
  document.getElementById('adminDashboardSection').style.display = 'block';
}

// -------------------------------------------------------------
// Global Window Helpers (for inline event buttons)
// -------------------------------------------------------------
window.resetFilters = () => {
  STATE.currentFilter = 'all';
  document.querySelectorAll('.pill-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === 'all');
  });
  renderEvents();
};

window.deleteEvent = (id) => {
  if (!confirm('Are you sure you want to delete this event?')) return;
  STATE.events = STATE.events.filter(e => e.id !== id);
  saveEventsToStorage();
  renderEvents();
  renderCalendar();
  initHeroNextDance();
  showToast('Event removed.');
};

window.resetDefaultEvents = () => {
  if (!confirm('Reset calendar back to the original flyer events?')) return;
  STATE.events = [...INITIAL_EVENTS];
  saveEventsToStorage();
  renderEvents();
  renderCalendar();
  initHeroNextDance();
  showToast('Reset to default schedule.');
};

window.logoutAdmin = () => {
  STATE.isAdmin = false;
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
  updateAdminUI();
  document.getElementById('adminModal').classList.remove('active');
  renderEvents();
  showToast('Signed out of organizer mode.');
};

window.selectDateEvent = (id) => {
  // Switch to agenda view and highlight the event
  document.getElementById('viewAgendaBtn').click();
  const card = document.querySelector(`[data-event-id="${id}"]`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.style.outline = '3px solid var(--honey)';
    setTimeout(() => card.style.outline = 'none', 2000);
  }
};

window.openReelModal = (reelId) => {
  const reel = REELS_DATA.find(r => r.id === reelId);
  if (!reel) return;
  alert(`🎥 Sage Hall Reel: "${reel.title}"\n\n${reel.caption}\n\nOpening @sagehalldance Instagram...`);
  window.open(reel.instagramUrl, '_blank');
};

function showToast(msg) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
