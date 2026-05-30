# AGENTS.md

## Project

Velora — AI-powered travel planning platform.

Velora helps users generate personalized travel itineraries using AI with a strong focus on:

* premium UX
* beautiful interfaces
* structured itineraries
* maps integration
* scalable architecture
* cost-efficient AI systems

---

# Core Product Philosophy

Velora is NOT:

* a generic chatbot
* an admin dashboard
* an AI wrapper

Velora SHOULD feel like:

* a premium consumer travel app
* cinematic
* interactive
* visual
* fast
* intelligent

Focus on:

* user experience
* speed
* polish
* responsiveness

over:

* excessive AI
* unnecessary infrastructure
* overengineering

---

# Tech Stack

## Frontend

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Zustand
* TanStack Query

## Backend

* Next.js Route Handlers
* Prisma ORM
* Neon PostgreSQL

## Authentication

* Better Auth

## AI

* Gemini 2.5 Flash
* OpenAI SDK compatibility layer
* Zod validation

## Infrastructure

* Vercel
* Google Maps Platform

---

# Folder Structure

```txt
src/
│
├── app/
├── components/
├── lib/
├── hooks/
├── services/
├── store/
├── types/
│
prisma/
public/
```

---

# Landing Page Philosophy

Landing page is EXTREMELY important.

The homepage should:

* create excitement
* feel premium
* feel modern
* encourage immediate trip generation

Design inspiration:

* Airbnb
* Linear
* Notion
* Apple-style spacing

Avoid:

* dashboard-heavy UI
* clutter
* enterprise SaaS styling

---

# Primary User Flow

```txt
Landing Page
   ↓
Trip Generation
   ↓
AI Processing
   ↓
Interactive Itinerary
   ↓
Save Trip
   ↓
Dashboard
```

---

# MVP Scope

Build ONLY:

1. Landing page
2. Trip generation form
3. AI itinerary generation
4. Itinerary rendering
5. Save trips
6. Basic authentication
7. Maps integration

DO NOT BUILD YET:

* social feed
* realtime collaboration
* voice AI
* advanced recommendation systems
* microservices
* complex infra

---

# AI Rules

## IMPORTANT

AI should return:

* structured JSON
* deterministic fields
* validated outputs

AI should NOT:

* return massive paragraphs
* control frontend rendering
* replace business logic

---

# AI Cost Optimization Rules

AI usage must remain cost-efficient.

## Rules

### 1. Generate once

Avoid regenerating full itineraries repeatedly.

### 2. Partial updates only

Regenerate:

* single activity
* single day
* specific recommendation

instead of full trips.

### 3. Cache aggressively

Cache itineraries by:

* destination
* duration
* travel style
* budget range

### 4. Prefer deterministic systems

Do NOT use AI for:

* sorting
* filtering
* calculations
* scheduling
* local state changes

Use code instead.

---

# Database Philosophy

Use PostgreSQL relational modeling.

Primary entities:

```txt
User
Trip
TripDay
Activity
SavedPlace
```

Future entities:

```txt
TripTemplate
Recommendation
UserPreference
```

---

# UI Philosophy

## Hero Section

Most important area.

Should include:

* large headline
* strong typography
* prompt-style input
* cinematic visuals
* floating cards/mockups

## Itinerary Screen

Core product experience.

Should contain:

* timeline
* maps
* budgets
* routes
* place previews
* interactive cards

## Dashboard

Dashboard is secondary.

Used for:

* saved trips
* history
* settings

Avoid making dashboard the main experience.

---

# Styling Rules

## Prioritize

* spacing
* typography
* gradients
* subtle motion
* clean layouts
* responsive design

## Avoid

* excessive borders
* cluttered UI
* flashy animations
* generic dashboard layouts

---

# Performance Rules

Prioritize:

* fast loading
* streaming UX
* optimized images
* lightweight client bundles

Avoid:

* unnecessary rerenders
* oversized dependencies
* large AI payloads

---

# Maps Rules

Use:

* Google Places API
* Google Maps API

Important:

* lazy load maps
* avoid unnecessary API calls
* use static previews when possible

---

# State Management

## Zustand

Use for:

* UI state
* planner state
* local interactions

## TanStack Query

Use for:

* API data
* caching
* async mutations

---

# Development Order

Build in this order:

1. Landing page
2. Generate trip flow
3. Fake itinerary UI
4. AI integration
5. Database integration
6. Save trips
7. Authentication
8. Maps
9. Polish

---

# Commit Philosophy

Commit after meaningful milestones.

Good examples:

```txt
feat: build landing hero section
feat: create trip generation form
style: improve landing responsiveness
fix: resolve itinerary layout issue
```

Avoid vague commit messages.

---

# Environment Variables

```env
DATABASE_URL=
GEMINI_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

---

# Final Goal

Velora should feel:

* premium
* modern
* immersive
* fast
* consumer-focused

The experience should feel closer to:

* Airbnb
* Pinterest
* modern travel apps

than:

* enterprise dashboards
* AI chat interfaces
