// import {
//   Cloud,
//   Crown,
//   Globe,
//   Mail,
//   MapPin,
//   Phone,
//   Star,
//   User,
//   X
// } from 'lucide-react';
// import { useEffect, useState } from 'react';

// export default function EnhancedUserProfile() {
//   const [isOpen, setIsOpen] = useState(false);
//   const token = localStorage.getItem("access");
//   const [userData, setUserData] = useState<any>(null);


  
//   useEffect(() => {
//   const fetchUserProfile = async () => {
//     const token = localStorage.getItem("access");
//     if (!token) return;

//     try {
//       const res = await fetch(`https://tradegptv2backend-production.up.railway.app/api/chat/user/?token=${token}`);
//       const data = await res.json();
//       if (!data.error) {
//         setUserData({
//           username: data.username,
//           email: data.email,
//           subscription: data.subscription_status,
//           country: data.country,
//           state: data.state,
//           phone: data.phone_number,
//           avatar: data.profile_photo,
//           weather: {
//             temperature: 24,
//             condition: "Cloudy",
//             time: "2:30 PM",
//           }
//         });
//       }
//     } catch (err) {
//       console.error("Failed to fetch user profile:", err);
//     }
//   };

//   fetchUserProfile();
// }, []);

//   if (!userData) return null;

//   const ProfileCard = () => (
//     <div className="flex items-center gap-3 cursor-pointer hover:bg-[#2e2e2e] p-2 rounded-lg transition-colors"
//          onClick={() => setIsOpen(true)}>
//       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//         <User className="w-4 h-4 text-white" />
//       </div>
//       <div className="flex-1">
//         <div className="font-medium text-sm">{userData.username}</div>
//         <div className="flex items-center gap-2 text-xs text-gray-400">
//           <span>{userData.weather.temperature}°C</span>
//           <span>|</span>
//           <div className="flex items-center gap-1">
//             <Cloud className="w-3 h-3" />
//             <span>{userData.weather.condition}</span>
//           </div>
//           <span>|</span>
//           <span>{userData.weather.time}</span>
//         </div>
//       </div>
//     </div>
//   );

//   const ProfileModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
//         {/* Header */}
//         <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 px-6 py-8">
//           <button 
//             onClick={() => setIsOpen(false)}
//             className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
          
//           <div className="text-center">
//             <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-4 border-white border-opacity-30">
//               <User className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-1">User Profile</h2>
//             <p className="text-blue-100 text-sm">Manage your account details</p>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* User Info Section */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                 <User className="w-5 h-5 text-blue-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Username</p>
//                 <p className="font-semibold text-gray-900">{userData.username}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                 <Mail className="w-5 h-5 text-green-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
//                 <p className="font-semibold text-gray-900">{userData.email}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
//                 <Crown className="w-5 h-5 text-purple-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Subscription</p>
//                 <div className="flex items-center gap-2">
//                   <p className="font-semibold text-gray-900 capitalize">{userData.subscription}</p>
//                   <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                     <Star className="w-3 h-3" />
//                     <span>PRO</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Location Section */}
//           <div className="border-t pt-6">
//             <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
//               <Globe className="w-4 h-4" />
//               Location Details
//             </h3>
//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <MapPin className="w-4 h-4 text-gray-400" />
//                 <div>
//                   <p className="text-xs text-gray-500">Country</p>
//                   <p className="font-medium text-gray-900">{userData.country}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <MapPin className="w-4 h-4 text-gray-400" />
//                 <div>
//                   <p className="text-xs text-gray-500">State</p>
//                   <p className="font-medium text-gray-900">{userData.state}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Section */}
//           <div className="border-t pt-6">
//             <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
//               <Phone className="w-4 h-4" />
//               Contact Information
//             </h3>
//             <div className="flex items-center gap-3">
//               <Phone className="w-4 h-4 text-gray-400" />
//               <div>
//                 <p className="text-xs text-gray-500">Phone</p>
//                 <p className="font-medium text-gray-900">{userData.phone}</p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <ProfileCard />
//       {isOpen && <ProfileModal />}
//     </>
//   );
// }

// import React, { useState } from 'react';
// import { 
//   User, 
//   Mail, 
//   MapPin, 
//   Phone, 
//   Crown, 
//   Cloud, 
//   X,
//   Edit3,
//   Globe,
//   Star
// } from 'lucide-react';

// export default function EnhancedUserProfile() {
//   const [isOpen, setIsOpen] = useState(false);
  
//   // Mock user data based on the profile shown
//   const userData = {
//     username: "prode",
//     email: "prode@gmail.com",
//     subscription: "platinum",
//     country: "American Samoa",
//     state: "ejrhrstn",
//     phone: "8457635",
//     avatar: null,
//     weather: {
//       temperature: 24,
//       condition: "Cloudy",
//       time: "2:30 PM"
//     }
//   };

//   const ProfileCard = () => (
//     <div className="flex items-center gap-3 cursor-pointer hover:bg-[#2e2e2e] p-2 rounded-lg transition-colors"
//          onClick={() => setIsOpen(true)}>
//       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//         <User className="w-4 h-4 text-white" />
//       </div>
//       <div className="flex-1">
//         <div className="font-medium text-sm">{userData.username}</div>
//         <div className="flex items-center gap-2 text-xs text-gray-400">
//           <span>{userData.weather.temperature}°C</span>
//           <span>|</span>
//           <div className="flex items-center gap-1">
//             <Cloud className="w-3 h-3" />
//             <span>{userData.weather.condition}</span>
//           </div>
//           <span>|</span>
//           <span>{userData.weather.time}</span>
//         </div>
//       </div>
//     </div>
//   );

//   const ProfileModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
//         {/* Header */}
//         <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 px-6 py-8">
//           <button 
//             onClick={() => setIsOpen(false)}
//             className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
          
//           <div className="text-center">
//             <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-4 border-white border-opacity-30">
//               <User className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-1">User Profile</h2>
//             <p className="text-blue-100 text-sm">Manage your account details</p>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* User Info Section */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                 <User className="w-5 h-5 text-blue-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Username</p>
//                 <p className="font-semibold text-gray-900">{userData.username}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                 <Mail className="w-5 h-5 text-green-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
//                 <p className="font-semibold text-gray-900">{userData.email}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
//                 <Crown className="w-5 h-5 text-purple-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Subscription</p>
//                 <div className="flex items-center gap-2">
//                   <p className="font-semibold text-gray-900 capitalize">{userData.subscription}</p>
//                   <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                     <Star className="w-3 h-3" />
//                     <span>PRO</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Location Section */}
//           <div className="border-t pt-6">
//             <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
//               <Globe className="w-4 h-4" />
//               Location Details
//             </h3>
//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <MapPin className="w-4 h-4 text-gray-400" />
//                 <div>
//                   <p className="text-xs text-gray-500">Country</p>
//                   <p className="font-medium text-gray-900">{userData.country}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <MapPin className="w-4 h-4 text-gray-400" />
//                 <div>
//                   <p className="text-xs text-gray-500">State</p>
//                   <p className="font-medium text-gray-900">{userData.state}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Section */}
//           <div className="border-t pt-6">
//             <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
//               <Phone className="w-4 h-4" />
//               Contact Information
//             </h3>
//             <div className="flex items-center gap-3">
//               <Phone className="w-4 h-4 text-gray-400" />
//               <div>
//                 <p className="text-xs text-gray-500">Phone</p>
//                 <p className="font-medium text-gray-900">{userData.phone}</p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <ProfileCard />
//       {isOpen && <ProfileModal />}
//     </>
//   );
// }

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Crown, 
  Cloud, 
  X,
  Edit3,
  Globe,
  Star,
  LogOut
} from 'lucide-react';

export default function EnhancedUserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  // Mock user data based on the profile shown
  const userData = {
    username: "prode",
    email: "prode@gmail.com",
    // subscription: "platinum",
    country: "American Samoa",
    // state: "ejrhrstn",
    phone: "8457635",
    avatar: null,
    weather: {
      temperature: 24,
      condition: "Cloudy",
      time: "2:30 PM"
    }
  };

  const handleLogout = () => {
    // Clear any user session data here
    // localStorage.removeItem('user');
    // sessionStorage.clear();
    
    // Close the modal
    setIsOpen(false);
    
    // Redirect to signup page
    router.push('/auth/signup');
  };

  const ProfileCard = () => (
    <div className="flex items-center gap-3 cursor-pointer hover:bg-[#2e2e2e] p-2 rounded-lg transition-colors"
         onClick={() => setIsOpen(true)}>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{userData.username}</div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{userData.weather.temperature}°C</span>
          <span>|</span>
          <div className="flex items-center gap-1">
            <Cloud className="w-3 h-3" />
            <span>{userData.weather.condition}</span>
          </div>
          <span>|</span>
          <span>{userData.weather.time}</span>
        </div>
      </div>
    </div>
  );

  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 px-6 py-8">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-4 border-white border-opacity-30">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">User Profile</h2>
            <p className="text-blue-100 text-sm">Manage your account details</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Username</p>
                <p className="font-semibold text-gray-900">{userData.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                <p className="font-semibold text-gray-900">{userData.email}</p>
              </div>
            </div>

          </div>

          {/* Location Section */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Location Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Country</p>
                  <p className="font-medium text-gray-900">{userData.country}</p>
                </div>
              </div>
           
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contact Information
            </h3>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{userData.phone}</p>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <>
      <ProfileCard />
      {isOpen && <ProfileModal />}
    </>
  );
}