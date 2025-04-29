import React, { useState } from 'react';
import { useGeolocated } from "react-geolocated";
import { uploadIssueReport } from '../firebase/reportService'; // we'll create this

const ReportIssue = () => {
  const [type, setType] = useState('');
  const [media, setMedia] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coords) {
      alert('Location is required!');
      return;
    }

    setUploading(true);

    await uploadIssueReport({
      type,
      media,
      location: { lat: coords.latitude, lng: coords.longitude }
    });

    setUploading(false);
    alert('Issue reported successfully!');
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>

      <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        >
          <option value="">Select Issue Type</option>
          <option value="Accident">Accident</option>
          <option value="Unlawful Activity">Unlawful Activity</option>
          <option value="Road Block">Road Block</option>
          <option value="Medical Emergency">Medical Emergency</option>
          <option value="Vehicle Breakdown">Vehicle Breakdown</option>
        </select>

        <input
          type="file"
          accept="image/,video/"
          onChange={(e) => setMedia(e.target.files[0])}
          className="border border-gray-300 rounded p-2"
        />

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {uploading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {!isGeolocationAvailable ? (
        <p>Your browser does not support Geolocation</p>
      ) : !isGeolocationEnabled ? (
        <p>Geolocation is not enabled</p>
      ) : coords ? (
        <p className="text-sm text-gray-600 mt-4">
          Location: {coords.latitude.toFixed(3)}, {coords.longitude.toFixed(3)}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default ReportIssue;