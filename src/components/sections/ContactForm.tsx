"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const COOLDOWN_MINUTES = 30;
const web3formsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const contactFormSchema = z.object({
  first_name: z.string().min(2, "First name is too short"),
  last_name: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState<number | null>(null);
  const notify = useNotificationStore((state) => state.notify);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    const updateCooldown = () => {
      const lastSubmission = localStorage.getItem("lastContactSubmission");
      if (lastSubmission) {
        const timeElapsed = Date.now() - parseInt(lastSubmission, 10);
        const minutesElapsed = timeElapsed / (1000 * 60);
        if (minutesElapsed < COOLDOWN_MINUTES) {
          setCooldownRemaining(Math.ceil(COOLDOWN_MINUTES - minutesElapsed));
        } else {
          setCooldownRemaining(null);
        }
      }
    };

    updateCooldown();
    const interval = setInterval(updateCooldown, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    if (cooldownRemaining !== null && cooldownRemaining > 0) {
      notify("form_success", { force: true, type: "warning" }); // already succeeded
      return;
    }

    if (!web3formsAccessKey) {
      notify("form_error", { force: true, type: "error" });
      return;
    }

    setIsSubmitting(true);

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

      if (response.status === 200) {
        notify("form_success", { type: "success" });
        // eslint-disable-next-line react-hooks/purity
        localStorage.setItem("lastContactSubmission", Date.now().toString());
        setCooldownRemaining(COOLDOWN_MINUTES);
        reset();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <input
            className={`glass flex h-12 w-full px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent placeholder:text-muted-foreground transition-shadow ${errors.first_name ? 'focus-visible:ring-destructive border-destructive/50' : 'focus-visible:ring-primary/50'}`}
            id="first_name"
            type="text"
            placeholder="John"
            disabled={isSubmitting}
            {...register("first_name")}
          />
          {errors.first_name && <p className="text-xs text-destructive mt-1">{errors.first_name.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <input
            className={`glass flex h-12 w-full px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent placeholder:text-muted-foreground transition-shadow ${errors.last_name ? 'focus-visible:ring-destructive border-destructive/50' : 'focus-visible:ring-primary/50'}`}
            id="last_name"
            type="text"
            placeholder="Doe"
            disabled={isSubmitting}
            {...register("last_name")}
          />
          {errors.last_name && <p className="text-xs text-destructive mt-1">{errors.last_name.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <input
          className={`glass flex h-12 w-full px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent placeholder:text-muted-foreground transition-shadow ${errors.email ? 'focus-visible:ring-destructive border-destructive/50' : 'focus-visible:ring-primary/50'}`}
          id="email"
          type="email"
          placeholder="john@example.com"
          disabled={isSubmitting}
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Message</label>
        <textarea
          id="message"
          placeholder="Tell me about your project..."
          disabled={isSubmitting}
          className={`glass flex min-h-[150px] w-full px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y bg-transparent placeholder:text-muted-foreground transition-shadow ${errors.message ? 'focus-visible:ring-destructive border-destructive/50' : 'focus-visible:ring-primary/50'}`}
          {...register("message")}
        />
        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        variant="outline"
        className="flex items-center justify-center gap-2 h-12 w-full transition-all duration-300 group bg-card/40 hover:bg-primary hover:text-primary-foreground border-border/50 disabled:opacity-50 disabled:hover:bg-card/40 disabled:hover:text-foreground"
        disabled={isSubmitting || (cooldownRemaining !== null && cooldownRemaining > 0)}
      >
        {isSubmitting ? (
          "Sending..."
        ) : cooldownRemaining !== null && cooldownRemaining > 0 ? (
          `Try again in ${cooldownRemaining} min`
        ) : (
          <>
            Send Message
            <Icon icon="lucide:send" className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </Button>
    </form>
  );
}
