export const USER_KEY = "user";
export const PROFILE_URL = new URL('../assets/profile.png', import.meta.url);

export const PATIENT_NAV_ITEMS = [
{ name: "Dashboard", to: "/patient" }
];

export const ADMIN_NAV_ITEMS = [
  { name: "Dashboard", to: "/admin" },
  { name: "Patients", to: "/admin/patients" },
  { name: "Incidents", to: "/admin/incidents" },
  { name: "Calender View", to: "/admin/calendar-view" },
];
