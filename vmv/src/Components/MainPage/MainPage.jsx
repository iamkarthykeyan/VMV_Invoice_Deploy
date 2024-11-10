import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const slides = [
  {
    videoSrc: "https://ik.imagekit.io/rxdxtxpigt/React-Invoice/15157535-uhd_3840_2160_25fps.mp4?updatedAt=1728206235453",
    title: "Internal Invoicing Platform for VMV International",
    description: "Our internal invoicing system is built to streamline the company’s billing process. This tool enables the finance team to manage invoices, payments, and tax reports efficiently within the organization.",
  },
  {
    videoSrc: "https://ik.imagekit.io/rxdxtxpigt/React-Invoice/15157535-uhd_3840_2160_25fps.mp4?updatedAt=1728206235453",
    title: "Automate Company Invoices and Payments",
    description: "This system is exclusively for internal use, automating invoicing and payment tracking. Finance personnel can use it to handle company transactions, ensuring efficiency and compliance within the company’s financial operations.",
  },
  {
    videoSrc: "https://ik.imagekit.io/rxdxtxpigt/React-Invoice/15157535-uhd_3840_2160_25fps.mp4?updatedAt=1728206235453",
    title: "Efficient Financial Tracking for Internal Teams",
    description: "Designed for VMV International's internal finance team, this tool simplifies payment collection, internal client management, and maintains clear, detailed financial records across departments.",
  },
  {
    videoSrc: "https://ik.imagekit.io/rxdxtxpigt/React-Invoice/15157535-uhd_3840_2160_25fps.mp4?updatedAt=1728206235453",
    title: "Professional Invoice Designs for Internal Use",
    description: "Create professional, standardized invoices for internal transactions. This tool is tailored for company use, providing a unified, polished invoice format for all internal billing needs.",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[560px] flex flex-col justify-center items-start rounded-[20px] m-3 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
        >
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={slide.videoSrc} type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
          <div className="relative z-10 max-w-4xl p-4 lg:p-12 text-white mb-96">
            <h1 className="text-3xl md:text-5xl lg:text-7xl leading-tight font-poppins">
              {slide.title}
            </h1>
          </div>
          <div className="absolute right-0 bottom-0 max-w-3xl p-4 lg:p-12 text-white mb-16">
            <p className="text-base lg:text-lg text-gray-300">
              {slide.description}
            </p>
            <Link to="/dashboard"> {/* Link to the dashboard */}
              <button className="mt-8 bg-white text-black py-3 px-6 rounded-full text-sm md:text-base lg:text-lg font-semibold flex items-center">
                Begin Your Today's Invoice Journey
                <p className="ml-2 text-2xl">→</p>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hero;
