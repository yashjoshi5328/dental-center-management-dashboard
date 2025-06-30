# Dental Dashboard App

Live Link is sent in the mail

Admin:
id: admin@entnt.in
pass: admin123

patient:
id: john@entnt.in
pass: patient123

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Architecture

- **React** (functional components, hooks)
- **Routing:** `react-router-dom` for all navigation and route protection
- **State Management:** Local state (React hooks) and browser `localStorage` for persistent data
- **Data Model:**
  - `users`, `patients`, `incidents` are loaded from mockAPI into localStorage on first login
  - All CRUD operations update localStorage
- **Components:**
  - `globalComponent/`: Shared UI (Navbar, ModalCard, NotFound, Login, etc.)
  - `admin/`: Admin dashboard, patient/incident management, calendar view
  - `patient/`: Patient dashboard, appointments, history
  - `utils/`: Data access, formatting, authentication, route guards

## Technical Decisions

- **Role-based Routing:**
  - `/admin` and subroutes are protected by `RequireAdmin` (redirects to login if not admin)
  - `/patient` is protected by `RequirePatient` (redirects to login if not patient)
  - `/` root route auto-redirects based on user role in localStorage
  - All unknown routes show a custom 404 page
- **Data Persistence:**
  - All data is stored in localStorage for a realistic, persistent SPA experience
  - On login, mockAPI data is loaded if not present
- **UI/UX:**
  - Consistent gradients, modals, and responsive layouts
  - Calendar view for admin to see appointments by month/week
  - File uploads (images, PDFs) for incidents
- **Modularity:**
  - Route guards, authentication, and utility functions are separated for maintainability

## Special Note + Challenges

1. This was my first time using Tailwind CSS in a project. Initially, making the app responsive was challenging, but after reading the documentation and adopting a mobile-first approach, I got comfortable and enjoyed the learning experience.

2. For the first commit, I did everything manually without any AI help. By the third commit, while building the admin dashboard, I got a bit tired and tried GitHub Copilot and GPT-4.1. At first, I didn't like Copilot's inline suggestions, but after using it in a few components, I found it very helpful as a co-pilot.

3. Since all data is managed in localStorage, I didn't find a real need to use Redux Toolkit or Context API for state management in this project.


At last, it was a good learning experience!
