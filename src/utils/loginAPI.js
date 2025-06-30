export function login(email, password, role) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password && u.role === role
      );

      if (user) {
        resolve({ success: true, user });
      } else {
        reject({ success: false, message: "Invalid credentials or role" });
      }
    }, 1000);
  });
}