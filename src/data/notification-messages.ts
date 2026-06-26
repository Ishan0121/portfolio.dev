export type NotificationCategory = 
  | "network_slow"
  | "network_fast"
  | "network_offline"
  | "network_online"
  | "download_resume"
  | "github_fetch_success"
  | "github_fetch_error"
  | "welcome"
  | "dnd_enabled"
  | "dnd_disabled"
  | "form_success"
  | "form_error"
  | "external_link";

type MessageVariation = {
  title: string;
  description?: string;
  icon?: string; // Iconify icon string
};

const messages: Record<NotificationCategory, MessageVariation[]> = {
  network_slow: [
    { title: "Connection Slowed", description: "🌐 Your connection seems a little slow. We're tuning things behind the scenes.", icon: "lucide:wifi-off" },
    { title: "Bandwidth Drop", description: "🛰️ Bandwidth channel weakened. Switching to optimized transmission mode.", icon: "lucide:satellite" },
    { title: "Lag Detected", description: "⏳ Data streams are trickling in. Optimizing assets for low bandwidth.", icon: "lucide:hourglass" },
  ],
  network_fast: [
    { title: "High-Speed Link", description: "⚡ Nice! Your connection is flying. Unlocking the full experience.", icon: "lucide:zap" },
    { title: "Protocol Activated", description: "🌌 High-speed link established. Full visual protocol activated.", icon: "lucide:rocket" },
    { title: "Bandwidth Restored", description: "🚀 Systems are running at maximum capacity. Enjoy the ride.", icon: "lucide:gauge" },
  ],
  network_offline: [
    { title: "Signal Lost", description: "📡 Connection to the mainframe severed. You're exploring in offline mode.", icon: "lucide:wifi-off" },
    { title: "Offline Mode", description: "🚫 We've lost the grid. Caching local data until signal returns.", icon: "lucide:cloud-off" },
  ],
  network_online: [
    { title: "Signal Reacquired", description: "🔌 Reconnected to the grid. Syncing the latest data.", icon: "lucide:wifi" },
    { title: "Back Online", description: "🟢 Mainframe link re-established. All systems go.", icon: "lucide:globe" },
  ],
  download_resume: [
    { title: "Preparing Download", description: "📄 Assembling your requested documents...", icon: "lucide:download" },
    { title: "Data Transfer", description: "📦 Compiling files for local extraction.", icon: "lucide:folder-down" },
    { title: "Extraction Initiated", description: "📥 Download sequence started. Stand by.", icon: "lucide:arrow-down-to-line" },
  ],
  github_fetch_success: [
    { title: "Data Synced", description: "✨ GitHub chronicles retrieved successfully.", icon: "lucide:github" },
    { title: "Logs Updated", description: "📊 Contribution grid synchronized with source.", icon: "lucide:refresh-cw" },
  ],
  github_fetch_error: [
    { title: "Sync Delayed", description: "⚠️ GitHub API is resting. Using cached data for now.", icon: "lucide:alert-circle" },
    { title: "Fetch Timeout", description: "🕰️ Data retrieval taking longer than expected. We'll try again later.", icon: "lucide:clock" },
    { title: "Rate Limited", description: "🛡️ Source is currently shielded. Displaying local archives.", icon: "lucide:shield" },
  ],
  welcome: [
    { title: "Welcome to my Universe", description: "✨ Feel free to explore my portfolio and projects.", icon: "lucide:sparkles" },
    { title: "Hello, Traveler", description: "🌌 Systems are primed and ready for your exploration.", icon: "lucide:compass" },
    { title: "Link Established", description: "🚀 Welcome to the digital nexus. Enjoy your stay.", icon: "lucide:radio-tower" },
  ],
  dnd_enabled: [
    { title: "Silent Mode Active", description: "🌙 Enjoy the peace and quiet. System alerts muted.", icon: "lucide:moon" },
    { title: "Comms Offline", description: "🔇 Focusing protocol engaged. Solitude activated.", icon: "lucide:volume-x" },
    { title: "Do Not Disturb", description: "🧘 Notifications paused. Embrace the loneliness.", icon: "lucide:bell-off" },
  ],
  dnd_disabled: [
    { title: "Comms Online", description: "🔊 Notifications restored. We're back in the loop.", icon: "lucide:volume-2" },
    { title: "Silent Mode Off", description: "🔔 System alerts are active once again.", icon: "lucide:bell-ring" },
  ],
  form_success: [
    { title: "Transmission Sent", description: "🚀 Message successfully relayed to the mainframe.", icon: "lucide:send" },
    { title: "Comm Channel Open", description: "✅ I have received your message and will reply soon.", icon: "lucide:check-circle" },
  ],
  form_error: [
    { title: "Transmission Failed", description: "⚠️ Unable to route your message. Please check your connection.", icon: "lucide:alert-triangle" },
    { title: "System Error", description: "❌ Something went wrong while sending. Let's try again.", icon: "lucide:x-circle" },
  ],
  external_link: [
    { title: "Opening Gateway", description: "🌐 Establishing connection to external network.", icon: "lucide:external-link" },
    { title: "Warp Active", description: "🚀 Transitioning to external coordinate.", icon: "lucide:navigation" },
  ]
};

export function getRandomMessage(category: NotificationCategory, lastIndex?: number): { message: MessageVariation, index: number } {
  const options = messages[category];
  if (!options || options.length === 0) {
    return { 
      message: { title: "Notification", description: "System event occurred." }, 
      index: 0 
    };
  }

  if (options.length === 1) {
    return { message: options[0], index: 0 };
  }

  let index;
  do {
    index = Math.floor(Math.random() * options.length);
  } while (index === lastIndex && lastIndex !== undefined);

  return { message: options[index], index };
}
