const fs = require('fs');
let clientFile = fs.readFileSync('src/app/3d/ThreeDLabClient.tsx', 'utf8');

const targetRegex = /<AnimatePresence>[\s\S]*?<\/AnimatePresence>/m;

const replacement = `<AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[calc(100%+0.5rem)] right-0 w-[240px] sm:w-[280px] bg-background/90 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col max-h-[55vh] overflow-y-auto custom-scrollbar"
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  <div className="p-1 flex flex-col gap-1">
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>`;

clientFile = clientFile.replace(targetRegex, replacement);

fs.writeFileSync('src/app/3d/ThreeDLabClient.tsx', clientFile);
