const API_URL = process.env.REACT_APP_BACKEND_API_URL;

class AuthService {
  async login(username, password) {
    try {
      const response = await fetch("https://r6y2zwdd9g.execute-api.eu-central-1.amazonaws.com/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      console.log('Success:', data);
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  // register(email, password) {
  //   return axios.post(API_URL + "signup", {
  //     email,
  //     password
  //   });
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();