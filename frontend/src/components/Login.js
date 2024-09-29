import { useRef, useState, useContext } from "react";
import { authenticatedContext } from "./context";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';
import NotFound from "./Notfound";

const Login = ({ isDriver }) => {
    const navigator = useNavigate();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const { authenticated, setAuthenticated } = useContext(authenticatedContext);

    const handleSubmit = async () => {
        try {
            const result = await axios.post("http://localhost:8000/login/", { 'email': emailField, 'password': passwordField });
            if (result.data.error) {
                toast.error("Invalid Email or Password");
            } else {
                toast.success('Logged In Successfully');
                localStorage.setItem("user_id", result.data.user_id);
                setAuthenticated(true);
                result.data.type === 'rider' ? navigator('/bookride') : navigator('/driverdashboard');
            }
        } catch (e) {
            toast.error('Error In Axios');
        }
    };

    return (
        <>
        {authenticated ? <NotFound /> :
            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        src='./images/bg.mp4'
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Content (Form and Other Video) */}
                <div className="relative z-10 w-full max-w-4xl flex bg-white bg-opacity-90 shadow-2xl rounded-lg overflow-hidden">
                    {/* Video Section (on top of background) */}
                    <div className="w-1/2 bg-gray-900 flex items-center justify-center">
                        <video
                            src='./images/Intro.mp4'
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Login Form Section */}
                    <div className="w-1/2 p-8 space-y-6">
                        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
                            Log In
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
                            Sign In
                        </button>

                        <Link to="/login" className="text-center mt-2 block text-blue-700">Create an Account</Link>
                    </div>
                </div>
            </div>
        }
        </>
    );
};

export default Login;
