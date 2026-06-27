"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ContactForm } from '@/components/sections/ContactForm';
import SocialLinks from '@/components/shared/SocialLinks';
import { BackgroundGradient } from "@/components/effects/background-gradient";
import { siteConfig } from "@/lib/config";
import { containerVariants, fadeUp } from "@/lib/animations";

export default function ContactClient() {
  return (
    <motion.div 
      className="py-12 lg:pt-24 max-w-6xl mx-auto px-6 min-h-[80vh] flex items-center relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

        {/* Left Column - Info */}
        <motion.div
          variants={fadeUp}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-secondary">Let&apos;s create something amazing</span> together.
            </h1>
            <p className="text-lg text-muted-foreground">
              Whether you have a project in mind, a question about my work, or just want to say hi, I&apos;m always open to chatting.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <a href={`mailto:${siteConfig.socials.email}`} className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full glass bg-card/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Icon icon="lucide:mail" className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium group-hover:text-primary transition-colors">{siteConfig.socials.email}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-12 h-12 rounded-full glass bg-card/40 flex items-center justify-center text-primary">
                <Icon icon="lucide:map-pin" className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{siteConfig.person.location}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50">
            <p className="text-sm font-medium mb-4">Connect with me</p>
            <SocialLinks size="lg" className="justify-start" />
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          variants={fadeUp}
        >
          {/* <BackgroundGradient className="rounded-[22px] p-0.5 sm:p-1 bg-card"> */}
            <div className="glass shadow-2xl relative overflow-hidden bg-card/40 backdrop-blur-md rounded-[20px] h-full w-full">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Icon icon="lucide:message-square" className="w-6 h-6 text-primary" />
                  Send a Message
                </h3>
                <ContactForm />
              </div>
            </div>
          {/* </BackgroundGradient> */}
        </motion.div>

      </div>
    </motion.div>
  );
}
