import { data } from "autoprefixer";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();
    const respond = await fetch("/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await respond.json();

    if (!respond.ok) {
      setErrors(data);
    } else {
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      navigate("/");
      console.log(data);
    }
  }

  return (
    <>
      <h1 className="title">Register</h1>

      <form onSubmit={handleRegister} className="" action="">
        {/* first name */}
        <div>
          <input
            type="text"
            placeholder="first name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          {errors.first_name && <p className="error">{errors.first_name[0]}</p>}
        </div>

        {/* last name */}
        <div>
          <input
            type="text"
            placeholder="last name"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          {errors.last_name && <p className="error">{errors.last_name[0]}</p>}
        </div>

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
        </div>

        {/* phone */}
        <div>
          <input
            type="text"
            placeholder="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        {/* gender */}
        <div>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="form-select"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="error">{errors.gender[0]}</p>}
        </div>

        {/* date of birth */}
        <div>
          <input
            type="date"
            placeholder="Date of Birth"
            value={formData.date_of_birth}
            onChange={(e) =>
              setFormData({ ...formData, date_of_birth: e.target.value })
            }
          />
          {errors.date_of_birth && (
            <p className="error">{errors.date_of_birth[0]}</p>
          )}
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
        </div>

        {/* password confirmed */}
        <div>
          <input
            type="password"
            placeholder="password confirmed"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <button className="primary-btn">Register</button>
      </form>
    </>
  );
}
