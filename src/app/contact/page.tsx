"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ContactForm } from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

export default function ContactPage() {
  return (
    <div className="py-12 pt-24 max-w-6xl mx-auto px-6 min-h-[80vh] flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Column - Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-secondary">Let's create something amazing</span> together.
            </h1>
            <p className="text-lg text-muted-foreground">
              Whether you have a project in mind, a question about my work, or just want to say hi, I'm always open to chatting.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <a href="mailto:ishanmaiti1234@gmail.com" className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full glass bg-card/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium group-hover:text-primary transition-colors">ishanmaiti1234@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full glass bg-card/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium group-hover:text-primary transition-colors">Kolkata, India</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50">
            <p className="text-sm font-medium mb-4">Connect with me</p>
            <SocialLinks />
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass shadow-2xl relative overflow-hidden bg-card/40 backdrop-blur-md rounded-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="p-8 relative z-10">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                Send a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
