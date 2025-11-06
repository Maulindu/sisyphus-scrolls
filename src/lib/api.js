const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class AuthService {
  async register(username, email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  }

  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

class UserService {
  async addFavorite(philosopherSlug) {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/user/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ philosopherSlug })
    });
    
    if (!response.ok) throw new Error('Failed to add favorite');
    return response.json();
  }

  async removeFavorite(philosopherSlug) {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/user/favorites/${philosopherSlug}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to remove favorite');
    return response.json();
  }

  async updateProgress(philosopherSlug, completed) {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/user/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ philosopherSlug, completed })
    });
    
    if (!response.ok) throw new Error('Failed to update progress');
    return response.json();
  }

  async getProfile() {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  }
}

export const authService = new AuthService();
export const userService = new UserService();