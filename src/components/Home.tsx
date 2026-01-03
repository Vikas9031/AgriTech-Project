import { Leaf, Cloud, Droplets, MessageSquare, BookOpen, ShieldCheck } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: <Leaf className="h-10 w-10 text-green-600" />,
      title: 'Crop Guide',
      description: 'Comprehensive information on crops, seasons, and soil requirements',
      page: 'crops'
    },
    {
      icon: <Cloud className="h-10 w-10 text-blue-600" />,
      title: 'Weather Data',
      description: 'Live weather updates and rainfall information for your region',
      page: 'weather'
    },
    {
      icon: <Droplets className="h-10 w-10 text-cyan-600" />,
      title: 'Recommendations',
      description: 'Smart fertilizer and pesticide recommendations for optimal yield',
      page: 'recommendations'
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-orange-600" />,
      title: 'Discussion Forum',
      description: 'Connect with farmers and experts to share knowledge',
      page: 'forum'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div
        className="relative bg-cover bg-center py-32"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=1200)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Modern Farming Made Simple
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Empowering farmers with technology, knowledge, and community
          </p>
          <button
            onClick={() => onNavigate('crops')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 shadow-lg"
          >
            Explore Crop Guide
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => onNavigate(feature.page)}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Why Choose AgriTech?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Expert Knowledge</h4>
                    <p className="text-gray-600">Access comprehensive agricultural information curated by experts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Cloud className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Real-time Weather</h4>
                    <p className="text-gray-600">Make informed decisions with live weather updates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Reliable Recommendations</h4>
                    <p className="text-gray-600">Get scientifically-backed advice for better yields</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Farmer"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
