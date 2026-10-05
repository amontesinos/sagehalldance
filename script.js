// ==========================================================================
// Sage Hall Dance - Interactive Website Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Mobile Navigation Toggle
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close mobile nav when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // 2. Smooth Scrolling for Navigation
    // ----------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ----------------------------------------------------------------------
    // 3. Calendar Configuration Modal & Local Storage Persistence
    // ----------------------------------------------------------------------
    const configureBtn = document.getElementById('configure-calendar-btn');
    const calendarModal = document.getElementById('calendar-modal');
    const modalClose = document.getElementById('modal-close');
    const saveCalendarBtn = document.getElementById('save-calendar-id');
    const resetCalendarBtn = document.getElementById('reset-calendar-id');
    const calendarInput = document.getElementById('calendar-id-input');
    const calendarIframe = document.getElementById('google-calendar-iframe');

    const DEFAULT_CALENDAR_SRC = "https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FDenver";

    // Load saved calendar from localStorage if set
    const savedCalendar = localStorage.getItem('sage_hall_calendar_src');
    if (savedCalendar && calendarIframe) {
        calendarIframe.src = savedCalendar;
        if (calendarInput) {
            calendarInput.value = savedCalendar;
        }
    }

    if (configureBtn && calendarModal) {
        configureBtn.addEventListener('click', () => {
            calendarModal.classList.add('active');
            if (calendarInput && !calendarInput.value) {
                calendarInput.value = calendarIframe.src;
            }
        });

        modalClose.addEventListener('click', () => {
            calendarModal.classList.remove('active');
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === calendarModal) {
                calendarModal.classList.remove('active');
            }
        });

        // Save Calendar Action
        saveCalendarBtn.addEventListener('click', () => {
            let val = calendarInput.value.trim();
            if (!val) {
                alert('Please enter a valid Google Calendar ID or Embed URL.');
                return;
            }

            // Check if it's already a full iframe embed or URL
            let newSrc = val;
            if (val.includes('<iframe') && val.includes('src="')) {
                const match = val.match(/src="([^"]+)"/);
                if (match && match[1]) {
                    newSrc = match[1];
                }
            } else if (!val.startsWith('http')) {
                // Treated as calendar ID
                const encodedId = encodeURIComponent(val);
                newSrc = `https://calendar.google.com/calendar/embed?src=${encodedId}&ctz=America%2FDenver`;
            }

            calendarIframe.src = newSrc;
            localStorage.setItem('sage_hall_calendar_src', newSrc);
            calendarModal.classList.remove('active');
            alert('Calendar updated successfully! This will persist in your browser for testing.');
        });

        // Reset to Default
        resetCalendarBtn.addEventListener('click', () => {
            calendarIframe.src = DEFAULT_CALENDAR_SRC;
            localStorage.removeItem('sage_hall_calendar_src');
            calendarInput.value = '';
            calendarModal.classList.remove('active');
            alert('Reset to default demonstration calendar.');
        });
    }

    console.log("Sage Hall Dance website mockup loaded successfully.");
});
