import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { submitReport } from '../firebase/reportService';
import { toast } from 'react-hot-toast';
import { useGeolocated } from 'react-geolocated'; // ✅ Correct hook

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useAuth();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState('');
  const [media, setMedia] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const adminDomains = ['police.in', 'highwaypatrol.in'];

  const handleAdminDashboard = () => {
    const userEmail = user.primaryEmailAddress?.emailAddress || '';
    const domain = userEmail.split('@')[1];

    if (adminDomains.includes(domain)) {
      navigate('/admin-dashboard');
    } else {
      toast.error('Access Denied. Unauthorized Admin.');
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!type) {
      toast.error('Please select the type of issue.');
      return;
    }
    if (!coords) {
      toast.error('Location not available. Please allow location access.');
      return;
    }

    setSubmitting(true);

    try {
      await submitReport({
        type,
        location: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
        media: media,
      });
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

  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation</div>;
  }

  if (!isGeolocationEnabled) {
    return <div>Geolocation is not enabled</div>;
  }

  if (!coords) {
    return <div>Loading location...</div>;
  }

  return (
    <div className="p-6 flex flex-col items-center space-y-8">

      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="flex flex-col space-y-4 w-full max-w-md">

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Report an Issue
        </button>

        <button
          onClick={handleAdminDashboard}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800 transition"
        >
          View Admin Dashboard
        </button>

        <button
          onClick={signOut}
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      {/* Report Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={handleReportSubmit}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4 w-full max-w-md"
          >
            <h3 className="text-lg font-bold">Report an Issue</h3>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
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
              accept="image/,video/"
              onChange={(e) => setMedia(e.target.files[0])}
              className="border border-gray-300 rounded px-4 py-2"
            />

            <div className="flex space-x-4 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
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

          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
