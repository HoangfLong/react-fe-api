import { data } from "autoprefixer";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();
    const respond = await fetch("/api/v1/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await respond.json();

    if (!respond.ok) {
      setErrors(data);
      console.log(errors);
    } else {
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      navigate("/");
      console.log(data);
    }
  }

  return (
    <>
      <h1 className="title">Login</h1>

      <form onSubmit={handleLogin} className="" action="">

        {/* email */}
        <div>
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>

        {/* password */}
        <div>
          <input
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
           {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>

        <button className="primary-btn">Login</button>
      </form>
    </>
  );
}
