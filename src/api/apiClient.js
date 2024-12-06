// apiClient.js
const apiClient = {
  baseURL: "http://localhost:5000", // Your base API URL
  headers: {
    "Content-Type": "application/json", // Ensures that your request body is treated as JSON
  },

  // Generic request method that supports GET, POST, etc.
  async request(method, url, data = null) {
    const options = {
      method: method, // The HTTP method (GET, POST, etc.)
      headers: this.headers, // Request headers
    };

    if (data) {
      options.body = JSON.stringify(data); // If data is provided, stringify it and attach to the body
    }

    try {
      const response = await fetch(`${this.baseURL}${url}`, options); // Send the request

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle non-200 status codes
      }

      return await response.json(); // Parse and return JSON response
    } catch (error) {
      console.error("API error:", error);
      throw error; // Throw the error to be caught in the calling code
    }
  },

  // GET method
  async get(url) {
    return this.request("GET", url);
  },

  // POST method
  async post(url, data) {
    return this.request("POST", url, data); // Calls the request method with POST and the data
  },
};

export default apiClient;
