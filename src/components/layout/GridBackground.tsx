"use client";

export function GridBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 opacity-30 transition-opacity duration-300 hover:opacity-100 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgb(55 65 81 / 0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(55 65 81 / 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: 'center center'
      }}
    />
  );
}
