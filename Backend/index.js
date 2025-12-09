const express=require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());  

app.use(cors()); 

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.get("/api/health", (req, res) => {
  res.json({ status: "Proxy Backend Running on Vercel ✅" });
});

app.post("/api/proxy", async (req, res) => {
    
    try {
        const {
          url,
          method = "GET", 
          headers = {},
          body = {},
          params = {}
        } = req.body;
        // ✅ VALIDATION
        
        if (!url) {
            
          return res.status(400).json({ status: "Bad Request",
            headers:"",
            data: "Provide Correct URL" });
        }
        // console.log('hi', url)
    
        // ✅ AXIOS STANDARD REQUEST
        const response = await axios({
          url:url,
          method:method,
        //   headers:headers,
        //   params:params,           // query parameters
        //   data: body,       // request body
        //   timeout: 30000,   // 30s timeout for slow APIs
        //   validateStatus: () => true // ✅ ALWAYS return response (even 4xx, 5xx)
        });
        
    
        
        // console.log(response.data)
        // ✅ ALWAYS RETURN API RESPONSE TO FRONTEND
        return res.status(response.status).json({
          status: response.status,
          headers: response.headers,
          data: response.data
        });
    
      } catch (error) {
        console.error("Proxy Error:", error?.response?.data || error.message);

    return res.status(error?.response?.status || 500).json({
      error: error?.response?.data || "Proxy Server Failed"
        });
      }

      
});
app.listen(5134,()=>{
  console.log("Server Running")
})
module.exports=app;




