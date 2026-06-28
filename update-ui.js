const fs = require('fs');

let clientFile = fs.readFileSync('src/app/3d/ThreeDLabClient.tsx', 'utf8');

const newUI = `      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full h-[calc(100vh-theme(spacing.32))] overflow-hidden bg-[#050505] rounded-3xl border border-border/50 mx-auto max-w-[95%] mb-6"
      >
        <div className="absolute inset-0 cursor-move">
          <SceneWrapper route={activeModel} />
        </div>
        
        {/* Top Header */}
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-10 flex flex-row gap-3 justify-between items-start pointer-events-none">
          <div className="bg-background/80 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-border/50 pointer-events-auto flex flex-col justify-center shrink-0">
            <h1 className="text-sm sm:text-xl font-bold font-heading text-foreground m-0">3D Lab</h1>
            <p className="text-[8px] sm:text-xs text-muted-foreground font-mono uppercase tracking-widest hidden sm:block mt-1">Experimental Models</p>
          </div>
          
          {/* Custom Dropdown Selector */}
          <div className="relative pointer-events-auto w-full max-w-[200px] sm:max-w-none sm:w-auto">
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              variant="outline"
              className="w-full sm:w-auto rounded-xl gap-2 sm:gap-3 h-9 sm:h-12 px-3 sm:px-4 bg-background/80 backdrop-blur-md border-border/50 justify-between shadow-[0_0_15px_rgba(var(--color-primary),0.15)]"
            >
              <div className="flex items-center gap-2 truncate">
                <div className="shrink-0 text-primary">{activeModelData.icon}</div>
                <span className="inline font-medium text-xs sm:text-base truncate">{activeModelData.name}</span>
              </div>
              <Icon icon="lucide:chevron-down" className={\`shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground transition-transform duration-300 \${isDropdownOpen ? 'rotate-180' : ''}\`} />
            </Button>
            
            <AnimatePresence>
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
                  <div className="p-1 sm:p-2">
                    {modelCategories.map((category, idx) => (
                      <div key={idx} className="mb-1 last:mb-0">
                        <button 
                          onClick={() => setExpandedCategory(expandedCategory === category.name ? "" : category.name)}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors"
                        >
                          <h3 className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-foreground/80 font-bold truncate pr-2">
                            {category.name}
                          </h3>
                          <Icon 
                            icon="lucide:chevron-down" 
                            className={\`shrink-0 w-3.5 h-3.5 transition-transform duration-300 \${expandedCategory === category.name ? 'rotate-180 text-primary' : 'text-muted-foreground'}\`} 
                          />
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {expandedCategory === category.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-1 gap-1 pt-1 pb-2 px-1">
                                {category.items.map(model => (
                                  <button
                                    key={model.id}
                                    onClick={() => {
                                      setActiveModel(model.id);
                                      setIsDropdownOpen(false);
                                    }}
                                    className={\`flex items-center gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all duration-300 \${
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
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <AnimatePresence>
          {!isInteracting ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none"
            >
              <Button 
                onClick={() => setIsInteracting(true)}
                size="lg"
                className="rounded-full shadow-[0_0_30px_rgba(var(--color-primary),0.3)] gap-2 sm:gap-3 font-mono tracking-widest uppercase px-6 sm:px-8 h-12 sm:h-14 text-[10px] sm:text-sm pointer-events-auto"
              >
                <Icon icon="lucide:mouse-pointer-click" className="w-4 h-4 sm:w-5 sm:h-5" />
                Click to Interact
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-row items-center justify-between gap-3 sm:gap-4 bg-background/80 backdrop-blur-md p-1.5 sm:p-2 pl-4 sm:pl-6 rounded-full border border-border/50 pointer-events-auto shadow-xl w-max max-w-[90vw]"
            >
              <p className="text-[9px] sm:text-xs font-mono tracking-widest uppercase opacity-80 text-center leading-tight truncate">
                <span className="hidden sm:inline">Drag to rotate • Scroll to zoom</span>
                <span className="sm:hidden">1-finger rotate • 2-finger zoom</span>
              </p>
              <Button 
                variant="destructive" 
                size="sm" 
                className="rounded-full px-4 h-8 text-[10px] sm:text-xs font-mono uppercase tracking-wider shrink-0"
                onClick={() => setIsInteracting(false)}
              >
                Exit
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>`;

// Replace from <motion.div ... className="relative w-full h-[calc(100vh-theme(spacing.32))] ... to the end of the file
clientFile = clientFile.replace(/<motion\.div\s+variants=\{containerVariants\}[\s\S]*<\/motion\.div>/, newUI);

fs.writeFileSync('src/app/3d/ThreeDLabClient.tsx', clientFile);
