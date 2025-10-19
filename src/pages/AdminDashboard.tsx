import { useEffect, useState } from 'react';
import { Users, Calendar, Award, Trophy, Settings, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  student1_name: string | null;
  student2_name: string | null;
  status: string;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  event_date: string;
  is_active: boolean;
}

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'registrations' | 'events' | 'winners'>('registrations');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [regResult, eventsResult] = await Promise.all([
        supabase.from('registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('event_date', { ascending: false }),
      ]);

      if (regResult.data) {
        setRegistrations(regResult.data);
        setStats({
          total: regResult.data.length,
          pending: regResult.data.filter(r => r.status === 'pending').length,
          approved: regResult.data.filter(r => r.status === 'approved').length,
          rejected: regResult.data.filter(r => r.status === 'rejected').length,
        });
      }

      if (eventsResult.data) {
        setEvents(eventsResult.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRegistrationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[hsl(220,66%,14%)] to-[hsl(6,77%,28%)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-200">Manage registrations, events, and winners</p>
            </div>
            <button
              onClick={signOut}
              className="px-6 py-3 bg-white text-[hsl(220,66%,14%)] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: 'Total Registrations', value: stats.total, color: 'from-[hsl(6,77%,28%)] to-[hsl(6,77%,35%)]' },
            { icon: Calendar, label: 'Pending Review', value: stats.pending, color: 'from-yellow-500 to-yellow-600' },
            { icon: CheckCircle, label: 'Approved', value: stats.approved, color: 'from-green-500 to-green-600' },
            { icon: XCircle, label: 'Rejected', value: stats.rejected, color: 'from-red-500 to-red-600' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-[hsl(220,66%,14%)] mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'registrations', label: 'Registrations', icon: Users },
                { id: 'events', label: 'Events', icon: Calendar },
                { id: 'winners', label: 'Winners', icon: Trophy },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[hsl(6,77%,28%)] text-[hsl(6,77%,28%)]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'registrations' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[hsl(220,66%,14%)]">All Registrations</h2>
                </div>

                {loading ? (
                  <div className="py-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(6,77%,28%)] mx-auto"></div>
                  </div>
                ) : registrations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            School / Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Students
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {registrations.map((reg) => (
                          <tr key={reg.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-[hsl(220,66%,14%)]">
                                {reg.organization || 'N/A'}
                              </div>
                              <div className="text-sm text-gray-500">{reg.full_name}</div>
                              <div className="text-sm text-gray-500">{reg.email}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">{reg.student1_name || 'N/A'}</div>
                              <div className="text-sm text-gray-900">{reg.student2_name || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(reg.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(reg.status)}`}>
                                {reg.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                {reg.status !== 'approved' && (
                                  <button
                                    onClick={() => updateRegistrationStatus(reg.id, 'approved')}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    Approve
                                  </button>
                                )}
                                {reg.status !== 'rejected' && (
                                  <button
                                    onClick={() => updateRegistrationStatus(reg.id, 'rejected')}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Reject
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No registrations yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[hsl(220,66%,14%)]">Events Management</h2>
                </div>

                {loading ? (
                  <div className="py-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(6,77%,28%)] mx-auto"></div>
                  </div>
                ) : events.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {events.map((event) => (
                      <div key={event.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-semibold text-[hsl(220,66%,14%)]">{event.title}</h3>
                          {event.is_active && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">
                          {new Date(event.event_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No events configured</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'winners' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[hsl(220,66%,14%)]">Winners Management</h2>
                </div>
                <div className="py-12 text-center">
                  <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Winners will appear here after tournaments</p>
                  <p className="text-gray-400 text-sm mt-2">Add winners from approved registrations</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
