import { useState, useEffect } from "react";
import whatsappLogo from "@/assets/whatsapp-logo.png";

const WhatsAppFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open('https://wa.me/923234827157?text=Hi! I need help with writing services', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 group hover:scale-110 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <img src={whatsappLogo} alt="WhatsApp" className="h-14 w-14 md:h-16 md:w-16 drop-shadow-2xl" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
        Chat with us on WhatsApp
        <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </div>
    </button>
  );
};

export default WhatsAppFloatingButton;
