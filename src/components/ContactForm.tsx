"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const COOLDOWN_MINUTES = 30;
// We'll hardcode or use environment variable
const web3formsAccessKey = "ca516541-11c7-43f1-b9cd-bb21e64906f2"; // Provide the user's web3forms access key or a fallback

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState<number | null>(null);
  const notify = useNotificationStore((state) => state.notify);

  useEffect(() => {
    const lastSubmission = localStorage.getItem("lastContactSubmission");
    if (lastSubmission) {
      const timeElapsed = Date.now() - parseInt(lastSubmission, 10);
      const minutesElapsed = timeElapsed / (1000 * 60);
      if (minutesElapsed < COOLDOWN_MINUTES) {
        setCooldown(COOLDOWN_MINUTES - minutesElapsed);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (cooldown !== null && cooldown > 0) {
      notify("form_success", { force: true, type: "warning" }); // they've already succeeded recently
      return;
    }

    if (!web3formsAccessKey) {
      notify("form_error", { force: true, type: "error" });
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Combine first_name and last_name for web3forms
    const submissionData = {
      ...data,
      name: `${data.first_name} ${data.last_name}`,
    };
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          ...submissionData,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        notify("form_success", { type: "success" });
        localStorage.setItem("lastContactSubmission", Date.now().toString());
        setCooldown(COOLDOWN_MINUTES);
        (e.target as HTMLFormElement).reset();
      } else {
        notify("form_error", { force: true, type: "error" });
      }
    } catch {
      notify("network_offline", { force: true, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <input
            className="glass flex h-12 w-full px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent placeholder:text-muted-foreground transition-shadow"
            id="first_name"
            name="first_name"
            type="text"
            placeholder="John"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <input
            className="glass flex h-12 w-full px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent placeholder:text-muted-foreground transition-shadow"
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Doe"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <input
          className="glass flex h-12 w-full px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent placeholder:text-muted-foreground transition-shadow"
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          required
          disabled={isSubmitting}
          className="glass flex min-h-[150px] w-full px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 resize-y bg-transparent placeholder:text-muted-foreground transition-shadow"
        />
      </div>
      
      <Button 
        type="submit" 
        variant="outline"
        className="flex items-center justify-center gap-2 h-12 w-full transition-all duration-300 group bg-card/40 hover:bg-primary hover:text-primary-foreground border-border/50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        {!isSubmitting && <Icon icon="lucide:send" className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
      </Button>
    </form>
  );
}
