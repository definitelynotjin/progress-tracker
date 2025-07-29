# Icon Progress Tracker

A fullstack project management and progress tracking application built with Next.js (React), Tailwind CSS, and Laravel API backend.

## Features
- Kanban board for task management
- Calendar view with event tooltips
- Team management UI
- Notification system
- Modern UI with Tailwind CSS
- Backend API with Laravel (RESTful)

## Tech Stack
- **Frontend:** Next.js (React, TypeScript), Tailwind CSS, FullCalendar, Tippy.js
- **Backend:** Laravel (PHP, REST API)
- **Monorepo:** Both frontend and backend in a single repository

## Project Structure
```
icon-progress-tracker/
  backend/    # Laravel backend (API, routes, controllers, models)
  frontend/   # Next.js frontend (UI, pages, components)
  README.md   # This file
  ...         # Other config files
```

## Getting Started

### Frontend (Next.js)
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Backend (Laravel)
1. `cd backend`
2. `composer install`
3. Copy `.env.example` to `.env` and set up your database
4. `php artisan key:generate`
5. `php artisan migrate`
6. `php artisan serve`

## API Example
- `GET /api/tasks` — List all tasks
- `POST /api/tasks` — Create a new task

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
