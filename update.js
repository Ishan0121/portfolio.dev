const fs = require('fs');

// Update ThreeDLabClient.tsx
let clientFile = fs.readFileSync('src/app/3d/ThreeDLabClient.tsx', 'utf8');

const modelsArray = `const models = [
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

clientFile = clientFile.replace(/const models = \[\s*\{ id: "\/",[\s\S]*?\];/m, modelsArray);
clientFile = clientFile.replace('useState("/");', 'useState("/dna-engine");');
fs.writeFileSync('src/app/3d/ThreeDLabClient.tsx', clientFile);

// Update Scene.jsx
let sceneFile = fs.readFileSync('src/components/3DScene/Scene.jsx', 'utf8');

const targets = `  let target = [0, 0, 0];
  if (!route || route === '/dna-engine') target = [0, 0, -8];
  else if (route === '/neural-network') target = [0, 0, -8];
  else if (route === '/cyber-arm') target = [0, 1, -6];
  else if (route === '/cyber-eye') target = [0, 0, -6];
  else if (route === '/bionic-heart') target = [0, 0, -6];
  else if (route === '/quantum-core') target = [0, 0, -6];
  else if (route === '/cyber-spine') target = [0, 0, -6];
  else if (route === '/nexus-gate') target = [0, 0, -6];
  else if (route === '/chronos-dial') target = [0, 0, -6];
  else if (route === '/mecha-lotus') target = [0, -1, -6];
  else if (route === '/plasma-thruster') target = [0, 0, -6];
  else if (route === '/void-cube') target = [0, 0, -6];
  else if (route === '/hover-drone') target = [0, 0, -6];
  else if (route === '/energy-crystal') target = [0, 0, -6];
  else if (route === '/cyber-planet') target = [0, 0, -6];
  else if (route === '/sonic-rings') target = [0, 0, -6];
  else if (route === '/neural-core') target = [0, 0, -6];
  else if (route === '/memory-chip') target = [0, 0, -6];
  else if (route === '/ai-orb') target = [0, 0, -6];
  else if (route === '/hologram-projector') target = [0, 0, -6];
  else if (route === '/cyber-brain') target = [0, 0, -6];
  else if (route === '/data-vault') target = [0, 0, -6];
  else if (route === '/quantum-processor') target = [0, 0, -6];
  else if (route === '/cyber-mask') target = [0, 0, -6];
  else if (route === '/logic-cube') target = [0, 0, -6];
  else if (route === '/mecha-arm') target = [0, 0, -6];
  else if (route === '/android-head') target = [0, 0, -6];
  else if (route === '/robot-core') target = [0, 0, -6];
  else if (route === '/titan-gear') target = [0, 0, -6];
  else if (route === '/neon-rose') target = [0, 0, -6];
  else if (route === '/cyber-orchid') target = [0, 0, -6];
  else if (route === '/quantum-lily') target = [0, 0, -6];`;

sceneFile = sceneFile.replace(/let target = \[0, 0, 0\];[\s\S]*?(?=  return \()/m, targets + '\n\n');

const suspenseContent = `{/* Environment map ensures highly metallic materials have something to reflect, making their base colors visible */}
          <Environment preset="city" />
          
          {(!route || route === '/dna-engine') && <DNAEngine />}
          {route === '/neural-network' && <NeuralNetwork />}
          {route === '/cyber-arm' && <CyberArm />}
          {route === '/cyber-eye' && <CyberEye />}
          {route === '/bionic-heart' && <BionicHeart />}
          {route === '/quantum-core' && <QuantumCore />}
          {route === '/cyber-spine' && <BioSpine />}
          {route === '/nexus-gate' && <NexusGate />}
          {route === '/chronos-dial' && <ChronosDial />}
          {route === '/mecha-lotus' && <MechaLotus />}
          {route === '/plasma-thruster' && <PlasmaThruster />}
          {route === '/void-cube' && <VoidCube />}
          {route === '/hover-drone' && <HoverDrone />}
          {route === '/energy-crystal' && <EnergyCrystal />}
          {route === '/cyber-planet' && <CyberPlanet />}
          {route === '/sonic-rings' && <SonicRings />}
          {route === '/neural-core' && <NeuralCore />}
          {route === '/memory-chip' && <MemoryChip />}
          {route === '/ai-orb' && <AIOrb />}
          {route === '/hologram-projector' && <HologramProjector />}
          {route === '/cyber-brain' && <CyberBrain />}
          {route === '/data-vault' && <DataVault />}
          {route === '/quantum-processor' && <QuantumProcessor />}
          {route === '/cyber-mask' && <CyberMask />}
          {route === '/logic-cube' && <LogicCube />}
          {route === '/mecha-arm' && <MechaArm />}
          {route === '/android-head' && <AndroidHead />}
          {route === '/robot-core' && <RobotCore />}
          {route === '/titan-gear' && <TitanGear />}
          {route === '/neon-rose' && <NeonRose />}
          {route === '/cyber-orchid' && <CyberOrchid />}
          {route === '/quantum-lily' && <QuantumLily />}`;

sceneFile = sceneFile.replace(/\{(\/\* Environment map[\s\S]*?\}|.*<DNAEngine \/\>[\s\S]*?)(?=<\/Suspense>)/m, suspenseContent + '\n        ');

fs.writeFileSync('src/components/3DScene/Scene.jsx', sceneFile);
