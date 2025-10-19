import { Trophy, BookOpen, Users, Library, Target, Calendar } from 'lucide-react';
import { programs } from '../data/content';

const iconMap = {
  'trophy': Trophy,
  'book-open': BookOpen,
  'users': Users,
  'library': Library,
};

export default function ProgramsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[hsl(220,66%,14%)] to-[hsl(6,77%,28%)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Comprehensive initiatives designed to nurture mathematical talent and transform education
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(220,66%,14%)] mb-4">
              Building Excellence Through Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our programs are designed to create lasting impact on students, teachers, and the broader educational community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {programs.map((program, idx) => {
              const Icon = iconMap[program.icon as keyof typeof iconMap];
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-[hsl(6,77%,28%)] to-[hsl(6,77%,35%)] rounded-2xl flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[hsl(220,66%,14%)] mb-4">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-[hsl(220,66%,14%)] to-[hsl(6,77%,28%)] rounded-3xl p-12 text-white mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-[hsl(41,50%,57%)] text-[hsl(220,66%,14%)] rounded-full text-sm font-semibold mb-6">
                  FLAGSHIP PROGRAM
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Annual Mathematics Tournament
                </h2>
                <p className="text-xl text-gray-200 leading-relaxed mb-8">
                  Our premier event brings together the brightest mathematical minds from across Edo State for a day of
                  intense competition, learning, and celebration of academic excellence. This tournament has become
                  the benchmark for mathematics competitions in the region.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Target className="w-6 h-6 flex-shrink-0 mt-1 text-[hsl(41,50%,57%)]" />
                    <div>
                      <div className="font-semibold">Competitive Rounds</div>
                      <div className="text-gray-300">Written tests, speed rounds, and problem-solving challenges</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-6 h-6 flex-shrink-0 mt-1 text-[hsl(41,50%,57%)]" />
                    <div>
                      <div className="font-semibold">Annual Event</div>
                      <div className="text-gray-300">Held every November, bringing together 200+ schools</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/IMT 2024, begins(3).jpg"
                  alt="Mathematics Tournament"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <h2 className="text-4xl font-bold text-[hsl(220,66%,14%)] mb-6 text-center">
              Program Impact
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Our programs create measurable positive change in mathematics education across Edo State
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  value: '250+',
                  label: 'Schools Reached',
                  description: 'Expanding access to quality mathematics education',
                },
                {
                  value: '1,000+',
                  label: 'Students Impacted',
                  description: 'Inspiring the next generation of problem solvers',
                },
                {
                  value: '120+',
                  label: 'Teachers Trained',
                  description: 'Building capacity for sustainable change',
                },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-bold text-[hsl(6,77%,28%)] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xl font-semibold text-[hsl(220,66%,14%)] mb-2">
                    {stat.label}
                  </div>
                  <p className="text-gray-600">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-16">
                <h2 className="text-4xl font-bold text-[hsl(220,66%,14%)] mb-6">
                  Join Our Programs
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Whether you're a school administrator, teacher, student, or education enthusiast, there's a place
                  for you in our programs. Together, we can transform mathematics education in Nigeria.
                </p>
                <div className="space-y-4">
                  <a
                    href="/register"
                    className="block w-full text-center px-8 py-4 bg-[hsl(6,77%,28%)] hover:bg-[hsl(6,77%,35%)] text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    Register for Tournament
                  </a>
                  <a
                    href="/contact"
                    className="block w-full text-center px-8 py-4 border-2 border-[hsl(220,66%,14%)] text-[hsl(220,66%,14%)] hover:bg-[hsl(220,66%,14%)] hover:text-white rounded-lg font-semibold transition-all"
                  >
                    Learn More About Programs
                  </a>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img
                  src="/@students.JPG"
                  alt="Join Our Programs"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
