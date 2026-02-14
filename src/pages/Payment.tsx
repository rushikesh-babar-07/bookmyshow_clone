import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Smartphone, CheckCircle, Ticket, Copy, Calendar, MapPin, Clock, Armchair } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { trendingMovies, recommendedMovies } from "@/data/movies";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const allMovies = [...trendingMovies, ...recommendedMovies];

type PaymentMethod = "debit" | "credit" | "upi";

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "debit", label: "Debit Card", icon: <CreditCard className="w-5 h-5" />, description: "Pay with your bank debit card" },
  { id: "credit", label: "Credit Card", icon: <CreditCard className="w-5 h-5" />, description: "Visa, Mastercard, RuPay" },
  { id: "upi", label: "UPI", icon: <Smartphone className="w-5 h-5" />, description: "Google Pay, PhonePe, Paytm" },
];

const Payment = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("booking");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Fetch booking with showtime + theater
  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking-detail", bookingId],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("bookings")
        .select("*, showtimes(*, theaters(*))")
        .eq("id", bookingId)
        .eq("user_id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!bookingId && !!user,
  });

  const movie = booking ? allMovies.find((m) => m.id === booking.showtimes?.movie_id) : null;

  const confirmMutation = useMutation({
    mutationFn: async () => {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { error } = await (supabase as any)
        .from("bookings")
        .update({ status: "Confirmed" })
        .eq("id", bookingId)
        .eq("user_id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      setIsProcessing(false);
      setIsConfirmed(true);
      queryClient.invalidateQueries({ queryKey: ["booking-detail", bookingId] });
      toast({ title: "Payment Successful! 🎉", description: "Your tickets have been confirmed." });
    },
    onError: () => {
      setIsProcessing(false);
      toast({ title: "Payment Failed", description: "Something went wrong. Please try again.", variant: "destructive" });
    },
  });

  const handlePay = () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    confirmMutation.mutate();
  };

  const copyBookingId = () => {
    if (bookingId) {
      navigator.clipboard.writeText(bookingId);
      toast({ title: "Copied!", description: "Booking ID copied to clipboard." });
    }
  };

  if (!bookingId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-muted-foreground text-lg">Invalid booking.</p>
          <button onClick={() => navigate("/")} className="mt-4 text-primary hover:underline">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <AnimatePresence mode="wait">
          {isConfirmed ? (
            /* ─── Confirmation Screen ─── */
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 sm:p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
              </motion.div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-8">Your tickets are ready. Enjoy the movie!</p>

              <div className="glass-card p-6 text-left space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Booking ID</span>
                  <button onClick={copyBookingId} className="flex items-center gap-1.5 text-sm font-mono text-foreground hover:text-primary transition-colors">
                    {bookingId?.slice(0, 8)}...
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {movie && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Movie</span>
                    <span className="text-sm font-semibold text-foreground">{movie.title}</span>
                  </div>
                )}
                {booking?.showtimes?.theaters && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Theater</span>
                    <span className="text-sm text-foreground">{booking.showtimes.theaters.name}</span>
                  </div>
                )}
                {booking?.showtimes && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Show</span>
                    <span className="text-sm text-foreground">
                      {booking.showtimes.show_date} • {booking.showtimes.show_time?.slice(0, 5)}
                    </span>
                  </div>
                )}
                {booking?.selected_seats && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Seats</span>
                    <span className="text-sm font-semibold text-foreground">{booking.selected_seats.sort().join(", ")}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="text-sm font-semibold text-foreground">Total Paid</span>
                  <span className="text-sm font-bold text-gold-gradient">₹{booking?.total_price}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/")}
                className="gold-gradient text-primary-foreground px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 glow-gold"
              >
                Back to Home
              </button>
            </motion.div>
          ) : (
            /* ─── Payment Screen ─── */
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Complete Payment</h1>

              {/* Booking Summary */}
              {isLoading ? (
                <div className="glass-card p-6 mb-6 animate-pulse space-y-3">
                  <div className="h-4 bg-muted/40 rounded w-3/4" />
                  <div className="h-4 bg-muted/40 rounded w-1/2" />
                  <div className="h-4 bg-muted/40 rounded w-2/3" />
                </div>
              ) : booking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-6 mb-6"
                >
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary" /> Booking Summary
                  </h2>
                  <div className="space-y-3">
                    {movie && (
                      <div className="flex items-center gap-3">
                        <img src={movie.poster} alt={movie.title} className="w-12 h-16 object-cover rounded-lg" />
                        <div>
                          <p className="font-semibold text-foreground">{movie.title}</p>
                          <p className="text-xs text-muted-foreground">{movie.language} • {movie.duration}</p>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{booking.showtimes?.theaters?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{booking.showtimes?.show_date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{booking.showtimes?.show_time?.slice(0, 5)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Armchair className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{booking.selected_seats?.sort().join(", ")}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">{booking.num_tickets} ticket(s)</span>
                      <span className="text-lg font-bold text-gold-gradient">₹{booking.total_price}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payment Methods */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 mb-6"
              >
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">Select Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left
                        ${selectedMethod === method.id
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-border bg-secondary/30 hover:border-primary/40 hover:bg-secondary/50"
                        }`}
                    >
                      <div className={`p-2.5 rounded-lg ${selectedMethod === method.id ? "gold-gradient text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedMethod === method.id ? "border-primary" : "border-border"
                      }`}>
                        {selectedMethod === method.id && <div className="w-2.5 h-2.5 rounded-full gold-gradient" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Pay Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={handlePay}
                  disabled={!selectedMethod || isProcessing}
                  className="w-full gold-gradient text-primary-foreground py-3.5 rounded-full text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 glow-gold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Pay ₹{booking?.total_price || 0}
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Payment;
