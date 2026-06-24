"use client";

import React from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  Handle,
  Position,
  Panel,
  useReactFlow,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNodeStore } from '@/store/useNodeStore';

// ── Sizes & gaps ──────────────────────────────────────────────────────────────
const ROOT_W      = 240;
const ROOT_H      = 56;
const CAT_W       = 180;
const SKILL_W     = 155;
const SKILL_H     = 56;

const COL_W       = 190;   // column slot width (≥ CAT_W ≥ SKILL_W)
const COL_GAP     = 45;    // horizontal gap between columns
const ROOT_CAT_V  = 80;    // root → category vertical gap
const CAT_SKILL_V = 55;    // category → first skill vertical gap
const SKILL_ROW_V = 12;    // gap between skill rows in the same column

// ── Custom nodes ──────────────────────────────────────────────────────────────
function RootNode({ data }: NodeProps) {
  return (
    <div
      style={{ width: ROOT_W }}
      className="rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-2xl flex items-center justify-center px-4 py-3 text-center border border-primary/40"
    >
      {data.label as string}
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}

function CategoryNode({ data }: NodeProps) {
  return (
    <div
      style={{ width: CAT_W }}
      className="rounded-xl glass border border-white/25 text-foreground font-semibold text-xs shadow-lg flex items-center justify-center px-3 py-2.5 text-center leading-snug"
    >
      <Handle type="target" position={Position.Top}    style={{ opacity: 0 }} />
      {data.label as string}
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}

function SkillNode({ data }: NodeProps) {
  const levelColor =
    (data.level as string) === 'Advanced'     ? '#22c55e' :
    (data.level as string) === 'Intermediate' ? '#eab308' : '#60a5fa';

  return (
    <div
      style={{ width: SKILL_W, height: SKILL_H }}
      className="rounded-lg glass border border-white/10 hover:border-primary/40 flex flex-col items-center justify-center px-2 text-center cursor-pointer transition-colors"
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <span className="font-medium text-[11px] text-foreground leading-tight">{data.label as string}</span>
      <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5" style={{ color: levelColor }}>
        {data.level as string}
      </span>
    </div>
  );
}

const nodeTypes = { root: RootNode, category: CategoryNode, skill: SkillNode };

// ── Layout: each category is its own VERTICAL COLUMN ─────────────────────────
// ── Scatter / Reset controls ──────────────────────────────────────────────────
function ScatterControls() {
  const { setNodes, resetGraph } = useNodeStore();
  const { fitView } = useReactFlow();

  const scatter = () => {
    const W = 2400;
    const H = 1400;
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        position: {
          x: Math.random() * W,
          y: Math.random() * H,
        },
      }))
    );
  };

  const reset = () => {
    resetGraph();
    setTimeout(() => fitView({ padding: 0.08 }), 50);
  };

  return (
    <Panel position="top-right">
      <div className="flex flex-col gap-2 p-2">
        <button
          onClick={scatter}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-all shadow-lg"
        >
          <span className="text-base">🌪️</span> Scatter
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-xs font-semibold text-muted-foreground hover:border-white/40 hover:text-foreground transition-all shadow-lg"
        >
          <span className="text-base">🔁</span> Reset
        </button>
      </div>
    </Panel>
  );
}

export function TechTree() {
  const { nodes, edges, onNodesChange, onEdgesChange } = useNodeStore();

  return (
    <div className="w-full glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
         style={{ height: 'calc(100vh - 220px)', minHeight: 600 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.08 }}
        colorMode="dark"
        minZoom={0.1}
        maxZoom={2}
        attributionPosition="bottom-right"
      >
        <Background gap={20} size={1} />
        <Controls showInteractive={false} />
        <ScatterControls />
      </ReactFlow>
    </div>
  );
}
