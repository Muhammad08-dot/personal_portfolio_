import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../utils/animations';
import { siteConfig, skills as skillsData } from '../config/siteConfig';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  BackgroundVariant,
  NodeProps,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const FloatingGeometry = lazy(() => import('../components/3d/FloatingGeometry'));

// --- Custom Node Component ---
const CustomNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div
      className="glow-card"
      style={{
        padding: '12px 20px',
        border: `1px solid ${(data.color as string) || 'var(--border)'}`,
        borderRadius: '8px',
        background: 'var(--bg-secondary)',
        minWidth: '150px',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: data.color ? `0 0 15px ${(data.color as string)}40` : 'none',
      }}
    >
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} style={{ background: (data.color as string) || '#555' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        {Boolean(data.icon) && <span style={{ fontSize: '18px' }}>{data.icon as React.ReactNode}</span>}
        <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
          {data.label as React.ReactNode}
        </span>
      </div>
      {Boolean(data.level) && (
        <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
          {data.level as React.ReactNode}% | {data.years as React.ReactNode}y exp
        </div>
      )}
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} style={{ background: (data.color as string) || '#555' }} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// --- Generate Nodes & Edges from Config ---
const initialNodes: any[] = [
  {
    id: 'root',
    type: 'custom',
    data: { label: 'Muhammad Abdullah', icon: '👨‍💻', color: '#00d4ff' },
    position: { x: 400, y: 50 },
  },
];

const initialEdges: Edge[] = [];

const categories = [
  { key: 'coreAI', label: 'AI & ML', color: '#ff5555', xOffset: -400 },
  { key: 'frontend', label: 'Frontend', color: '#00ff41', xOffset: -150 },
  { key: 'backend', label: 'Backend', color: '#bd93f9', xOffset: 150 },
  { key: 'database', label: 'Database', color: '#f1fa8c', xOffset: 400 },
  { key: 'toolsCloud', label: 'Tools & Cloud', color: '#ffb86c', xOffset: 650 },
];



categories.forEach((cat) => {
  // Category Node
  const catId = `cat-${cat.key}`;
  initialNodes.push({
    id: catId,
    type: 'custom',
    data: { label: cat.label, color: cat.color },
    position: { x: 400 + cat.xOffset, y: 200 },
  });

  initialEdges.push({
    id: `edge-root-${catId}`,
    source: 'root',
    target: catId,
    animated: true,
    style: { stroke: cat.color },
  });

  // Skill Nodes
  const skillsList = (skillsData as any)[cat.key] || [];
  skillsList.forEach((skill: any, index: number) => {
    const skillId = `skill-${cat.key}-${index}`;
    
    // Spread them out underneath the category node
    const spacing = 200;
    const startX = (400 + cat.xOffset) - ((skillsList.length - 1) * spacing) / 2;

    initialNodes.push({
      id: skillId,
      type: 'custom',
      data: { 
        label: skill.name, 
        icon: skill.icon, 
        level: skill.level, 
        years: skill.years,
        color: cat.color 
      },
      position: { x: startX + (index * spacing), y: 400 + (index % 2 === 0 ? 0 : 80) }, // Staggered Y to avoid overlap
    });

    initialEdges.push({
      id: `edge-${catId}-${skillId}`,
      source: catId,
      target: skillId,
      animated: true,
      style: { stroke: cat.color, opacity: 0.5 },
    });
  });
});

export default function Skills() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── Header ── */}
      <section style={{ padding: '60px 24px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '5%', top: '-20px', width: '40%', height: '400px', opacity: 0.4, pointerEvents: 'none' }}>
          <Suspense fallback={null}>
            <FloatingGeometry shape="torusKnot" color="#bd93f9" height="400px" />
          </Suspense>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="section-header">// skills --interactive</motion.p>
            <motion.h1 variants={fadeUp} className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '16px' }}>
              Skill <span style={{ color: 'var(--accent-primary)' }}>Tree</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.7, maxWidth: '600px' }}>
              Drag, zoom, and explore my technical ecosystem. From Agentic AI to Full-Stack Web Development.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Interactive React Flow Canvas (Desktop) & Grid (Mobile) ── */}
      <section style={{ flex: 1, padding: '0 24px 60px' }}>
        
        {/* Desktop View: React Flow */}
        <div className="hidden md:block" style={{ maxWidth: '1400px', margin: '0 auto', height: '600px', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', background: '#0a0a0a', position: 'relative' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.2}
            maxZoom={1.5}
          >
            <Background color="#333" variant={BackgroundVariant.Dots} gap={24} size={1.5} />
            <Controls style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', fill: 'var(--accent-primary)' }} />
            <MiniMap 
              nodeColor={(n) => {
                if (n.data?.color) return n.data.color as string;
                return '#444';
              }}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              maskColor="rgba(0,0,0,0.7)"
            />
          </ReactFlow>
        </div>

        {/* Mobile View: Responsive Grid */}
        <div className="block md:hidden" style={{ maxWidth: '100%', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {categories.map((cat) => {
              const skillsList = (skillsData as any)[cat.key] || [];
              if (skillsList.length === 0) return null;
              
              return (
                <motion.div key={cat.key} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}>
                  <motion.h2 
                    variants={fadeUp} 
                    style={{ 
                      fontFamily: 'JetBrains Mono', 
                      color: cat.color, 
                      fontSize: '20px', 
                      marginBottom: '20px', 
                      borderBottom: `1px solid ${cat.color}40`, 
                      paddingBottom: '8px',
                      display: 'inline-block'
                    }}
                  >
                    // {cat.label}
                  </motion.h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                    {skillsList.map((skill: any) => (
                      <motion.div 
                        key={skill.name} 
                        variants={fadeUp} 
                        className="glow-card" 
                        style={{ 
                          padding: '20px 16px', 
                          border: `1px solid ${cat.color}40`, 
                          borderRadius: '12px', 
                          background: 'var(--bg-secondary)', 
                          textAlign: 'center',
                          boxShadow: `0 4px 20px ${cat.color}10`
                        }}
                      >
                        <div style={{ fontSize: '28px', marginBottom: '12px' }}>{skill.icon}</div>
                        <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{skill.name}</div>
                        <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>{skill.level}% | {skill.years}y exp</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section style={{ padding: '60px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p className="section-header">// expertise</p>
              <h2 className="section-title">By the Numbers</h2>
            </motion.div>

            <motion.div
              variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}
            >
              {[
                { label: 'Languages Known', value: '5+', icon: '🌐', desc: 'JS, TS, SQL, HTML/CSS, Bash' },
                { label: 'Frameworks Used', value: '8+', icon: '⚡', desc: 'CrewAI, LangChain, React, n8n, Node.js, Express, FastAPI, OpenCV' },
                { label: 'Years Coding', value: '1+', icon: '💻', desc: 'Active development on GitHub' },
                { label: 'Autonomous Projects Shipped', value: '10+', icon: '🔗', desc: 'Deployments like LeadBot AI, Agentic Research Bot, and Face Dashboards' },
              ].map(item => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="glow-card"
                  style={{ padding: '28px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '32px', color: 'var(--accent-primary)', marginBottom: '8px' }}>{item.value}</div>
                  <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px' }}>{item.label}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
