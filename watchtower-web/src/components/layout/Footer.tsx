import Container from "../ui/Container";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <Container>
        <div className="py-16">

          <div className="grid gap-10 md:grid-cols-3">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600">
                  <Shield className="text-white" size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    WatchTower
                  </h2>

                  <p className="text-sm text-gray-400">
                    Smart Community Safety
                  </p>
                </div>
              </div>

              <p className="mt-6 leading-7 text-gray-400">
                WatchTower helps communities report emergencies,
                track incidents and improve public safety through
                real-time technology.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-xl font-semibold">
                Quick Links
              </h3>

              <ul className="space-y-4 text-gray-400">

                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Home
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Features
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Report Incident
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Login
                  </a>
                </li>

              </ul>
            </div>

            {/* Contact */}
            <div>

              <h3 className="mb-6 text-xl font-semibold">
                Contact
              </h3>

              <div className="space-y-4 text-gray-400">

                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  support@watchtower.com
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  +234 8154164335
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  Lagos, Nigeria
                </div>

              </div>

            </div>

          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-center text-gray-500">
            © {new Date().getFullYear()} WatchTower. All Rights Reserved.
          </div>

        </div>
      </Container>
    </footer>
  );
}