const fs = require('fs');

// 1. Update Scene.jsx to use isInteractMode
let sceneFile = fs.readFileSync('src/components/3DScene/Scene.jsx', 'utf8');

sceneFile = sceneFile.replace(/<OrbitControls[\s\S]*?\/>/, `<OrbitControls 
          ref={controlsRef}
          target={target}
          enabled={isInteractMode}
          enableZoom={true} 
          enablePan={true}
          enableRotate={true}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />`);

fs.writeFileSync('src/components/3DScene/Scene.jsx', sceneFile);

// 2. Update ThreeDLabClient.tsx to use the global store
let clientFile = fs.readFileSync('src/app/3d/ThreeDLabClient.tsx', 'utf8');

// Add import
clientFile = clientFile.replace(/import \{ Button \} from "@\/components\/ui\/button";/, `import { Button } from "@/components/ui/button";\nimport { useInteractStore } from "@/store/useInteractStore";`);

// Replace useState
clientFile = clientFile.replace(/const \[isInteracting, setIsInteracting\] = useState\(false\);/, `const { isInteractMode: isInteracting, setIsInteractMode: setIsInteracting } = useInteractStore();`);

fs.writeFileSync('src/app/3d/ThreeDLabClient.tsx', clientFile);
