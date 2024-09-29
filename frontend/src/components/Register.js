import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Signup from "./Signup";
import NotFound from './Notfound';
import { authenticatedContext } from "./context";

const Register = ({ isDriver }) => {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [next, setNext] = useState(false);
  const navigator = useNavigate();

  const handleSubmit = async () => {
    try {
      const result = await axios.post("http://localhost:8000/check-email/", { 'email': emailField });
      if (result.data.exists) {
        toast.error("Email Already Exists");
      } else if (!result.data.exists) {
        toast.success('Email Accepted');
        setNext(true);
      }
    } catch (e) {
      toast.error('Error In Axios');
    }
  };

  const { authenticated } = useContext(authenticatedContext);

  return (
    <>
      {authenticated ? <NotFound /> :
        <>
          {next ? <Signup email={emailField} password={passwordField} /> :
            <div className="relative min-h-screen flex items-center justify-center">
              {/* Background Video */}
              <div className="absolute inset-0 z-0">
                <video
                  src="./images/bg2.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="relative w-full max-w-4xl flex bg-white bg-opacity-90 shadow-2xl rounded-lg overflow-hidden z-10">
                {/* Video Section */}
                <div className="w-1/2 bg-gray-900 flex items-center justify-center">
                  <video
                    src='./images/Intro2.mp4'
                    className="w-full h-full"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/path/to/your/register-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Registration Form Section */}
                <div className="w-1/2 p-8 space-y-6">
                  <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
                    Register
                  </h2>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      type="text"
                      placeholder="Enter Email"
                      value={emailField}
                      onChange={(e) => setEmailField(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      type="password"
                      placeholder="Enter Password"
                      value={passwordField}
                      onChange={(e) => setPasswordField(e.target.value)}
                    />
                  </div>

                  <button
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={handleSubmit}
                  >
                    Register
                  </button>

                  <Link to="/login" className="text-center mt-2 block text-blue-700">
                    Already have an account?
                  </Link>
                </div>
              </div>
            </div>
          }
        </>
      }
    </>
  );
};

export default Register;
