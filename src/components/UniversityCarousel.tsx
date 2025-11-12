import harvardLogo from "@/assets/universities/harvard-logo.png";
import oxfordLogo from "@/assets/universities/oxford-logo.png";
import cambridgeLogo from "@/assets/universities/cambridge-logo.png";
import lumsLogo from "@/assets/universities/lums-logo.png";
import aiouLogo from "@/assets/universities/aiou-logo.png";
import fastLogo from "@/assets/universities/fast-logo.png";
import nustLogo from "@/assets/universities/nust-logo.png";
import dubaiLogo from "@/assets/universities/dubai-logo.png";
import suffolkLogo from "@/assets/universities/suffolk-logo.png";

const UniversityCarousel = () => {
  const universities = [
    { name: "Harvard University", logo: harvardLogo },
    { name: "University of Oxford", logo: oxfordLogo },
    { name: "University of Cambridge", logo: cambridgeLogo },
    { name: "LUMS Pakistan", logo: lumsLogo },
    { name: "AIOU", logo: aiouLogo },
    { name: "FAST University", logo: fastLogo },
    { name: "NUST Pakistan", logo: nustLogo },
    { name: "University of Dubai", logo: dubaiLogo },
    { name: "University of Suffolk", logo: suffolkLogo },
  ];

  // Duplicate for seamless loop
  const duplicatedUniversities = [...universities, ...universities];

  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            Trusted by Students Worldwide
          </h2>
          <p className="text-muted-foreground">
            From prestigious universities across the globe
          </p>
        </div>

        {/* Scrolling Carousel */}
        <div className="relative">
          <div className="flex gap-8 animate-scroll hover:pause">
            {duplicatedUniversities.map((university, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-6 py-4 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
              >
                <img 
                  src={university.logo} 
                  alt={university.name}
                  className="h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 18s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 10s linear infinite;
          }
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default UniversityCarousel;
