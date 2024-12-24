import { useState } from "react";
import { emitAddEvent } from "../../../../socket/addEvent";
import { IAddEventDto } from "../../../../types/addNewEvent";

const AddEvent: React.FC<{
  latitude: number;
  longitude: number;
  onClose: () => void;
}> = ({ latitude, longitude, onClose }) => {
  const [formData, setFormData] = useState<IAddEventDto>({
    date: new Date(),
    country: "",
    region: "",
    city: "",
    attacktype: "",
    gname: "A single hazard",
    nkill: 0,
    nwound: 0,
    targtype: "",
    weaptype1_txt: "",
    nperps: 1,
    summary: "",
    latitude,
    longitude,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await emitAddEvent(formData);
      alert("Event added successfully!");
      onClose();
    } catch (err) {
      alert("failed to add event: " + err);
    }
  };
  const handleNumberChange = (field: keyof IAddEventDto, value: number) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="relative to-blue-700 p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto z-50">
      <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-center">Add New Event</h2>

        <div className="relative">
          <input
            type="date"
            name="date"
            value={formData.date ? formData.date.toString() : ""}
            onChange={handleInputChange}
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={formData.region}
            onChange={handleInputChange}
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            name="attacktype"
            placeholder="Attack Type"
            value={formData.attacktype}
            onChange={handleInputChange}
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            name="gname"
            placeholder="Group Name"
            value={formData.gname}
            onChange={handleInputChange}
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>

        <div className="relative">
          <input
            type="number"
            name="nwound"
            min="0"
            placeholder="Number of Wounded"
            value={formData.nwound === 0 ? "" : formData.nwound}
            onChange={(e) =>
              handleNumberChange("nwound", Number(e.target.value))
            }
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>
        <div className="relative">
          <input
            type="number"
            name="nkill"
            min="0"
            placeholder="Number of Wounded"
            value={formData.nkill === 0 ? "" : formData.nkill}
            onChange={(e) =>
              handleNumberChange("nkill", Number(e.target.value))
            }
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            name="targtype"
            placeholder="Target Type"
            value={formData.targtype}
            onChange={handleInputChange}
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            name="weaptype1_txt"
            placeholder="Weapon Type"
            value={formData.weaptype1_txt}
            onChange={handleInputChange}
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>

        <div className="relative">
          <input
            type="number"
            name="nperps"
            min="0"
            placeholder="Number of Perpetrators"
            value={formData.nperps === 1 ? "" : formData.nperps}
            onChange={(e) =>
              handleNumberChange("nperps", Number(e.target.value))
            }
            className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>

        <div className="relative">
          <textarea
            name="summary"
            placeholder="Event Summary"
            value={formData.summary}
            onChange={handleInputChange}
            className="w-full p-2 text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Event
        </button>
      </form>
    </div>
  );
};
export default AddEvent;
