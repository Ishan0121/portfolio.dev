import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import { skillsData } from '@/lib/skills-data';

// Constants for layout
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

export function buildGraph() {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const numCats    = skillsData.length;
  const totalWidth = numCats * COL_W + (numCats - 1) * COL_GAP;

  // Root
  const rootX = totalWidth / 2 - ROOT_W / 2;
  nodes.push({
    id: 'root', type: 'root',
    position: { x: rootX, y: 0 },
    data: { label: 'My Skills & Expertise' },
  });

  skillsData.forEach((cat, ci) => {
    const catId  = `cat-${cat.name}`;
    const colX   = ci * (COL_W + COL_GAP);           // left edge of this column

    // Category
    const catX   = colX + (COL_W - CAT_W) / 2;
    const catY   = ROOT_H + ROOT_CAT_V;

    nodes.push({
      id: catId, type: 'category',
      position: { x: catX, y: catY },
      data: { label: cat.name },
    });

    edges.push({
      id: `e-root-${catId}`,
      source: 'root', target: catId,
      type: 'smoothstep', animated: true,
      style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    });

    cat.skills.forEach((skill, si) => {
      const skillId = `skill-${cat.name}-${skill.name}`;
      const skillX  = colX + (COL_W - SKILL_W) / 2;
      const catEstH = 44; 
      const skillY  = catY + catEstH + CAT_SKILL_V + si * (SKILL_H + SKILL_ROW_V);

      nodes.push({
        id: skillId, type: 'skill',
        position: { x: skillX, y: skillY },
        data: { label: skill.name, level: skill.level },
      });

      edges.push({
        id: `e-${catId}-${skillId}`,
        source: catId, target: skillId,
        type: 'smoothstep',
        style: { stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, opacity: 0.35 },
      });
    });
  });

  return { nodes, edges };
}

const { nodes: initialNodes, edges: initialEdges } = buildGraph();

export interface NodeState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  resetGraph: () => void;
}

export const useNodeStore = create<NodeState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodesOrUpdater) => {
    set({ 
      nodes: typeof nodesOrUpdater === 'function' ? nodesOrUpdater(get().nodes) : nodesOrUpdater 
    });
  },
  setEdges: (edgesOrUpdater) => {
    set({ 
      edges: typeof edgesOrUpdater === 'function' ? edgesOrUpdater(get().edges) : edgesOrUpdater 
    });
  },
  resetGraph: () => {
    set({ nodes: initialNodes, edges: initialEdges });
  }
}));
