import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Award, Play } from 'lucide-react';
import { eventData, pastEvents } from '../data/content';
import { supabase } from '../lib/supabase';

interface Winner {
  id: string;
  position: number;
  student_names: string;
  video_url: string | null;
  image_url: string | null;
  event: {
    title: string;
    event_date: string;
  };
  school: {
    name: string;
  };
}

export default function EventsPage() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      const { data, error } = await supabase
        .from('winners')
        .select(`
          *,
          event:events(title, event_date),
          school:schools(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWinners(data || []);
    } catch (error) {
      console.error('Error fetching winners:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPositionLabel = (position: number) => {
    switch (position) {
      case 1:
        return '1st Place';
      case 2:
        return '2nd Place';
      case 3:
        return '3rd Place';
      default:
        return `${position}th Place`;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-400';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-[hsl(6,77%,28%)] to-[hsl(6,77%,35%)]';
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[hsl(220,66%,14%)] to-[hsl(6,77%,28%)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Events & Tournaments</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Celebrating mathematical excellence through our annual tournaments and special events
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[hsl(220,66%,14%)] mb-4">Upcoming Tournament</h2>
            <p className="text-xl text-gray-600">Don't miss the 4th Annual Igiehon Mathematics Tournament</p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border-2 border-[hsl(41,50%,57%)]">
            <div className="grid lg:grid-cols-2">
              <div className="order-2 lg:order-1 relative h-96 lg:h-auto">
                <img
                  src="https://images.pexels.com/photos/8500371/pexels-photo-8500371.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="IMT 2025"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[hsl(6,77%,28%)] text-white px-4 py-2 rounded-full font-bold">
                  REGISTRATION OPEN
                </div>
              </div>

              <div className="order-1 lg:order-2 p-10 lg:p-12">
                <h3 className="text-3xl font-bold text-[hsl(220,66%,14%)] mb-6">
                  {eventData.current.title}
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <Calendar className="w-6 h-6 text-[hsl(6,77%,28%)] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[hsl(220,66%,14%)]">Date</div>
                      <div className="text-gray-600">{eventData.current.date}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-[hsl(6,77%,28%)] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[hsl(220,66%,14%)]">Venue</div>
                      <div className="text-gray-600">{eventData.current.venue}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-[hsl(6,77%,28%)] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[hsl(220,66%,14%)]">Registration Deadline</div>
                      <div className="text-gray-600">{eventData.current.registrationEnd}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 mb-8">
                  <h4 className="font-bold text-[hsl(220,66%,14%)] mb-4 text-lg">Event Schedule</h4>
                  <div className="space-y-3">
                    {eventData.schedule.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="font-semibold text-[hsl(6,77%,28%)] w-32 flex-shrink-0">
                          {item.time}
                        </div>
                        <div className="text-gray-700">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[hsl(41,50%,57%)] bg-opacity-10 rounded-2xl p-6 mb-8">
                  <h4 className="font-bold text-[hsl(220,66%,14%)] mb-3 text-lg">Eligibility Requirements</h4>
                  <ul className="space-y-2">
                    {eventData.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[hsl(6,77%,28%)] mt-1">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/register"
                  className="inline-block w-full text-center px-8 py-4 bg-[hsl(6,77%,28%)] hover:bg-[hsl(6,77%,35%)] text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Register Your School
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(220,66%,14%)] mb-4">
              Past Winners & Champions
            </h2>
            <p className="text-xl text-gray-600">
              Celebrating the outstanding achievements of our past tournament winners
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(6,77%,28%)]"></div>
            </div>
          ) : winners.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {winners.map((winner) => (
                <div
                  key={winner.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div className="relative">
                    {winner.image_url ? (
                      <img
                        src={winner.image_url}
                        alt={winner.student_names}
                        className="w-full h-56 object-cover"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-[hsl(220,66%,14%)] to-[hsl(6,77%,28%)] flex items-center justify-center">
                        <Award className="w-16 h-16 text-white" />
                      </div>
                    )}
                    <div className={`absolute top-4 right-4 bg-gradient-to-r ${getPositionColor(winner.position)} text-white px-4 py-2 rounded-full font-bold shadow-lg`}>
                      {getPositionLabel(winner.position)}
                    </div>
                    {winner.video_url && (
                      <button
                        onClick={() => setSelectedVideo(winner.video_url)}
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all group"
                      >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-[hsl(6,77%,28%)] ml-1" />
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[hsl(220,66%,14%)] mb-2">
                      {winner.student_names}
                    </h3>
                    <p className="text-gray-600 mb-1">{winner.school.name}</p>
                    <p className="text-sm text-gray-500">{winner.event.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Past winners will be showcased here after each tournament</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(220,66%,14%)] mb-4">
              Tournament History
            </h2>
            <p className="text-xl text-gray-600">
              A journey through our annual mathematics tournaments
            </p>
          </div>

          <div className="space-y-8">
            {pastEvents.map((event, idx) => (
              <div
                key={event.id}
                className={`bg-white rounded-3xl shadow-xl overflow-hidden border-l-8 ${
                  idx === 0 ? 'border-[hsl(6,77%,28%)]' : 'border-[hsl(41,50%,57%)]'
                }`}
              >
                <div className="grid md:grid-cols-3">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[hsl(220,66%,14%)] text-white px-4 py-2 rounded-full font-bold">
                      {event.year}
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8 lg:p-10">
                    <h3 className="text-3xl font-bold text-[hsl(220,66%,14%)] mb-4">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-5 h-5 text-[hsl(6,77%,28%)]" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-5 h-5 text-[hsl(6,77%,28%)]" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {event.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-[hsl(220,66%,14%)] mb-3">Event Highlights:</h4>
                      <ul className="space-y-2">
                        {event.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start space-x-2">
                            <span className="text-[hsl(6,77%,28%)] mt-1">•</span>
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={selectedVideo}
                  title="Winner Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="mt-4 w-full py-3 bg-white text-[hsl(220,66%,14%)] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Close Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
