// apiClient.js
const apiClient = {
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://lessonapp-3144-backend.onrender.com",

  headers: {
    "Content-Type": "application/json",
  },

  // Generic request method that supports GET, POST, etc.
  async request(method, url, data = null) {
    const options = {
      method: method,
      headers: this.headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${url}`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },

  // GET method
  async get(url) {
    return this.request("GET", url);
  },

  // POST method
  async post(url, data) {
    return this.request("POST", url, data);
  },
};

export default apiClient;
