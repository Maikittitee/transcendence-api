export class A_API {
  constructor() {
    if (new.target === A_API) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.defaultOptions = {
      credentials: 'include', // ตัวอย่างการตั้งค่า Default
    };
  }

  async fetch_data() {
    this.url = this.set_url();
    this.method = this.set_method();
    this.headers = this.set_header();
    this.body = this.set_body();

    this.pre_fetch(); // Optional validation logic

    let responseData;
    try {
      const options = {
        method: this.method,
        headers: this.headers,
      };
      if (this.body) {
        options.body = this.body;
      }
      console.debug("Request Details:", { url: this.url, ...options });

      const response = await fetch(this.url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      responseData = await response.json(); // Store the response data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }

    this.after_fetch(responseData); // Optional processing logic
    return responseData;
  }

  set_url() {
    throw new Error("set_url() must be implemented in the subclass of A_API.");
  }

  set_method() {
    throw new Error("set_method() must be implemented in the subclass of A_API.");
  }

  set_header() {
    return this.method === 'GET' || this.method === 'DELETE'
    ? {}
    : { 'Content-Type': 'application/json' }; // Default headers
  }

  set_body() {
    return null; // Default for GET/DELETE requests
  }

  pre_fetch() {
    // Optional validation logic
  }

  after_fetch(responseData) {
    // Optional processing logic
  }

  add_query_params(url, params) {
    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.append(key, value);
    });
    return urlObj.toString();
  }
}