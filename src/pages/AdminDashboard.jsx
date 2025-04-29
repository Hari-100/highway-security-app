import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import supabase from '../utils/supabase';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();

  const adminDomains = ['police.in', 'highwaypatrol.in', 'gmail.com'];

  useEffect(() => {
    if (!user) return;

    const userEmail = user?.primaryEmailAddress?.emailAddress || '';
    const domain = userEmail.split('@')[1];

    if (!adminDomains.includes(domain)) {
      toast.error('Access Denied. Unauthorized Admin.');
      navigate('/');
    } else {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase.from('reports').select('*');
      if (error) throw error;
      setReports(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from('reports')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error(error);
      toast.error('Failed to update status');
    } else {
      fetchReports();
    }
  };

//   const customIcon = new L.Icon({
//     iconUrl: markerIcon,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//     shadowSize: [41, 41],
//   });

  if (loading) return <div className="flex justify-center mt-20">Loading...</div>;

  return (
    <div className="p-6 flex flex-col space-y-8">
      <h2 className="text-2xl font-bold text-center">Admin Dashboard</h2>

      <div className="h-[500px] w-full">
        <MapContainer center={[12.9716, 77.5946]} zoom={5} scrollWheelZoom className="h-full w-full rounded-lg shadow">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {reports.map((report) => (
            report.location && (
              <Marker
                key={report.id}
                position={[report.location.lat, report.location.lng]}
              >
                <Popup>
                  <div className="text-sm">
                    <p><strong>Type:</strong> {report.type}</p>
                    <p><strong>Status:</strong> {report.status}</p>
                    {report.media_url && (
                      <a href={report.media_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        View Media
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Type</th>
              <th className="border border-gray-200 px-4 py-2">Location</th>
              <th className="border border-gray-200 px-4 py-2">Media</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="border border-gray-200 px-4 py-2">{report.type}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {report.location?.lat?.toFixed(3)}, {report.location?.lng?.toFixed(3)}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {report.media_url ? (
                    <a href={report.media_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View
                    </a>
                  ) : (
                    'No Media'
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2">{report.status}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {report.status !== 'Completed' && (
                    <select
                      value={report.status}
                      onChange={(e) => handleStatusChange(report.id, e.target.value)}
                      className="border border-gray-300 rounded p-1"
                    >
                      <option value="Raised">Raised</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
// [20.5937, 78.9629]