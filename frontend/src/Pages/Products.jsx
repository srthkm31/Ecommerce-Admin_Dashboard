import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const token = localStorage.getItem("token");
  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      role = decoded.role;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">All Products</h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
          value={search}
          onChange={async (e) => {
            const value = e.target.value;
            setSearch(value);

            if (value.trim() === "") {
              const res = await axios.get("http://localhost:5000/api/products");
              setProducts(res.data);
            }
          }}
          onKeyDown={async (e) => {
            try {
              if (e.key == "Enter") {
                const response = await axios.get(
                  `http://localhost:5000/api/products/search?name=${search}`,
                );

                setProducts(response.data);
              }
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </div>
      {localStorage.getItem("token") ? (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded m-5"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded m-5"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      )}
      {role === "ADMIN" ? (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded m-5"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </button>
      ) : (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded m-5"
          onClick={() => {
            navigate("/orders");
          }}
        >
          Show my Orders
        </button>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
          >
            <h2 className="font-medium text-lg">{p.name}</h2>
            <p className="text-gray-600">₹{p.price}</p>
            <p className="text-sm text-gray-500">Stock: {p.stock}</p>

            {role === "USER" && (
              <button
                className="mt-3 w-full bg-black text-white py-2 rounded"
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    navigate("/login");
                    return;
                  }
                  try {
                    await axios.post(
                      "http://localhost:5000/api/orders",
                      {
                        items: [{ productId: p.id, quantity: 1 }],
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );
                    alert("Order placed successfully");
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Buy
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
