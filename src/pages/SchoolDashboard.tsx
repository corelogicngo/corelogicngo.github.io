import { useEffect, useState } from 'react';
import { School, Users, Calendar, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Registration {
  id: string;
  full_name: string;
  student1_name: string;
  student2_name: string;
  status: string;
  created_at: string;
  event: {
    title: string;
    event_date: string;
  } | null;
}

export default function SchoolDashboard() {
  const { user, signOut } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, [user]);

  const fetchRegistrations = async () => {
    if (!user?.email) return;

    try {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          event:events(title, event_date)
        `)
        .eq('email', user.email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
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
              <h1 className="text-4xl font-bold mb-2">School Dashboard</h1>
              <p className="text-gray-200">Welcome back, {user?.email}</p>
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
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: School, label: 'Total Registrations', value: registrations.length, color: 'from-[hsl(6,77%,28%)] to-[hsl(6,77%,35%)]' },
            { icon: Users, label: 'Pending Approval', value: registrations.filter(r => r.status === 'pending').length, color: 'from-yellow-500 to-yellow-600' },
            { icon: Award, label: 'Approved', value: registrations.filter(r => r.status === 'approved').length, color: 'from-green-500 to-green-600' },
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

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-[hsl(220,66%,14%)] text-white">
            <h2 className="text-2xl font-bold">Your Registrations</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(6,77%,28%)] mx-auto"></div>
            </div>
          ) : registrations.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {registrations.map((registration) => (
                <div key={registration.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[hsl(220,66%,14%)] mb-2">
                        {registration.event?.title || 'Tournament Registration'}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {registration.event?.event_date
                              ? new Date(registration.event.event_date).toLocaleDateString()
                              : 'Date TBA'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>Registered: {new Date(registration.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(registration.status)}`}>
                      {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-1">Student 1</div>
                      <div className="font-medium text-[hsl(220,66%,14%)]">{registration.student1_name}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-1">Student 2</div>
                      <div className="font-medium text-[hsl(220,66%,14%)]">{registration.student2_name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <School className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">No registrations yet</p>
              <a
                href="/register"
                className="inline-block px-6 py-3 bg-[hsl(6,77%,28%)] hover:bg-[hsl(6,77%,35%)] text-white rounded-lg font-semibold transition-colors"
              >
                Register for Tournament
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 bg-gradient-to-r from-[hsl(220,66%,14%)] to-[hsl(6,77%,28%)] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
          <p className="text-gray-200 mb-6">
            If you have questions about your registration or need to make changes, please contact us.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-[hsl(220,66%,14%)] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
