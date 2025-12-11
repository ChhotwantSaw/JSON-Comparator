import axios from 'axios';


/**
* Universal HTTP request function using Axios
* 
* @param {string} url - API endpoint
* @param {string} method - GET, POST, PUT, DELETE
* @param {object} body - Request body (optional)
* @param {string} token - Bearer token (optional)
* @param {object} extraHeaders - Additional headers (optional)
*/


export default async function FetchApi(url, method, body, token, headers, params) {
  let parsedHeaders = {};
  let parsedParams = {};

  try {
    parsedHeaders = headers ? JSON.parse(headers) : {};
  } catch {
    console.error("Invalid headers JSON");
  }

  try {
    parsedParams = params ? JSON.parse(params) : {};
  } catch {
    console.error("Invalid params JSON");
  }
  

  headers = { "Content-Type": "application/json", ...headers };
  // console.log(import.meta.env.VITE_BACKEND_URL);
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/proxy`,
      method: "POST",
      data: {
        url,
        method,
        headers: parsedHeaders,
        params: parsedParams,
        body,
        token
      }
    });
    
    // console.log('hi');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    return error.response;
  }
}

