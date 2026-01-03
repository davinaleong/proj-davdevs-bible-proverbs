# Plan

# ✅ Simplified Build Plan (Wireframe-Driven)

## Phase 1 — App Skeleton (Day 1)

### 1. Layout & Navigation

**Matches:** All screens

* Top nav:

  * Today
  * Translations
  * Themes
  * Settings
* Shared footer
* Mobile-first column layout

**Tasks**

* Create `AppLayout`
* Create simple route/page switcher (state-based or Next routes)
* Footer component (static)

---

## Phase 2 — Core Logic (Day 1–2)

### 2. Proverb-of-the-Day Logic

**Matches:** Home screen

**Rules**

```ts
const chapter = selectedChapter ?? new Date().getDate()
```

**Tasks**

* Date helper
* Chapter resolver
* “Today: Chap X” indicator
* Reset-to-today action

---

### 3. Proverb Data (Temporary)

**Matches:** Home

* Use placeholder text first (like your wireframe)
* Structure data to support:

  * translation
  * chapter
  * verses

**Goal**

* Make UI work **before** full Bible data

---

## Phase 3 — Screens (One by One)

### 4. Home Screen

**Matches:** `1 - Home.png`

**Shows**

* Proverb title
* Translation + date
* Text content

**Tasks**

* Typography scaling (text size setting)
* Apply theme variables
* Scrollable content

---

### 5. Chapters Screen

**Matches:** `3 - Chapters.png`

**Behaviour**

* List Chapters 1–31
* Highlight selected chapter
* Tap = navigate back to Home

**Tasks**

* Generate chapters array
* Selection state
* Visual “active” style

---

### 6. Translations Screen

**Matches:** `2 - Translations.png`

**Behaviour**

* List translations
* Highlight current
* Tap = apply + return

**Tasks**

* Translation config list
* Store selected translation
* UI highlight

---

### 7. Themes Screen

**Matches:** `4 - Themes.png`

**Behaviour**

* List themes
* Highlight current
* Tap = apply immediately

**Tasks**

* Theme registry
* Apply via `data-theme`
* Persist selection

---

## Phase 4 — Settings (Important)

### 8. Settings Screen

**Matches:** `5 - Settings.png`

You already made a **great UX choice** here 👇

> “Click on the label to reset that setting.”

**Settings to implement now**

* Text Size
* Favourite Theme
* Favourite Translation
* Date Format
* Persist Settings
* Reset All

**Tasks**

* Settings state object
* Default values
* Reset-on-label-click logic

---

### 9. Selector Modal (Reusable)

**Matches:** `6 - Settings Selector.png`

This modal should be **generic**.

**Used for**

* Text Size
* Theme
* Translation
* Date Format
* Persist Yes/No

**Modal API (mental model)**

```ts
openSelector({
  title,
  options,
  currentValue,
  onSelect,
  onReset
})
```

**Tasks**

* Modal component
* Focus trap
* OK / Cancel
* Default action

---

## Phase 5 — Persistence (Last)

### 10. Settings Storage

**Matches:** Settings + modal

**Rules**

* If Persist = No → session only
* If Persist = Yes → localStorage
* Reset All clears storage

**Tasks**

* Storage helper
* Load on app start
* Save on change

---

## Phase 6 — Polish & Sanity Check

### 11. Visual & UX Polish

* Active state contrast
* Tap targets ≥ 44px
* No layout jump when modal opens
* Scroll lock behind modal

---

## ✅ “Done” Criteria (Based on Your Wireframes)

* All screens match wireframes
* Modal reused everywhere
* Settings actually affect UI
* Defaults restore correctly
* App works fully without login
* Mobile-first feels calm & readable
