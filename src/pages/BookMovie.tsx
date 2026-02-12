import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Clock, IndianRupee, Monitor, Ticket, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { trendingMovies, recommendedMovies } from "@/data/movies";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const allMovies = [...trendingMovies, ...recommendedMovies];

const BookMovie = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const movie = allMovies.find((m) => m.id === Number(movieId));

  const { data: showtimes, isLoading } = useQuery({
    queryKey: ["showtimes", movieId],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("showtimes")
        .select("*, theaters(*)")
        .eq("movie_id", Number(movieId))
        .order("show_time", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!movieId,
  });

  const bookMutation = useMutation({
    mutationFn: async (showtimeId: string) => {
      const showtime = showtimes?.find((s: any) => s.id === showtimeId);
      if (!showtime) throw new Error("Showtime not found");

      const { error } = await (supabase as any).from("bookings").insert({
        showtime_id: showtimeId,
        user_id: user!.id,
        num_tickets: 1,
        total_price: showtime.price,
        status: "Pending",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setBookingSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["showtimes", movieId] });
      toast({ title: "Booking Confirmed!", description: "Your ticket has been booked. Status: Pending." });
    },
    onError: () => {
      toast({ title: "Booking Failed", description: "Something went wrong. Please try again.", variant: "destructive" });
    },
  });

  // Group showtimes by theater
  const theaterMap = new Map<string, { theater: any; showtimes: any[] }>();
  showtimes?.forEach((st: any) => {
    const tid = st.theater_id;
    if (!theaterMap.has(tid)) {
      theaterMap.set(tid, { theater: st.theaters, showtimes: [] });
    }
    theaterMap.get(tid)!.showtimes.push(st);
  });

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-muted-foreground text-lg">Movie not found.</p>
          <button onClick={() => navigate("/")} className="mt-4 text-primary hover:underline">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Movies
          </button>

          <div className="flex items-start gap-6">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-24 h-36 object-cover rounded-xl shadow-lg hidden sm:block"
            />
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>{movie.language}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span>•</span>
                <span>{movie.genre.join(", ")}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success State */}
        <AnimatePresence>
          {bookingSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 text-center mb-10"
            >
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Booking Successful!</h2>
              <p className="text-muted-foreground mb-6">Your booking is pending confirmation. Enjoy the movie!</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setBookingSuccess(false); setSelectedShowtime(null); }}
                  className="px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  Book Another
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="gold-gradient text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Theater Cards */}
        {!bookingSuccess && (
          <>
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              🎬 Theaters Showing <span className="text-gold-gradient">{movie.title}</span>
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-40 rounded-2xl bg-muted/40" />
                ))}
              </div>
            ) : theaterMap.size === 0 ? (
              <div className="glass-card p-12 text-center">
                <p className="text-muted-foreground">No showtimes available for this movie.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {Array.from(theaterMap.values()).map(({ theater, showtimes: sts }, idx) => (
                  <motion.div
                    key={theater.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="glass-card p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                       <div>
                         <h3 className="font-display text-xl font-bold text-foreground tracking-tight">{theater.name}</h3>
                         <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2 font-medium">
                           <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                           <span>{theater.location} — {theater.address}</span>
                         </div>
                       </div>
                      <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full self-start">
                        {theater.screen_count} screens
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4">
                       {sts.map((st: any) => {
                         const timeStr = st.show_time.slice(0, 5);
                         const isSelected = selectedShowtime === st.id;
                         return (
                           <motion.button
                             key={st.id}
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.97 }}
                             onClick={() => setSelectedShowtime(isSelected ? null : st.id)}
                             className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all duration-300 ${
                               isSelected
                                 ? "border-primary bg-primary/10 glow-gold shadow-lg"
                                 : "border-border bg-secondary/50 hover:border-primary/60 hover:bg-secondary/70 hover:shadow-md"
                             }`}
                           >
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                              <Clock className="w-3.5 h-3.5" />
                              {timeStr}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-0.5">
                                <Monitor className="w-3 h-3" /> {st.screen_name}
                              </span>
                              <span className="flex items-center gap-0.5">
                                <IndianRupee className="w-3 h-3" /> {st.price}
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Book Button */}
            <AnimatePresence>
              {selectedShowtime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
                >
                  <button
                    onClick={() => bookMutation.mutate(selectedShowtime)}
                    disabled={bookMutation.isPending}
                    className="gold-gradient text-primary-foreground px-8 py-3.5 rounded-full text-base font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 glow-gold flex items-center gap-2 shadow-2xl disabled:opacity-60"
                  >
                    <Ticket className="w-5 h-5" />
                    {bookMutation.isPending ? "Booking..." : "Confirm Booking"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default BookMovie;
