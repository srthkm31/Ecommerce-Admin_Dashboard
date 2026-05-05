import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          className="w-full bg-black text-white py-2 rounded"
          onClick={async () => {
            try {
              const response = await axios.post(
                "http://localhost:5000/api/users/login",
                {
                  email: email,
                  password: password,
                },
              );
              console.log(response.data);
              const token = response.data.token;
              localStorage.setItem("token", token);
              alert("Succesfull Login");
              navigate("/");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Login
        </button>

        <button
          className="text-sm text-center mt-4 text-gray-600 border p-2 rounded-xl cursor-pointer"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Don’t have an account? Signup
        </button>
      </div>
    </div>
  );
};
