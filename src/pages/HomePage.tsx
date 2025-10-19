import { Link } from 'react-router-dom';
import { Trophy, Users, BookOpen, Award, ArrowRight, Calendar } from 'lucide-react';
import { eventData } from '../data/content';

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-[hsl(220,66%,14%)] via-[hsl(220,66%,18%)] to-[hsl(6,77%,28%)] text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Empowering Minds.
                <span className="block text-[hsl(41,50%,57%)]">Inspiring Excellence.</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Join the premier mathematics tournament for senior secondary schools in Edo State.
                Building Nigeria's future through mathematical excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[hsl(6,77%,28%)] hover:bg-[hsl(6,77%,35%)] rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                >
                  Register Your School
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white hover:bg-white hover:text-[hsl(220,66%,14%)] rounded-lg font-semibold text-lg transition-all"
                >
                  View Events
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8500371/pexels-photo-8500371.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students in mathematics competition"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[hsl(6,77%,28%)] to-[hsl(6,77%,35%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, value: eventData.impact.schools, label: 'Schools' },
              { icon: BookOpen, value: eventData.impact.students, label: 'Students' },
              { icon: Users, value: eventData.impact.teachers, label: 'Teachers' },
              { icon: Trophy, value: eventData.impact.years, label: 'Years Running' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className="w-12 h-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(220,66%,14%)] mb-4">
              Upcoming Tournament
            </h2>
            <p className="text-xl text-gray-600">
              Join us for the 4th Annual Igiehon Mathematics Tournament
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-12 space-y-6">
                <div className="inline-block px-4 py-2 bg-[hsl(6,77%,28%)] text-white rounded-full text-sm font-semibold">
                  UPCOMING EVENT
                </div>
                <h3 className="text-3xl font-bold text-[hsl(220,66%,14%)]">
                  {eventData.current.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {eventData.current.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-6 h-6 text-[hsl(6,77%,28%)] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[hsl(220,66%,14%)]">Event Date</div>
                      <div className="text-gray-600">{eventData.current.date}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-6 h-6 text-[hsl(6,77%,28%)] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[hsl(220,66%,14%)]">Venue</div>
                      <div className="text-gray-600">{eventData.current.venue}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-6 h-6 text-[hsl(6,77%,28%)] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[hsl(220,66%,14%)]">Registration Period</div>
                      <div className="text-gray-600">
                        {eventData.current.registrationStart} - {eventData.current.registrationEnd}
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 bg-[hsl(6,77%,28%)] hover:bg-[hsl(6,77%,35%)] text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Register Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>

              <div className="relative h-64 lg:h-auto">
                <img
                  src="https://images.pexels.com/photos/8500428/pexels-photo-8500428.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Mathematics Tournament"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(220,66%,14%)] mb-4">
              Why Participate?
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of schools in celebrating mathematical excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'Compete for Excellence',
                description: 'Challenge yourself against the best mathematics students in Edo State and showcase your problem-solving skills.',
              },
              {
                icon: Award,
                title: 'Win Amazing Prizes',
                description: 'Top performers receive scholarships, educational materials, and recognition at the state level.',
              },
              {
                icon: Users,
                title: 'Build Lasting Connections',
                description: 'Network with fellow math enthusiasts, educators, and mentors who share your passion for mathematics.',
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(6,77%,28%)] to-[hsl(6,77%,35%)] rounded-2xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[hsl(220,66%,14%)] mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[hsl(220,66%,14%)] to-[hsl(220,66%,20%)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join the Competition?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Register your school today and be part of Edo State's premier mathematics tournament.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-10 py-5 bg-[hsl(6,77%,28%)] hover:bg-[hsl(6,77%,35%)] rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
