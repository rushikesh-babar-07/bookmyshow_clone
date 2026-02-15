import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Ticket, Calendar, MapPin, Clock, Armchair, ChevronRight, Film } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { trendingMovies, recommendedMovies } from "@/data/movies";
import Navbar from "@/components/Navbar";

const allMovies = [...trendingMovies, ...recommendedMovies];

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["my-bookings", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("bookings")
        .select("*, showtimes(*, theaters(*))")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen page-gradient">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Ticket className="w-7 h-7 text-primary" /> My Bookings
          </h1>
          <p className="text-muted-foreground text-sm mb-8">All your movie tickets in one place</p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse space-y-3">
                <div className="h-5 bg-muted/40 rounded w-1/2" />
                <div className="h-4 bg-muted/40 rounded w-3/4" />
                <div className="h-4 bg-muted/40 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : !bookings?.length ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
            <Film className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">No bookings yet</h2>
            <p className="text-muted-foreground text-sm mb-6">Start by booking your first movie ticket!</p>
            <button
              onClick={() => navigate("/")}
              className="gold-gradient text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Browse Movies
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking: any, i: number) => {
              const movie = allMovies.find((m) => m.id === booking.showtimes?.movie_id);
              const isConfirmed = booking.status === "Confirmed";
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => isConfirmed && navigate(`/ticket/${booking.id}`)}
                  className={`glass-card p-5 transition-all duration-200 ${isConfirmed ? "cursor-pointer hover:border-primary/40 hover:scale-[1.01]" : ""}`}
                >
                  <div className="flex gap-4">
                    {movie && (
                      <img src={movie.poster} alt={movie.title} className="w-16 h-24 object-cover rounded-xl flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display text-base font-semibold text-foreground truncate">
                          {movie?.title || booking.showtimes?.movie_title}
                        </h3>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
                          isConfirmed
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 flex-shrink-0" /> {booking.showtimes?.theaters?.name}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 flex-shrink-0" /> {booking.showtimes?.show_date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 flex-shrink-0" /> {booking.showtimes?.show_time?.slice(0, 5)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Armchair className="w-3 h-3 flex-shrink-0" /> {booking.selected_seats?.sort().join(", ")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border">
                        <span className="text-sm font-bold text-gold-gradient">₹{booking.total_price}</span>
                        {isConfirmed && (
                          <span className="text-xs text-primary flex items-center gap-1">
                            View Ticket <ChevronRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
