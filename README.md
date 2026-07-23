# St. John's College Notice Board

**Arundel Hackathon 2026 — Senior Category, Web Design track**
Topic: *Community Impact Portal*

A live, real-time digital notice board for St. John's College, built to replace
the physical noticeboard that gets cluttered, torn down, or missed entirely.

## The problem

Physical notice boards are slow to update, easy to miss, and impossible to
check remotely. Announcements get buried under old paper, students walk past
without noticing, and parents/staff off-site have no way to see what's
current. There's also no record of what was posted or when.

## Who it's for

- **Students**, who mostly meet the board as the corridor TV while walking
  past between classes — most don't carry phones on them during the day.
- **Staff**, posting updates without needing a print-and-pin workflow, and
  checking in from a phone.
- **Parents**, who can't walk past a corridor board but still need to know
  what's happening, via the phone view.

## Objectives

1. Replace the physical board with a live screen/webpage that updates
   instantly, with no manual refresh.
2. Let non-technical staff post an announcement (with images, video, or
   attachments) in under a minute.
3. Surface the most important announcements automatically, at a glance, so
   a student walking past for a few seconds sees what matters most without
   having to read or filter anything.
4. Keep the board relevant automatically — old announcements should expire
   on their own instead of needing manual cleanup.
5. Make the unattended corridor TV the primary target, with the phone view
   as a secondary path for staff, parents, and anyone off-site.
6. Protect who can post — public visitors should only ever be able to read.

## Features

- **Real-time sync** — Firestore's live listener pushes new posts to every
  open screen instantly, with a 15-second polling fallback in case an update
  is missed.
- **Priority levels** (Normal / Important / Urgent) with colour-coded cards.
- **Categories** (General, Events, Academic, Sports & Co-Curricular, Safety)
  — staff pick one when posting, and it appears as an automatic label on
  each slide on the public board; there's no clickable filter on the TV.
- **Auto-expiring announcements** — set an optional "remove after" date so
  outdated notices disappear on their own.
- **Rich posts** — images, video, and multiple file attachments per
  announcement.
- **Full-screen priority-weighted rotation** — one announcement at a time,
  auto-advancing, with dwell time and recurrence both scaled by priority
  (Normal, Important, Urgent) so the most important posts stay on screen
  longer and come back around more often.
- **"Coming up" countdown strip** — automatically computed from a
  `TERM_EVENTS` list in `config.js`, e.g. "Rugby vs Falcon College · this
  Saturday" or "Term Ends · in 14 days".
- **QR code** on both the board and the admin panel, linking straight to the
  public page for quick access from a phone.
- **Admin dashboard** — active announcement count and view counts (today /
  all-time), password-protected login, keyword-based priority suggestions
  while typing.
- **Resilient** — if the server can't be reached, the board shows a status
  banner and retries automatically instead of silently freezing.
- **Responsive** — stacks into a single column on phones and tablets instead
  of squashing the corridor-display layout.

## Display design

The public board is unattended signage: a 42–55" TV mounted in a corridor,
viewed from 3–6 metres by Form 1–2 students walking past, with no keyboard,
mouse, or touch input available. Every part of that page is designed to be
read in a few seconds from across the corridor, not interacted with — type
scale, contrast, and priority colour are all pushed up for legibility at a
distance, and there is nothing on the screen that can be clicked or typed
into. The responsive phone layout is a secondary path, used by staff,
parents, and older students who want to check the board from off-site or up
close.

## Tech stack

Plain HTML/CSS/JS (no build step, no framework) + [Firebase](https://firebase.google.com)
(Firestore, Auth, and Cloud Storage) via the modular v10 SDK loaded straight
from the gstatic CDN as ES modules — no npm install. Hosted as a static site
(currently GitHub Pages).

## Project structure

```
index.html          Public notice board (the display page)
admin/index.html     Password-protected admin panel for posting
config.js            Shared Firebase config, category list, and term-event
                     dates that drive the "coming up" countdown
firestore.rules      Deploy to Firebase — Firestore security rules
storage.rules        Deploy to Firebase — Cloud Storage security rules
supabase_setup.sql   Superseded — kept only as a reference for the old RLS
                     policy shape this project used before migrating off
                     Supabase; not used by either page anymore
Media/               Logo and sidebar images
```

## Setup

1. Create a [Firebase](https://console.firebase.google.com) project and
   register a Web app — copy the `firebaseConfig` object it gives you into
   `FIREBASE_CONFIG` in `config.js`.
2. Enable **Firestore Database** (Native mode). Deploy `firestore.rules`
   (Firebase Console → Firestore Database → Rules → paste the file's
   contents, or `firebase deploy --only firestore:rules` with the CLI). This
   lets anyone read announcements but only a signed-in admin write or delete
   them, and lets the public log a view without being able to read the
   counts back — the same shape as the old Supabase RLS policies.
3. Enable **Authentication → Email/Password**, then add an admin user under
   Authentication → Users — that email/password is what logs into
   `admin/index.html`.
4. Enable **Cloud Storage** and deploy `storage.rules` the same way as step 2.
   Uploads are written under an `announcements/` path; public can read,
   only a signed-in admin can write.
   ⚠️ Cloud Storage requires the paid **Blaze** (pay-as-you-go) plan on any
   Firebase project created since late 2024 — Spark (free) projects can't
   enable it. If Storage isn't available, image/video/attachment uploads in
   the admin panel fail with a clear message and the post is not saved, but
   **text-only announcements keep working** regardless.
5. Open `index.html` for the public board, `admin/index.html` to post.

## Security notes

- Firestore/Storage security rules (`firestore.rules` / `storage.rules`) are
  what actually protect the board — the login screen alone is not enough,
  since the public Firebase config is visible in the page source of any
  Firebase-backed site, same as any other client-side API key.
- User-supplied text is HTML-escaped before rendering to prevent stored XSS.
- The `board_views` collection only accepts inserts from the public — it
  cannot be read except by an authenticated admin, so view counts can't be
  scraped or tampered with from the public page.
