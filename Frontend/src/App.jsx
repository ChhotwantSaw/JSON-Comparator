import { useState } from "react";
import FetchApi from './FetchApi';
import CompareJSON from './CompareJSON.jsx';
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({
    endpoint1: "",
    token1: "",
    headers1: "",
    method1: "GET",
    body1: "",
    response1: {},

    endpoint2: "",
    token2: "",
    headers2: "",
    method2: "GET",
    body2: {},
    response2: {},

    compare:{}
  });
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitIBM=async(column)=>{
    try{
      // console.log('body1',form.body1)
    const res=await FetchApi(form[`endpoint${column}`],form[`method${column}`],form[`body${column}`],form[`token${column}`],form[`headers${column}`]);
    // console.log(res);
    setForm((prev) => ({ ...prev, [`response${column}`]: res }));
    } catch(err){
      setForm((prev) => ({
              ...prev,
              [`response${column}`]: "Error: " + err.message,
            }));
    }
  }

  const handleSubmitKong=async(column)=>{
    try{
    const res=await FetchApi(form[`endpoint${column}`],form[`method${column}`],form[`body${column}`],form[`token${column}`],form[`headers${column}`]);
    // console.log(res);
    setForm((prev) => ({ ...prev, [`response${column}`]: res }));
    } catch(err){
      setForm((prev) => ({
        ...prev,
        [`response${column}`]: "Error: " + err.message,
      }));
    }
  }



  // const sendRequest = async (column) => {
  //   let endpoint = form[`endpoint${column}`];
  //   let token = form[`token${column}`];
  //   let headersJSON = form[`headers${column}`];
  //   let method = form[`method${column}`];
  //   let body = form[`body${column}`];

  //   let parsedHeaders = {};

  //   // Safely parse JSON headers
  //   try {
  //     parsedHeaders = headersJSON ? JSON.parse(headersJSON) : {};
  //   } catch (err) {
  //     setForm((prev) => ({
  //       ...prev,
  //       [`response${column}`]: "Invalid Header JSON: " + err.message,
  //     }));
  //     return;
  //   }

  //   // Final headers
  //   const finalHeaders = {
  //     "Content-Type": "application/json",
  //     Authorization: token ? `Bearer ${token}` : "",
  //     ...parsedHeaders,
  //   };

  //   try {
  //     const options = { method, headers: finalHeaders };

  //     if (method === "POST") options.body = body;

  //     const res = await fetch(endpoint, options);
  //     const data = await res.text();

  //     setForm((prev) => ({ ...prev, [`response${column}`]: data }));
  //   } catch (err) {
  //     setForm((prev) => ({
  //       ...prev,
  //       [`response${column}`]: "Error: " + err.message,
  //     }));
  //   }
  // };

  // setForm.response1=
  // console.log(form);

  // setForm((prev) => ({ ...prev, [`response${column}`]: res }));
console.log(form.compare);
  const handleCompare = function(){
     const result=CompareJSON(form.response1,form.response2);
     setForm((prev)=>({...prev,['compare']:result}))
  }

  return (
    <div>
      <div style={styles.wrapper}>

        {/* IBM Datapower */}
        <div style={styles.labeledColumn}>
          <h3 style={styles.title}>IBM Datapower</h3>

          <div style={styles.column}>
            <label>Endpoint 1</label>
            <input
              name="endpoint1"
              placeholder="Enter Endpoint"
              value={form.endpoint1}
              onChange={handleChange}
              style={styles.input}
            />

            <label>Token 1</label>
            <input
              name="token1"
              placeholder="Enter Token 1"
              value={form.token1}
              onChange={handleChange}
              style={styles.input}
            />

            <label>Headers 1 (JSON)</label>
            <textarea
              name="headers1"
              placeholder='{"x-id":"123"}'
              value={form.headers1}
              onChange={handleChange}
              style={styles.textarea}
            />

            <label>HTTP Method</label>
            <select
              name="method1"
              value={form.method1}
              onChange={handleChange}
              style={styles.input}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>

            {form.method1 === "POST" && (
              <>
                <label>Body</label>
                <textarea
                  name="body1"
                  placeholder="Enter Body (JSON)"
                  value={form.body1}
                  onChange={handleChange}
                  style={styles.textarea}
                />
              </>
            )}

            <button style={styles.sendBtn} onClick={() =>handleSubmitIBM(1) }>
              Send
            </button>

            {Object.keys(form.response1).length !== 0 && (
              <div style={styles.responseBox}>
                <strong>Response:</strong>
                <pre>{JSON.stringify(form.response1,null,2)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Ar Kong */}
        <div style={styles.labeledColumn}>
          <h3 style={styles.title}>Ar Kong</h3>

          <div style={styles.column}>
            <label>Endpoint 2</label>
            <input
              name="endpoint2"
              placeholder="Enter Endpoint 2"
              value={form.endpoint2}
              onChange={handleChange}
              style={styles.input}
            />

            <label>Token 2</label>
            <input
              name="token2"
              placeholder="Enter Token 2"
              value={form.token2}
              onChange={handleChange}
              style={styles.input}
            />

            <label>Headers 2 (JSON)</label>
            <textarea
              name="headers2"
              placeholder='{"x-id":"123"}'
              value={form.headers2}
              onChange={handleChange}
              style={styles.textarea}
            />

            <label>HTTP Method</label>
            <select
              name="method2"
              value={form.method2}
              onChange={handleChange}
              style={styles.input}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>

            {form.method2 === "POST" && (
              <>
                <label>Body</label>
                <textarea
                  name="body2"
                  placeholder="Enter Body (JSON)"
                  value={form.body2}
                  onChange={handleChange}
                  style={styles.textarea}
                />
              </>
            )}

            <button style={styles.sendBtn} onClick={() => handleSubmitKong(2)}>
              Send
            </button>

            {Object.keys(form.response2).length !== 0  && (
              <div style={styles.responseBox}>
                <strong>Response:</strong>
                <pre>{JSON.stringify(form.response2,null,2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.compareContainer}>
        <button style={styles.compareBtn} onClick={()=>handleCompare()}>
          Compare
        </button>
        {Object.keys(form.compare ).length !== 0 && (
              <div style={{width:'60%', border: "1px solid #ccc", marginTop: "10px",
              padding: "10px", whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxHeight: "700px",
              overflowY: "auto",}}>
                <strong>Comparison:</strong>
                <pre>{JSON.stringify(form.compare,null,2)}</pre>
              </div>
            )}
      </div>
    </div>
    
)
            }         
            
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
  },
  labeledColumn: {
    width: "40%",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fafafa",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  sendBtn: {
    padding: "10px",
    background: "#28a745",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
  },
  compareBtn: {
    padding: "12px 25px",
    background: "#007bff",
    borderRadius: "8px",
    border: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    maxWidth:'200px'
  },
  compareContainer: {
    marginTop: "20px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
  },
  responseBox: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    background: "white",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxHeight: "200px",
    overflowY: "auto",
  },
};




