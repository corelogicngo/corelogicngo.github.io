import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Users, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: 'teacher',
    student1Name: '',
    student1Email: '',
    student2Name: '',
    student2Email: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { data: activeEvent } = await supabase
        .from('events')
        .select('id')
        .eq('is_active', true)
        .maybeSingle();

      const { error } = await supabase.from('registrations').insert([
        {
          event_id: activeEvent?.id || null,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          role: formData.role,
          interest: 'event',
          student1_name: formData.student1Name,
          student1_email: formData.student1Email,
          student2_name: formData.student2Name,
          student2_email: formData.student2Email,
          notes: formData.notes,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      setStatus({
        type: 'success',
        message: 'Registration successful! We will contact you with further details.',
      });

      setTimeout(() => {
        navigate('/events');
      }, 3000);
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[hsl(220,66%,14%)] to-[hsl(6,77%,28%)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Tournament Registration</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Register your school for the 4th Annual Igiehon Mathematics Tournament
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: School, title: 'School Registration', description: 'Open to all SS students in Edo State' },
              { icon: Users, title: 'Team of Two', description: 'Register two students per school' },
              { icon: Trophy, title: 'Win Prizes', description: 'Compete for scholarships and awards' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(6,77%,28%)] to-[hsl(6,77%,35%)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[hsl(220,66%,14%)] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          {status && (
            <div
              className={`mb-8 p-4 rounded-lg ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[hsl(220,66%,14%)] mb-6">
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-[hsl(220,66%,14%)] mb-2">
                      Full Name (Contact Person) *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(6,77%,28%)] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[hsl(220,66%,14%)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(6,77%,28%)] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[hsl(220,66%,14%)] mb-2">
                      Phone Number (WhatsApp preferred)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(6,77%,28%)] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-semibold text-[hsl(220,66%,14%)] mb-2">
                      Your Role *
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(6,77%,28%)] focus:border-transparent"
                    >
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="organization" className="block text-sm font-semibold text-[hsl(220,66%,14%)] mb-2">
                      School Name *
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(6,77%,28%)] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold text-[hsl(220,66%,14%)] mb-6">
                  Student Information
                </h2>
                <p className="text-gray-600 mb-6">
                  Register two students to compete as a team. Both students must be currently enrolled in SS1, SS2, or SS3.
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-[hsl(220,66%,14%)] mb-4">Student 1 *</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="student1Name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="student1Name"
                          name="student1Name"
                          value={formData.student1Name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(6,77%,28%)] focus:border-transparent bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="student1Email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="student1Email"
                          name="student1Email"
                          value={formData.student1Email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(6,77%,28%)] focus:border-transparent bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-[hsl(220,66%,14%)] mb-4">Student 2 *</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="student2Name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="student2Name"
                          name="student2Name"
                          value={formData.student2Name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(6,77%,28%)] focus:border-transparent bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="student2Email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="student2Email"
                          name="student2Email"
                          value={formData.student2Email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(6,77%,28%)] focus:border-transparent bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <label htmlFor="notes" className="block text-sm font-semibold text-[hsl(220,66%,14%)] mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(6,77%,28%)] focus:border-transparent"
                  placeholder="Any special requirements or questions?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-[hsl(6,77%,28%)] hover:bg-[hsl(6,77%,35%)] text-white rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? 'Submitting...' : 'Complete Registration'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
