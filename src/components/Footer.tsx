import { Ticket } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-10 mt-10">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="gold-gradient p-1.5 rounded-md">
          <Ticket className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-foreground">CineVault</span>
      </div>
      <p className="text-xs text-muted-foreground">
        © 2026 CineVault. All rights reserved. Made with 🎬
      </p>
    </div>
  </footer>
);

export default Footer;
