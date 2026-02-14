import { Search, Ticket, LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-0 border-b border-border/40"
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
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                <div className="w-7 h-7 rounded-full gold-gradient flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {initials}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-foreground max-w-[100px] truncate">
                  {displayName}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-destructive/20 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="gold-gradient text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
