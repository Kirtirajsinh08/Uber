// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebookF,
//   faInstagram,
//   faTwitter,
// } from "@fortawesome/free-brands-svg-icons";

// const Footer = () => {
//   const navigate = useNavigate();

//   const navigateToBooking = () => {
//     navigate("/booking");
//   };

//   return (
//     <footer className="bg-gray-100 text-gray-600 py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <div className="flex flex-col items-center md:items-start">
//             <Link to="/">
//               <img src='uber-logo.svg' alt="LOGO" className="w-32 h-16 object-contain" />
//             </Link>
//             <p className="mt-4 text-sm text-center md:text-left">
//               Connecting you to what matters most
//             </p>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//               Company
//             </h2>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-gray-800 transition-colors duration-300"
//                 >
//                   About us
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//               Products
//             </h2>
//             <ul className="space-y-2">
//               <li className="font-semibold text-lg cursor-pointer">
//                 <button onClick={navigateToBooking}>Ride</button>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-gray-800 transition-colors duration-300"
//                 >
//                   Drive
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//               Global Citizenship
//             </h2>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-gray-800 transition-colors duration-300"
//                 >
//                   Safety
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-sm">&copy; 2024 Cabify. All rights reserved.</p>
//           <div className="flex space-x-4 mt-4 md:mt-0">
//             <a
//               href="https://facebook.com"
//               className="text-gray-600 hover:text-blue-600 transition duration-300"
//             >
//               <FontAwesomeIcon icon={faFacebookF} className="text-2xl" />
//             </a>
//             <a
//               href="https://instagram.com"
//               className="text-gray-600 hover:text-pink-600 transition duration-300"
//             >
//               <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
//             </a>
//             <a
//               href="https://twitter.com"
//               className="text-gray-600 hover:text-blue-400 transition duration-300"
//             >
//               <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';


const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: ['About us', 'Our offerings', 'Newsroom', 'Investors', 'Blog', 'Careers'],
    },
    {
      title: 'Products',
      links: ['Ride', 'Drive', 'Deliver', 'Eat', 'Uber for Business', 'Uber Freight', 'Gift cards'],
    },
    {
      title: 'Global citizenship',
      links: ['Safety', 'Diversity and Inclusion', 'Sustainability'],
    },
    {
      title: 'Travel',
      links: ['Reserve', 'Cities'],
    },
  ];

  return (
    <footer className="bg-red-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 justify justify-center">
          <img src='./images/Logo2.png' className='bg-white h-32' />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold mb-4">{section.title}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link} className="mb-2">
                    <a href="#" className="text-white hover:bg-gray-500">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between pt-8 border-t border-gray-700">
          <div className="flex space-x-4 mb-4 lg:mb-0">
            <div>
              <i className="fa-brands fa-facebook"></i>
            </div>
            <div>
              <i className="fa-brands fa-instagram"></i>
            </div>
            <div>
              <i className="fa-brands fa-youtube"></i>
            </div>
            <div>
              <i className="fa-brands fa-linkedin"></i>
            </div>
            <div>
              <i className="fa-brands fa-twitter"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;