/* ============================================================
   SHARED CONFIG — used by both index.html (public board) and
   admin/index.html (admin panel). Keep this as the single
   source of truth so the two pages never fall out of sync.
   ============================================================ */

window.APP_CONFIG = {
  // --- Firebase (Console → Project settings → General → Your apps) ---
  FIREBASE_CONFIG: {
    apiKey: "AIzaSyBKayI_9wbiQV6liuoV34nO_fGaR18s3B8",
    authDomain: "james-8d2f0.firebaseapp.com",
    projectId: "james-8d2f0",
    storageBucket: "james-8d2f0.firebasestorage.app",
    messagingSenderId: "1093113456516",
    appId: "1:1093113456516:web:93de84173a3184c71d1fd1",
  },

  // --- Announcement categories (used by admin form + as slide labels on the board) ---
  CATEGORIES: [
    { value: 'general',  label: 'General' },
    { value: 'events',   label: 'Events' },
    { value: 'academic', label: 'Academic' },
    { value: 'sports',   label: 'Sports & Co-Curricular' },
    { value: 'safety',   label: 'Safety' },
  ],

  // --- Term calendar dates powering the "Coming up" strip on the board ---
  // Edited once a term from Media/Trinity Term 2026 Calendar Students.pdf.
  // Dates in the past are ignored automatically; `major: true` gets the gold
  // highlight. If every date here has passed, the strip hides itself — that's
  // the cue to refresh this list for the new term.
  TERM_EVENTS: [
    { date: '2026-07-23', label: 'Art Exhibition' },
    { date: '2026-07-24', label: 'Form 4 & 6th Form Subject Selection Forms Due', major: true },
    { date: '2026-07-24', label: 'Hockey vs Falcon — compulsory support' },
    { date: '2026-07-25', label: 'Rugby vs Falcon College (Home) — compulsory support', major: true },
    { date: '2026-07-25', label: 'Arundel Hackathon' },
    { date: '2026-07-30', label: 'Lower 6th Parent-Teacher Consultation' },
    { date: '2026-07-31', label: "Hockey vs St George's College" },
    { date: '2026-08-01', label: "Rugby vs St George's (Away) — compulsory support", major: true },
    { date: '2026-08-02', label: 'Lower 6th Leadership Camp departs' },
    { date: '2026-08-05', label: 'Lower 6th Leadership Camp returns' },
    { date: '2026-08-06', label: 'Interhouse Music Competition' },
    { date: '2026-08-06', label: 'Term Ends', major: true },
    { date: '2026-09-08', label: 'Christmas Term Begins', major: true },
    { date: '2026-12-03', label: 'Christmas Term Ends', major: true },
  ],

  // --- How long each announcement holds the screen, by priority ---
  ROTATION: { normal: 12000, important: 18000, urgent: 24000 },

  // --- Full-screen reference slides shown periodically in the rotation ---
  // The sidebar thumbnails are unreadable at TV distance, so the calendar and
  // timetable also get their own full-width slides.
  //
  // Calendar crop values are FRACTIONS of the image (0-1), not pixels, so
  // re-exporting weeks.png at a different resolution won't break them — only
  // a change to its layout will. `cropRight` trims the right-hand detail
  // column, which just repeats the event name, and nearly doubles the
  // effective text size. Each `weeks` entry maps a date range to the
  // horizontal band of the image showing that week.
  REFERENCE_SLIDES: {
    dwellMs: 30000,        // longer than an announcement — denser to read
    everyNSlides: 5,       // insert one reference slide after every N announcements
    calendar: {
      label: 'Term Calendar',
      src: 'Media/weeks.png',
      cropRight: 0.494,
      weeks: [
        { from: '2026-07-20', to: '2026-07-26', top: 0.000, bottom: 0.577 },
        { from: '2026-07-27', to: '2026-08-02', top: 0.575, bottom: 1.000 },
      ],
    },
    timetable: {
      label: 'Co-Curricular Timetable',
      src: 'https://i.ibb.co/kgykcqdq/Screenshot-2026-06-25-150932.png',
    },
  },
};
