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


export default async function FetchApi(url,method,body,token,headers) {
    headers={"Content-Type": "application/json", ...headers};
    console.log(import.meta.env.VITE_BACKEND_URL);
    try {
        const response = await axios({
          url:import.meta.env.VITE_BACKEND_URL,
          method:'POST',
          data: {
            "url":url,
            "method":method,
            // "headers":headers,
            // "body":{...body}
          }
          
          // headers: {
          //   "Content-Type": "application/json",     // default
          //   ...(token ? `Bearer ${token}` : ""), // add token if provided
          //   ...headers                     // allow user to add additional headers
          // }
        });
        // console.log('hi');
        console.log(response);
        return response.data;
      } catch (error) {
        // console.error("API Request Error:", error);
        return error.response;
      }
  }
  
