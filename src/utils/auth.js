export function getUserFromLocalStorage() {
  const userStr = localStorage.getItem('user');
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {
    user = null;
  }
  return user;
}

export function isAdmin(user) {
  return user && user.role === 'Admin';
}

export function isPatient(user) {
  return user && user.role === 'Patient';
}
