import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-y-scroll bg-gradient-to-b from-accent to-bg-primary">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/7439134/pexels-photo-7439134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-text-primary sm:text-5xl md:text-6xl">
              <span className="block">Organize your ideas with</span>
              <span className="block text-blue-600">Planero</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-text-secondary sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              The simple, flexible, and powerful way to manage your projects.
              Collaborate with your team, track tasks, and achieve your goals.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get Started - It's Free
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Learn More
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Flexible Boards",
                description:
                  "Create and customize boards to match your workflow",
              },
              {
                title: "Team Collaboration",
                description:
                  "Work together seamlessly with your team in real-time",
              },
              {
                title: "Power-Ups",
                description: "Enhance your boards with powerful integrations",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-bg-primary rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
