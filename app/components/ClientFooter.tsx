import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function ClientFooter() {
  return (
    <footer className="bg-black text-white pb-10">
      <div className="mx-auto max-w-7xl px-4 text-center">
        
        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="#" className="hover:text-gray-400 transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <Linkedin size={20} />
          </a>
        </div>

        {/* Text Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Services</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-xs text-gray-600">
          © {new Date().getFullYear()} Industria. All rights reserved.
        </p>
      </div>
    </footer>
  );
}