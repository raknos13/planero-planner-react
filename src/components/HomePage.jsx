import { useNavigate } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { useRef } from "react";
import ssNewBoard from "../assets/ss-new-board.png";
import ssNewList from "../assets/ss-new-list.png";
import ssDragDrop from "../assets/ss-drag-drop.png";
import ssEditBoard from "../assets/ss-edit-board.png";
import ssSignin from "../assets/ss-signin.png";
import ssThemeToggle from "../assets/ss-theme-toggle.png";

export default function HomePage() {
  const navigate = useNavigate();
  const featureSection = useRef(null);

  const scrollToSection = (targetRef) => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-y-scroll bg-gradient-to-b from-secondary to-primary">
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
          <div className="text-center space-y-10 my-16">
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
                onClick={() => navigate("/auth")}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get Started - It's Free
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <a onClick={() => scrollToSection(featureSection)}>
                  Learn More
                </a>
              </button>
            </div>
          </div>
          <div className="text-text-secondary flex items-center justify-center">
            <MdExpandMore size={48} />
          </div>

          {/* Feature Cards */}
          <div
            ref={featureSection}
            className="px-6 py-12 space-y-4"
            id="more-section"
          >
            {[
              {
                title: "Flexible Boards",
                description:
                  "Create and customize boards to match your workflow",
                image: ssNewBoard,
              },
              {
                title: "Create lists to manage different tasks",
                description:
                  "Make multiple lists for different tasks within a board",
                image: ssNewList,
              },
              {
                title: "Drag and drop lists and cards around",
                description: "Arrange lists and cards to your liking",
                image: ssDragDrop,
              },
              {
                title: "Toggle light/dark theme with a click",
                description:
                  "Change entire app's theme to light/dark to your liking with just a single click",
                image: ssThemeToggle,
              },
              {
                title: "Edit and Delete board, list, and cards",
                description:
                  "Option to edit and delete board, list and card names",
                image: ssEditBoard,
              },
              {
                title: "Login to save your data",
                description:
                  "Signup and login with email or your Google account to safeguard your data",
                image: ssSignin,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-primary flex flex-col md:flex-row items-center rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className={`p-6 flex-1 md:order-1`}
                  style={{ order: index % 2 === 0 ? 1 : 2 }}
                >
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-lg">
                    {feature.description}
                  </p>
                </div>
                <img
                  src={feature.image}
                  alt="feature image"
                  height={400}
                  width={600}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
