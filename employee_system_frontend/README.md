# Employee System Frontend

A modern, responsive multi-role portal built with React.

## Highlights
- Role-based dashboards: Super Admin, Manager, Team Leader, Employee
- Attendance (face/GPS/manual), Breaks & Schedule
- Meeting scheduler with calendar list
- Task & project tracking
- Leave request & approval workflows
- Analytics charts (Recharts) and compliance/productivity alerts
- Notification center
- Protected routes, Redux store, mock + API integration
- Dark/Light theme

## Getting Started
1. Copy .env.example to .env and set REACT_APP_API_BASE to your backend URL.
2. Install deps: `npm install`
3. Start: `npm start` (http://localhost:3000)
4. Login page allows selecting a role for demo.

## Structure
- src/state: Redux store and slices
- src/services: API wrapper (axios) with env-based base URL
- src/pages: Feature pages
- src/components: Reusable UI, charts, loaders
- src/constants: RBAC config

## Notes
- Backend endpoints are not required; UI uses mock fallbacks where necessary.
- To integrate real backend, set REACT_APP_API_BASE and wire apiGet/apiPost in pages.

