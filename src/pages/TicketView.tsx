import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Download, QrCode, Ticket, Calendar, MapPin, Clock, Armchair, Film } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { trendingMovies, recommendedMovies } from "@/data/movies";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const allMovies = [...trendingMovies, ...recommendedMovies];

const TicketView = () => {
  const { bookingId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["ticket-detail", bookingId],
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

  const copyId = () => {
    if (bookingId) {
      navigator.clipboard.writeText(bookingId);
      toast({ title: "Copied!", description: "Booking ID copied to clipboard." });
    }
  };

  const handleDownload = () => {
    toast({ title: "Download Started", description: "Your ticket PDF is being prepared." });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen page-gradient">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 max-w-lg">
          <div className="glass-card p-8 animate-pulse space-y-4">
            <div className="h-6 bg-muted/40 rounded w-1/2 mx-auto" />
            <div className="h-40 bg-muted/40 rounded" />
            <div className="h-4 bg-muted/40 rounded w-3/4 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!booking || booking.status !== "Confirmed") {
    return (
      <div className="min-h-screen page-gradient">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-muted-foreground text-lg">Ticket not found or not yet confirmed.</p>
          <button onClick={() => navigate("/my-bookings")} className="mt-4 text-primary hover:underline text-sm">
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-gradient">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-lg">
        <button
          onClick={() => navigate("/my-bookings")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> My Bookings
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
          {/* Ticket Header */}
          <div className="gold-gradient p-6 text-center relative">
            <Ticket className="w-8 h-8 text-primary-foreground mx-auto mb-2" />
            <h1 className="font-display text-xl font-bold text-primary-foreground">Movie Ticket</h1>
            <p className="text-primary-foreground/80 text-xs mt-1">Confirmed</p>
            {/* Scalloped edge */}
            <div className="absolute -bottom-3 left-0 right-0 flex justify-between px-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-card" />
              ))}
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 pt-8 space-y-5">
            {/* Movie Info */}
            <div className="flex items-center gap-4">
              {movie && (
                <img src={movie.poster} alt={movie.title} className="w-16 h-24 object-cover rounded-xl" />
              )}
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {movie?.title || booking.showtimes?.movie_title}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {movie?.language} • {movie?.duration} • {movie?.genre?.join(", ")}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <DetailItem icon={<MapPin className="w-4 h-4" />} label="Theater" value={booking.showtimes?.theaters?.name} />
              <DetailItem icon={<Film className="w-4 h-4" />} label="Location" value={booking.showtimes?.theaters?.location} />
              <DetailItem icon={<Calendar className="w-4 h-4" />} label="Date" value={booking.showtimes?.show_date} />
              <DetailItem icon={<Clock className="w-4 h-4" />} label="Time" value={booking.showtimes?.show_time?.slice(0, 5)} />
              <DetailItem icon={<Armchair className="w-4 h-4" />} label="Seats" value={booking.selected_seats?.sort().join(", ")} />
              <DetailItem icon={<Ticket className="w-4 h-4" />} label="Screen" value={booking.showtimes?.screen_name} />
            </div>

            {/* QR Code Placeholder */}
            <div className="flex flex-col items-center py-4 border-t border-dashed border-border">
              <div className="w-32 h-32 bg-secondary rounded-xl flex items-center justify-center mb-3 border border-border">
                <QrCode className="w-20 h-20 text-muted-foreground/40" />
              </div>
              <p className="text-xs text-muted-foreground">Scan at entry</p>
            </div>

            {/* Booking ID + Price */}
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Booking ID</span>
                <button onClick={copyId} className="flex items-center gap-1.5 text-xs font-mono text-foreground hover:text-primary transition-colors">
                  {bookingId?.slice(0, 8)}...
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Total Paid</span>
                <span className="text-lg font-bold text-gold-gradient">₹{booking.total_price}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleDownload}
          className="w-full mt-6 gold-gradient text-primary-foreground py-3.5 rounded-full text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 glow-gold flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" /> Download Ticket
        </motion.button>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => (
  <div className="space-y-1">
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">{icon}{label}</span>
    <p className="text-sm font-semibold text-foreground pl-5.5">{value || "—"}</p>
  </div>
);

export default TicketView;
