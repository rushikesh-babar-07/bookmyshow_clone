import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Star, Ticket } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative h-[80vh] md:h-[85vh] min-h-[550px] overflow-hidden">
      <motion.img
        src={heroBg}
        alt="Cinema"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="rating-badge rating-high">
              <Star className="w-3 h-3 fill-current" /> 9.1
            </span>
            <span className="text-sm text-muted-foreground">2h 45m</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">Sci-Fi, Adventure</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight">
            Dune: Part Two
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg">
            Paul Atreides unites with the Fremen to take on the galaxy's most powerful forces in this epic continuation of the saga.
          </p>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/book/1")} className="gold-gradient text-primary-foreground px-8 py-3 rounded-full text-base font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 glow-gold flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              Book Tickets
            </button>
            <a href="https://www.youtube.com/watch?v=Way9Dexny3w" target="_blank" rel="noopener noreferrer" className="glass-card px-6 py-3 rounded-full text-foreground text-base font-medium hover:bg-card/80 hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              Watch Trailer
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
