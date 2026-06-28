const fs = require('fs');
let clientFile = fs.readFileSync('src/app/3d/ThreeDLabClient.tsx', 'utf8');

const flatModels = `const models = [
  // Cyber / Tech
  { id: "/neural-core", name: "Neural Core", icon: <Icon icon="lucide:cpu" width={18} height={18} /> },
  { id: "/memory-chip", name: "Memory Chip", icon: <Icon icon="lucide:hard-drive" width={18} height={18} /> },
  { id: "/ai-orb", name: "AI Orb", icon: <Icon icon="lucide:orbit" width={18} height={18} /> },
  { id: "/hologram-projector", name: "Hologram Projector", icon: <Icon icon="lucide:projector" width={18} height={18} /> },
  { id: "/cyber-brain", name: "Cyber Brain", icon: <Icon icon="lucide:brain" width={18} height={18} /> },
  { id: "/data-vault", name: "Data Vault", icon: <Icon icon="lucide:lock" width={18} height={18} /> },
  { id: "/quantum-processor", name: "Quantum Processor", icon: <Icon icon="lucide:cpu" width={18} height={18} /> },
  { id: "/cyber-mask", name: "Cyber Mask", icon: <Icon icon="lucide:user" width={18} height={18} /> },
  { id: "/logic-cube", name: "Logic Cube", icon: <Icon icon="lucide:box" width={18} height={18} /> },
  { id: "/cyber-eye", name: "Cyber Eye", icon: <Icon icon="lucide:eye" width={18} height={18} /> },
  { id: "/cyber-arm", name: "Data Core", icon: <Icon icon="lucide:database" width={18} height={18} /> },
  { id: "/neural-network", name: "Neural Network", icon: <Icon icon="lucide:network" width={18} height={18} /> },

  // Mechanical / Robotics
  { id: "/mecha-lotus", name: "Mecha Lotus", icon: <Icon icon="lucide:flower-2" width={18} height={18} /> },
  { id: "/hover-drone", name: "Hover Drone", icon: <Icon icon="lucide:bot" width={18} height={18} /> },
  { id: "/bionic-heart", name: "Bionic Heart", icon: <Icon icon="lucide:heart" width={18} height={18} /> },
  { id: "/cyber-spine", name: "Cyber Spine", icon: <Icon icon="lucide:activity" width={18} height={18} /> },
  { id: "/mecha-arm", name: "Mecha Arm", icon: <Icon icon="lucide:hammer" width={18} height={18} /> },
  { id: "/android-head", name: "Android Head", icon: <Icon icon="lucide:smile" width={18} height={18} /> },
  { id: "/robot-core", name: "Robot Core", icon: <Icon icon="lucide:circle-dot" width={18} height={18} /> },
  { id: "/titan-gear", name: "Titan Gear", icon: <Icon icon="lucide:settings" width={18} height={18} /> },

  // Space / Cosmic
  { id: "/cyber-planet", name: "Cyber Planet", icon: <Icon icon="lucide:globe" width={18} height={18} /> },
  { id: "/quantum-core", name: "Quantum Core", icon: <Icon icon="lucide:atom" width={18} height={18} /> },
  { id: "/nexus-gate", name: "Nexus Gate", icon: <Icon icon="lucide:aperture" width={18} height={18} /> },
  { id: "/plasma-thruster", name: "Plasma Thruster", icon: <Icon icon="lucide:rocket" width={18} height={18} /> },

  // Fantasy & Abstract
  { id: "/dna-engine", name: "DNA Engine", icon: <Icon icon="lucide:dna" width={18} height={18} /> },
  { id: "/energy-crystal", name: "Energy Crystal", icon: <Icon icon="lucide:gem" width={18} height={18} /> },
  { id: "/chronos-dial", name: "Chronos Dial", icon: <Icon icon="lucide:clock" width={18} height={18} /> },
  { id: "/void-cube", name: "Void Cube", icon: <Icon icon="lucide:box" width={18} height={18} /> },
  { id: "/sonic-rings", name: "Sonic Rings", icon: <Icon icon="lucide:disc-3" width={18} height={18} /> },
  { id: "/neon-rose", name: "Neon Rose", icon: <Icon icon="lucide:flower" width={18} height={18} /> },
  { id: "/cyber-orchid", name: "Cyber Orchid", icon: <Icon icon="lucide:flower-2" width={18} height={18} /> },
  { id: "/quantum-lily", name: "Quantum Lily", icon: <Icon icon="lucide:droplet" width={18} height={18} /> },
];`;

clientFile = clientFile.replace(/const modelCategories = \[\s*\{[\s\S]*?\];\s*const models = modelCategories\.flatMap\(c => c\.items\);/m, flatModels);

clientFile = clientFile.replace(/\s*const \[expandedCategory, setExpandedCategory\] = useState\("Fantasy & Abstract"\);/g, '');

const dropdownCode = `<div className="p-1 flex flex-col gap-1">
                    {models.map(model => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setActiveModel(model.id);
                          setIsDropdownOpen(false);
                        }}
                        className={\`flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm transition-all duration-300 \${
                          activeModel === model.id 
                            ? 'bg-primary/15 text-primary font-bold border border-primary/30' 
                            : 'text-foreground/80 hover:bg-primary/10 border border-transparent hover:border-primary/20'
                        }\`}
                      >
                        <div className={\`shrink-0 p-1.5 sm:p-2 rounded-md \${activeModel === model.id ? 'bg-primary/20 text-primary' : 'bg-background/50'}\`}>
                          {model.icon}
                        </div>
                        <span className="text-left truncate">{model.name}</span>
                      </button>
                    ))}
                  </div>`;

clientFile = clientFile.replace(/<div className="p-1 sm:p-2">[\s\S]*?<\/div>(\s*<\/motion\.div>)/, dropdownCode + '$1');

fs.writeFileSync('src/app/3d/ThreeDLabClient.tsx', clientFile);
