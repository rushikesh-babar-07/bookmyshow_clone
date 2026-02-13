import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, Ticket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { trendingMovies, recommendedMovies } from "@/data/movies";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);

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

  const totalPrice = useMemo(
    () => selectedSeats.length * (showtime?.price || 250),
    [selectedSeats, showtime]
  );

  const bookMutation = useMutation({
    mutationFn: async () => {
      const { error } = await (supabase as any).from("bookings").insert({
        showtime_id: showtimeId,
        user_id: user!.id,
        num_tickets: selectedSeats.length,
        total_price: totalPrice,
        selected_seats: selectedSeats,
        status: "Pending",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setBookingSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["booked-seats", showtimeId] });
      toast({ title: "Booking Confirmed!", description: `${selectedSeats.length} seat(s) booked successfully.` });
    },
    onError: () => {
      toast({ title: "Booking Failed", description: "Something went wrong. Please try again.", variant: "destructive" });
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

        {/* Success */}
        <AnimatePresence>
          {bookingSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Seats Booked!</h2>
              <p className="text-muted-foreground mb-2">
                Seats: <span className="text-foreground font-semibold">{selectedSeats.sort().join(", ")}</span>
              </p>
              <p className="text-muted-foreground mb-6">Status: Pending</p>
              <button
                onClick={() => navigate("/")}
                className="gold-gradient text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!bookingSuccess && (
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
                      const hasAisle = AISLE_AFTER.includes(seatIdx);

                      return (
                        <span key={seatLabel} className={hasAisle ? "mr-3" : ""}>
                          <motion.button
                            whileHover={!isBooked ? { scale: 1.15 } : {}}
                            whileTap={!isBooked ? { scale: 0.9 } : {}}
                            disabled={isBooked}
                            onClick={() => toggleSeat(seatLabel)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[10px] sm:text-xs font-medium transition-all duration-200
                              ${isBooked
                                ? "bg-muted/60 text-muted-foreground/40 cursor-not-allowed"
                                : isSelected
                                  ? "gold-gradient text-primary-foreground shadow-md glow-gold"
                                  : "border border-border bg-secondary/40 text-secondary-foreground hover:border-primary/60 hover:bg-secondary/70 cursor-pointer"
                              }`}
                            title={isBooked ? "Booked" : seatLabel}
                          >
                            {seatIdx + 1}
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
            <div className="flex justify-center gap-6 mb-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md border border-border bg-secondary/40" />
                <span>Available</span>
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
