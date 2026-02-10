import { Search, Ticket } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-border/50 backdrop-blur-2xl"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <div className="gold-gradient p-2 rounded-lg">
            <Ticket className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Cine<span className="text-gold-gradient">Vault</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Movies</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Events</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Plays</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Sports</a>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            animate={{ width: searchOpen ? 220 : 40 }}
            className="flex items-center overflow-hidden rounded-full bg-secondary h-10"
          >
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            {searchOpen && (
              <input
                autoFocus
                type="text"
                placeholder="Search movies..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none pr-4 w-full"
              />
            )}
          </motion.div>
          <button className="gold-gradient text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity hidden sm:block">
            Sign In
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
