import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import { useGeolocated } from 'react-geolocated';
import supabase from '../utils/supabase';
import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';
import bgImage from '../assets/image-3000x2500.jpg';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState('');
  const [media, setMedia] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (coords) {
      console.log('Location obtained:', coords);
    } else {
      console.log('Waiting for location or permission not granted.');
    }
  }, [coords]);

  const adminDomains = ['police.in', 'highwaypatrol.in', 'gmail.com'];

  const handleAdminDashboard = () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress || '';
    const domain = userEmail.split('@')[1];

    if (adminDomains.includes(domain)) {
      navigate('/admin-dashboard');
    } else {
      toast.error('Access Denied. Unauthorized Admin.');
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!type) return toast.error('Please select the type of issue.');
    if (!coords) return toast.error('Location not available.');

    setSubmitting(true);

    try {
      let mediaUrl = '';

      if (media) {
        const fileName = `${Date.now()}_${media.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(fileName, media);
          upload(filePath, media, {
            contentType: media.type,
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const { data: publicUrlData, error: publicUrlError } = supabase
          .storage
          .from('reports')
          .getPublicUrl(fileName);

        if (publicUrlError) throw publicUrlError;

        mediaUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('reports').insert([
        {
          type,
          location: { lat: coords.latitude, lng: coords.longitude },
          media_url: mediaUrl,
          status: 'Raised',
          created_by: user.primaryEmailAddress.emailAddress,
        },
      ]);

      if (insertError) throw insertError;

      toast.success('Issue reported successfully!');
      setType('');
      setMedia(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to report the issue.');
    } finally {
      setSubmitting(false);
    }
  };

//   return (
//     <div
//   className="min-h-screen bg-white flex flex-col p-6 relative"
//   // style={{
//   //   backgroundImage: `url(${bgImage})`,
//   //   backgroundSize: 'cover',         // makes the image cover the full area
//   //   backgroundRepeat: 'no-repeat',   // prevents tiling
//   //   backgroundPosition: 'center',    // keeps it centered
//   //   backgroundAttachment: 'fixed',   // optional: keeps image fixed during scroll
//   // }}
// >
// <div className="mx-auto max-w-4xl mb-12 p-8 glassmorphism border border-blue-200 shadow-2xl rounded-2xl text-center bg-white/60 backdrop-blur-md">
//   <h2 className="text-4xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
//     🚨 Emergency Highway Safety Assistance 🚨
//   </h2>

//   <p className="text-lg text-gray-800 font-medium mb-6 leading-relaxed">
//     This platform allows you to report <span className="text-red-600 font-semibold">critical incidents</span> occurring on national highways — including <span className="text-blue-700 font-semibold">accidents</span>, <span className="text-blue-700 font-semibold">medical emergencies</span>, <span className="text-blue-700 font-semibold">vehicle breakdowns</span>, or <span className="text-blue-700 font-semibold">suspicious activities</span>.
//     <br />Your report helps law enforcement and medical teams <span className="text-green-700 font-semibold">act swiftly</span> to ensure public safety.
//   </p>

//   <div className="mb-6">
//     <p className="text-xl font-bold text-indigo-700 mb-2">📞 Emergency Contact Numbers:</p>
//     <ul className="list-disc list-inside text-left pl-6 text-gray-900 font-medium space-y-1">
//       <li><span className="text-red-600 font-semibold">Police:</span> 100</li>
//       <li><span className="text-red-600 font-semibold">Ambulance:</span> 102 / 108</li>
//       <li><span className="text-red-600 font-semibold">Highway Patrol:</span> 1095</li>
//       <li><span className="text-red-600 font-semibold">National Emergency:</span> 112</li>
//     </ul>
//   </div>

//   <div>
//     <p className="text-xl font-bold text-indigo-700 mb-2">🌐 Useful Government Links:</p>
//     <ul className="list-disc list-inside text-left pl-6 text-blue-700 font-medium space-y-1">
//       <li>
//         <a href="https://morth.nic.in/" target="_blank" rel="noreferrer" className="underline hover:text-blue-900 transition duration-200">
//           Ministry of Road Transport & Highways
//         </a>
//       </li>
//       <li>
//         <a href="https://www.nhp.gov.in/" target="_blank" rel="noreferrer" className="underline hover:text-blue-900 transition duration-200">
//           National Health Portal
//         </a>
//       </li>
//       <li>
//         <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer" className="underline hover:text-blue-900 transition duration-200">
//           Government of India Portal
//         </a>
//       </li>
//     </ul>
//   </div>
// </div>


//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-8">
//         {/* Left side */}
//         <button
//           onClick={handleAdminDashboard}
//           className="bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all"
//         >
//           View Admin Dashboard
//         </button>

//         {/* Right side */}
//         <div className="flex space-x-4">
//           <button
//             onClick={() => setShowForm(true)}
//             className="flex items-center border-2 border-blue-500 text-blue-500 font-semibold px-6 py-2 rounded-xl shadow-lg hover:bg-blue-500 hover:text-white transition-all"
//           >
//             <FiAlertTriangle className="mr-2" size={20} />
//             Report Issue
//           </button>

//           <button
//             onClick={signOut}
//             className="flex items-center border-2 border-red-500 text-red-500 font-semibold px-6 py-2 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {showForm && (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//     <motion.form
//       onSubmit={handleReportSubmit}
//       className="bg-white p-8 rounded-2xl shadow-xl flex flex-col space-y-4 w-full max-w-md"
//       initial={{ scale: 0.8, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h3 className="text-xl font-bold text-gray-800">Report an Issue</h3>

//       <select
//         value={type}
//         onChange={(e) => setType(e.target.value)}
//         className="border border-gray-300 text-gray-800 rounded px-4 py-2"
//         required
//       >
//         <option value="">Select Issue Type</option>
//         <option value="Accident">Accident</option>
//         <option value="Unlawful Activity">Unlawful Activity</option>
//         <option value="Medical Emergency">Medical Emergency</option>
//         <option value="Vehicle Breakdown">Vehicle Breakdown</option>
//         <option value="Other">Other</option>
//       </select>

//       <input
//         type="file"
//         accept="image/*,video/*"
//         onChange={(e) => setMedia(e.target.files[0])}
//         className="border border-gray-300 text-gray-800 rounded px-4 py-2"
//       />

//       <div className="flex space-x-4 justify-end">
//         <button
//           type="button"
//           onClick={() => setShowForm(false)}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
//         >
//           Cancel
//         </button>

//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           {submitting ? 'Submitting...' : 'Submit'}
//         </button>
//       </div>
//     </motion.form>
//   </div>
// )}

//     </div>
//   );
return (
  <div
    className="min-h-screen flex flex-col p-6 relative"
    style={{
      background: 'linear-gradient(to bottom right, #f3f4f6, #e0f2fe)',
    }}
  >
    {/* Top Bar */}
    <div className="flex justify-between items-center mb-8">
      {/* Left side */}
      <button
        onClick={handleAdminDashboard}
        className="bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all"
      >
        View Admin Dashboard
      </button>

      {/* Right side */}
      <div className="flex space-x-4">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center border-2 border-blue-500 text-blue-500 font-semibold px-6 py-2 rounded-xl shadow-lg hover:bg-blue-500 hover:text-white transition-all"
        >
          <FiAlertTriangle className="mr-2" size={20} />
          Report Issue
        </button>

        <button
          onClick={signOut}
          className="flex items-center border-2 border-red-500 text-red-500 font-semibold px-6 py-2 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all"
        >
          Logout
        </button>
      </div>
    </div>

    
    <div className="mx-auto max-w-4xl mb-12 p-8 glassmorphism border border-blue-200 shadow-2xl rounded-2xl text-center bg-white/60 backdrop-blur-md">
      <h2 className="text-4xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
        🚨 Emergency Highway Safety Assistance 🚨
      </h2>

      <p className="text-lg text-gray-800 font-medium mb-6 leading-relaxed">
        This platform allows you to report <span className="text-red-600 font-semibold">critical incidents</span> occurring on national highways — including <span className="text-blue-700 font-semibold">accidents</span>, <span className="text-blue-700 font-semibold">medical emergencies</span>, <span className="text-blue-700 font-semibold">vehicle breakdowns</span>, or <span className="text-blue-700 font-semibold">suspicious activities</span>.
        <br />Your report helps law enforcement and medical teams <span className="text-green-700 font-semibold">act swiftly</span> to ensure public safety.
      </p>

      <div className="mb-6">
        <p className="text-xl font-bold text-indigo-700 mb-2">📞 Emergency Contact Numbers:</p>
        <ul className="list-disc list-inside text-left pl-6 text-gray-900 font-medium space-y-1">
          <li><span className="text-red-600 font-semibold">Police:</span> 100</li>
          <li><span className="text-red-600 font-semibold">Ambulance:</span> 102 / 108</li>
          <li><span className="text-red-600 font-semibold">Highway Patrol:</span> 1095</li>
          <li><span className="text-red-600 font-semibold">National Emergency:</span> 112</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-bold text-indigo-700 mb-2">🌐 Useful Government Links:</p>
        <ul className="list-disc list-inside text-left pl-6 text-blue-700 font-medium space-y-1">
          <li>
            <a href="https://morth.nic.in/" target="_blank" rel="noreferrer" className="underline hover:text-blue-900 transition duration-200">
              Ministry of Road Transport & Highways
            </a>
          </li>
          <li>
            <a href="https://www.nhp.gov.in/" target="_blank" rel="noreferrer" className="underline hover:text-blue-900 transition duration-200">
              National Health Portal
            </a>
          </li>
          <li>
            <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer" className="underline hover:text-blue-900 transition duration-200">
              Government of India Portal
            </a>
          </li>
        </ul>
      </div>
    </div>

    
    {showForm && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <motion.form
          onSubmit={handleReportSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl flex flex-col space-y-4 w-full max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800">Report an Issue</h3>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 text-gray-800 rounded px-4 py-2"
            required
          >
            <option value="">Select Issue Type</option>
            <option value="Accident">Accident</option>
            <option value="Unlawful Activity">Unlawful Activity</option>
            <option value="Medical Emergency">Medical Emergency</option>
            <option value="Vehicle Breakdown">Vehicle Breakdown</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setMedia(e.target.files[0])}
            className="border border-gray-300 text-gray-800 rounded px-4 py-2"
          />

          <div className="flex space-x-4 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </motion.form>
      </div>
    )}
  </div>
);

};

export default Dashboard;