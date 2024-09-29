import { useState } from "react";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import axios from "axios";
import { authenticatedContext } from "./context";
import { useContext } from "react";

const Signup = ({ email, password }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("rider");
  const [drop, setDrop] = useState(false);
  const navigator = useNavigate()
  const { authenticated, setAuthenticated } = useContext(authenticatedContext);


  const handleSubmit = async () => {
    try {
      const result = await axios.post("http://localhost:8000/register/", {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        user_type: type,
      });
      if (result.data.error) {
        toast.error(result.data.error);
      } else if (result.data.message) {
        toast.success(result.data.message);
        navigator( type === 'rider' ? "/bookride" : "/driverdashboard")
        console.log(result.data)
        localStorage.setItem("token" , result.data.token)
        localStorage.setItem("user_id", result.data.user_id);
        setAuthenticated(true)
        
      }
    } catch (e) {
      console.log(e);
      toast.error("Error In Axios"); 
    }
  };

  return (
    
      <div className="relative w-full max-w-4xl flex bg-white bg-opacity-90 shadow-2xl rounded-lg overflow-hidden z-10">
      <form
        className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Sign Up
        </h2>

        <div>
          <label
            htmlFor="firstname"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstname"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor="lastname"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastname"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>

        <div>
          <label
            htmlFor="phoneNo"
            className="block text-sm font-medium text-gray-700"
          >
            Phone no.
          </label>
          <input
            id="phoneNo"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>

        <div className="relative inline-block w-full">
          <label
            htmlFor="phoneNo"
            className="block text-sm font-medium text-gray-700"
          >
            Type of Account
          </label>
          <button
            className="bg-gray-50 text-gray-400 text-left w-full mt-2 border-[1px] border-gray-300 px-4 py-2 rounded-lg "
            // onBlur={() => setDrop(false)}
            onClick={() => setDrop(!drop)}
          >
            {type.toUpperCase()}
          </button>
          <div
            className={`absolute ${
              drop ? "" : "hidden"
            } mt-2 w-full rounded-lg shadow-lg bg-white`}
          >
            <ul className="py-2 text-gray-700">
              <li
                className="block px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setType("rider");
                  setDrop(false);
                }}
              >
                Rider
              </li>
              <li
                className="block px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setType("driver");
                  setDrop(false);
                }}
              >
                Driver
              </li>
            </ul>
          </div>
        </div>

        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      </div>
  );
};

export default Signup;
