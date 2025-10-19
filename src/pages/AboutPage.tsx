import { Heart, Target, Users, Award } from 'lucide-react';
import { founders } from '../data/content';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[hsl(220,66%,14%)] to-[hsl(6,77%,28%)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Empowering the next generation of mathematical thinkers in Nigeria
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-[hsl(220,66%,14%)] mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  The Igiehon Foundation was established with a singular vision: to transform mathematics education
                  in Edo State and across Nigeria. Founded by Engr. Osa Igiehon and Mrs. Nosa Igiehon, our
                  organization emerged from a deep understanding of the critical role mathematics plays in
                  national development.
                </p>
                <p>
                  What began as a modest initiative has grown into Edo State's premier mathematics competition,
                  attracting over 250 schools and touching the lives of more than 1,000 students annually. Our
                  annual Mathematics Tournament has become a beacon of academic excellence, inspiring students
                  to embrace the beauty and power of mathematical thinking.
                </p>
                <p>
                  Through partnerships with educational institutions, NGOs, and passionate individuals, we
                  continue to expand our reach and impact, creating opportunities for young minds to excel and
                  contribute to Nigeria's technological and economic advancement.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/8500428/pexels-photo-8500428.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Foundation Impact"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                description: 'To promote mathematical excellence, critical thinking, and problem-solving skills among secondary school students in Edo State and beyond.',
              },
              {
                icon: Heart,
                title: 'Our Vision',
                description: 'A Nigeria where every student has access to quality mathematics education and the opportunity to reach their full potential.',
              },
              {
                icon: Award,
                title: 'Our Values',
                description: 'Excellence, integrity, inclusivity, innovation, and a commitment to educational transformation and youth empowerment.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(6,77%,28%)] to-[hsl(6,77%,35%)] rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[hsl(220,66%,14%)] mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <h2 className="text-4xl font-bold text-[hsl(220,66%,14%)] mb-12 text-center">
              Meet Our Founders
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {[founders.founder, founders.coFounder].map((founder, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-[hsl(220,66%,14%)] to-[hsl(6,77%,28%)] flex items-center justify-center">
                    <Users className="w-20 h-20 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[hsl(220,66%,14%)] mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-[hsl(6,77%,28%)] font-semibold mb-4">
                    {founder.title}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[hsl(220,66%,14%)] to-[hsl(6,77%,28%)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-200 mb-8">
            Together, we can build a brighter future through mathematics education. Be part of our growing community of schools, teachers, and students committed to excellence.
          </p>
          <a
            href="/register"
            className="inline-block px-10 py-5 bg-[hsl(6,77%,28%)] hover:bg-[hsl(6,77%,35%)] rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
          >
            Get Involved Today
          </a>
        </div>
      </section>
    </div>
  );
}
