import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateTour() {
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCreateTour = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    // Thêm các field
    formData.append("title", form.title.value);
    formData.append("description", form.description.value);
    formData.append("destinations", form.destinations.value);
    formData.append("number_of_days", Number(form.number_of_days.value));
    formData.append("start_time", form.start_time.value.replace("T", " "));
    formData.append("end_time", form.end_time.value.replace("T", " "));
    formData.append("schedule", form.schedule.value);
    formData.append("number_of_guests", Number(form.number_of_guests.value));
    formData.append("available_seats", Number(form.available_seats.value));
    formData.append("status", form.status.value);
    formData.append("price", Number(form.price.value));

    // Thêm file(s)
    Array.from(form['images[]'].files).forEach((file) => {
      formData.append("images[]", file);
    });

    try {
      const response = await axios.post("/api/v1/tours/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Axios tự thêm boundary
        },
      });
      console.log("Tour created successfully:", response.data);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Validation errors:", error.response.data);
        setErrors(error.response.data.errors || {});
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h1 className="title">Create New Tour</h1>
      <form className="space-y-4" onSubmit={handleCreateTour}>
        <div>
          <label className="block">Title</label>
          <input type="text" name="title" />
        </div>

        <div>
          <label className="block">Description</label>
          <textarea name="description"></textarea>
        </div>

        <div>
          <label className="block">Destinations</label>
          <input type="text" name="destinations" />
        </div>

        <div>
          <label className="block">Images</label>
          <input type="file" name="images[]" multiple className="border p-2 w-full" />
        </div>

        <div>
          <label className="block">Number of Days</label>
          <input type="number" name="number_of_days" defaultValue={1} />
        </div>

        <div>
          <label className="block">Start Time</label>
          <input type="datetime-local" name="start_time" />
        </div>

        <div>
          <label className="block">End Time</label>
          <input type="datetime-local" name="end_time" />
        </div>

        <div>
          <label className="block">Schedule</label>
          <textarea name="schedule"></textarea>
        </div>

        <div>
          <label className="block">Number of Guests</label>
          <input type="number" name="number_of_guests" defaultValue={1} />
        </div>

        <div>
          <label className="block">Available seats</label>
          <input type="number" name="available_seats" defaultValue={1} />
        </div>

        <div>
          <label className="block">Status</label>
          <select name="status" defaultValue="active">
            <option value="active">Active</option>
            <option value="canceled">Canceled</option>
            <option value="finished">Finished</option>
          </select>
        </div>

        <div>
          <label className="block">Price</label>
          <input type="number" step="0.01" name="price" defaultValue={0} />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </>
  );
}
