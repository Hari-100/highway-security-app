import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import { useGeolocated } from 'react-geolocated';
import supabase from '../utils/supabase';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState('');
  const [media, setMedia] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  const adminDomains = ['police.in', 'highwaypatrol.in', 'gmail.com'];

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
    if (!type) return toast.error('Please select the type of issue.');
    if (!coords) return toast.error('Location not available.');

    setSubmitting(true);

    try {
      // 1. Upload media (if available)
      let mediaUrl = '';
      if (media) {
        const fileName = `${Date.now()}_${media.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(fileName, media);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('reports')
          .getPublicUrl(fileName);
        mediaUrl = publicUrlData.publicUrl;
      }

      // 2. Insert into reports table
      const { error: insertError } = await supabase.from('reports').insert([
        {
          type,
          location: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
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
              accept="image/*,video/*"
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
