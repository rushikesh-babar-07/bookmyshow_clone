import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Ticket, Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { trendingMovies, recommendedMovies } from "@/data/movies";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";

const allMovies = [...trendingMovies, ...recommendedMovies];

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const SEATS_PER_ROW = 14;
const AISLE_AFTER = [3, 10]; // gaps after seat index 3 and 10

const SeatSelection = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [searchParams] = useSearchParams();
  const showtimeId = searchParams.get("showtime");
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  

  const movie = allMovies.find((m) => m.id === Number(movieId));

  // Fetch showtime details
  const { data: showtime } = useQuery({
    queryKey: ["showtime-detail", showtimeId],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("showtimes")
        .select("*, theaters(*)")
        .eq("id", showtimeId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!showtimeId,
  });

  // Fetch booked seats for this showtime
  const { data: bookedSeats = [], isLoading } = useQuery({
    queryKey: ["booked-seats", showtimeId],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("bookings")
        .select("selected_seats")
        .eq("showtime_id", showtimeId);
      if (error) throw error;
      return (data as any[]).flatMap((b: any) => b.selected_seats || []);
    },
    enabled: !!showtimeId,
  });

  const toggleSeat = (seatLabel: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatLabel)
        ? prev.filter((s) => s !== seatLabel)
        : [...prev, seatLabel]
    );
  };

  const hotSeats = useMemo(() => {
    if (!bookedSeats.length) return new Set<string>();
    
    const availableSeats = new Set<string>();
    ROWS.forEach((row) => {
      for (let seatIdx = 0; seatIdx < SEATS_PER_ROW; seatIdx++) {
        const seatLabel = `${row}${seatIdx + 1}`;
        if (!bookedSeats.includes(seatLabel)) {
          availableSeats.add(seatLabel);
        }
      }
    });

    // Randomly mark 15-25% of available seats as hot
    const hotCount = Math.ceil(availableSeats.size * (0.15 + Math.random() * 0.1));
    const hotSeatArray = Array.from(availableSeats).sort(() => Math.random() - 0.5).slice(0, hotCount);
    return new Set(hotSeatArray);
  }, [bookedSeats]);

  const totalPrice = useMemo(
    () => selectedSeats.length * (showtime?.price || 250),
    [selectedSeats, showtime]
  );

  const bookMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await (supabase as any).from("bookings").insert({
        showtime_id: showtimeId,
        user_id: user!.id,
        num_tickets: selectedSeats.length,
        total_price: totalPrice,
        selected_seats: selectedSeats,
        status: "Pending",
      }).select("id").single();
      if (error) throw error;
      return data.id;
    },
    onSuccess: (bookingId: string) => {
      queryClient.invalidateQueries({ queryKey: ["booked-seats", showtimeId] });
      navigate(`/payment?booking=${bookingId}`);
    },
    onError: (error: any) => {
      console.error("Booking failed:", error);
    },
  });

  if (!movie || !showtimeId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-muted-foreground text-lg">Invalid selection.</p>
          <button onClick={() => navigate("/")} className="mt-4 text-primary hover:underline">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <button
            onClick={() => navigate(`/book/${movieId}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Showtimes
          </button>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">{movie.title}</h1>
          {showtime && (
            <p className="text-sm text-muted-foreground">
              {showtime.theaters?.name} • {showtime.screen_name} • {showtime.show_time?.slice(0, 5)}
            </p>
          )}
        </motion.div>


        {true && (
          <>
            {/* Screen indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="mx-auto max-w-md h-2 rounded-full gold-gradient opacity-60 mb-2" />
              <p className="text-xs text-muted-foreground tracking-widest uppercase">Screen</p>
            </motion.div>

            {/* Seat Grid */}
            {isLoading ? (
              <div className="flex flex-col items-center gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-80 rounded bg-muted/40" />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-1.5 mb-10 overflow-x-auto pb-4"
              >
                {ROWS.map((row, rowIdx) => (
                  <div key={row} className="flex items-center gap-1">
                    <span className="w-6 text-xs text-muted-foreground font-semibold text-right mr-1">{row}</span>
                    {Array.from({ length: SEATS_PER_ROW }, (_, seatIdx) => {
                       const seatLabel = `${row}${seatIdx + 1}`;
                       const isBooked = bookedSeats.includes(seatLabel);
                       const isSelected = selectedSeats.includes(seatLabel);
                       const isHot = hotSeats.has(seatLabel);
                       const hasAisle = AISLE_AFTER.includes(seatIdx);

                       return (
                         <span key={seatLabel} className={hasAisle ? "mr-3" : ""}>
                           <motion.button
                             whileHover={!isBooked ? { scale: 1.15 } : {}}
                             whileTap={!isBooked ? { scale: 0.9 } : {}}
                             disabled={isBooked}
                             onClick={() => toggleSeat(seatLabel)}
                             className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[10px] sm:text-xs font-medium transition-all duration-200 flex items-center justify-center
                               ${isBooked
                                 ? "bg-muted/60 text-muted-foreground/40 cursor-not-allowed"
                                 : isSelected
                                   ? "gold-gradient text-primary-foreground shadow-md glow-gold"
                                   : isHot
                                     ? "border-2 border-primary bg-secondary/40 text-secondary-foreground hover:border-primary hover:bg-secondary/70 cursor-pointer shadow-md"
                                     : "border border-border bg-secondary/40 text-secondary-foreground hover:border-primary/60 hover:bg-secondary/70 cursor-pointer"
                               }`}
                             title={isBooked ? "Booked" : isHot ? "Hot Seat - Limited Availability" : seatLabel}
                           >
                             {isHot && !isSelected ? <Flame className="w-3 h-3" /> : seatIdx + 1}
                           </motion.button>
                         </span>
                       );
                     })}
                    <span className="w-6 text-xs text-muted-foreground font-semibold ml-1">{row}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mb-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md border border-border bg-secondary/40" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md border-2 border-primary bg-secondary/40 flex items-center justify-center">
                  <Flame className="w-2.5 h-2.5 text-primary" />
                </div>
                <span>Hot Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md gold-gradient" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-muted/60" />
                <span>Booked</span>
              </div>
            </div>

            {/* Floating Booking Bar */}
            <AnimatePresence>
              {selectedSeats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
                >
                  <div className="glass-card px-6 py-3.5 flex items-center gap-5 shadow-2xl">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Seats: </span>
                      <span className="text-foreground font-semibold">{selectedSeats.sort().join(", ")}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Total: </span>
                      <span className="text-foreground font-semibold">₹{totalPrice}</span>
                    </div>
                    <button
                      onClick={() => bookMutation.mutate()}
                      disabled={bookMutation.isPending}
                      className="gold-gradient text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 glow-gold flex items-center gap-2 disabled:opacity-60"
                    >
                      <Ticket className="w-4 h-4" />
                      {bookMutation.isPending ? "Booking..." : "Book Now"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default SeatSelection;
