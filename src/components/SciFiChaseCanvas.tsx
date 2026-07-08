import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type GameMode = 'idle' | 'starting' | 'playing' | 'gameover';

export default function SciFiChaseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;
    
    // Game State
    let mode: GameMode = 'idle';
    let score = 0;
    let shields = 3;
    let invulnerableTimer = 0;
    let countdown = 3;
    let lastTime = performance.now();
    let frameCount = 0;

    // Input State
    const keys = { up: false, down: false, shoot: false };
    let lastShotTime = 0;

    // Entity State
    const rebel = { base_x: 0, x: 0, y: 0, vy: 0, targetY: 0, roll: 0, rollTarget: 0, radius: 25 };
    const cruiser = { base_x: 0, x: 0, y: 0, vy: 0, radius: 50 };
    const enemyLasers: { x: number; y: number; speed: number; active: boolean }[] = [];
    const playerLasers: { x: number; y: number; speed: number; active: boolean }[] = [];
    
    // Grid animation
    let gridOffset = 0;
    const stars: { x: number; y: number; speed: number; size: number }[] = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 2 + 0.5,
      size: Math.random() * 1.5 + 0.5
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        
        if (mode === 'idle') {
            rebel.y = height / 2;
            rebel.targetY = height / 2;
            cruiser.y = height / 2;
        }
      }
    };
    
    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    
    window.addEventListener('resize', resize);
    resize();

    // Input Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isExpanded) return;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') { keys.up = true; e.preventDefault(); }
      if (e.code === 'ArrowDown' || e.code === 'KeyS') { keys.down = true; e.preventDefault(); }
      if (e.code === 'Space') { keys.shoot = true; e.preventDefault(); }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isExpanded) return;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') keys.up = false;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') keys.down = false;
      if (e.code === 'Space') keys.shoot = false;
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    // Initializer
    const startGame = () => {
      score = 0;
      shields = 3;
      invulnerableTimer = 0;
      countdown = 3;
      enemyLasers.length = 0;
      playerLasers.length = 0;
      mode = 'starting';
      rebel.y = height / 2;
      cruiser.y = height / 2;
    };

    // Canvas click to start
    const handleCanvasClick = () => {
      if (mode === 'idle') {
        setIsExpanded(true);
        startGame();
      } else if (mode === 'gameover') {
        startGame();
      }
    };
    canvas.addEventListener('click', handleCanvasClick);

    // ==========================================
    // DRAWING FUNCTIONS
    // ==========================================
    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.05)';
      ctx.lineWidth = 1;
      
      const gridSize = 40;
      gridOffset = (gridOffset + (mode === 'playing' ? 1.5 : 0.5)) % gridSize;

      for (let x = -gridOffset; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
      ctx.restore();
    };

    const drawRebel = (x: number, y: number, roll: number, isHit: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      const scaleY = Math.cos(roll);
      ctx.scale(1, scaleY);
      
      ctx.shadowBlur = 10;
      ctx.shadowColor = isHit ? '#FF0000' : '#00FF00';

      // Internal details
      ctx.strokeStyle = isHit ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(8, 0); ctx.lineTo(0, 3); ctx.lineTo(-5, 0); ctx.lineTo(0, -3); ctx.closePath();
      ctx.moveTo(-5, 2); ctx.lineTo(-2, 10); ctx.moveTo(-5, -2); ctx.lineTo(-2, -10);
      ctx.stroke();

      // Main Hull
      ctx.strokeStyle = isHit ? '#FF0000' : '#00FF00';
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.moveTo(25, 0); ctx.lineTo(5, 5); ctx.lineTo(-15, 4); ctx.lineTo(-20, 0); ctx.lineTo(-15, -4); ctx.lineTo(5, -5); ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 5); ctx.lineTo(-15, 25); ctx.lineTo(-20, 25); ctx.lineTo(-10, 4);
      ctx.moveTo(0, -5); ctx.lineTo(-15, -25); ctx.lineTo(-20, -25); ctx.lineTo(-10, -4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, 25); ctx.lineTo(5, 25); ctx.moveTo(-18, -25); ctx.lineTo(5, -25);
      ctx.stroke();

      // Engines Glow
      ctx.beginPath();
      ctx.fillStyle = isHit ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 255, 0, 0.8)';
      ctx.ellipse(-20, 2, 4, 1.5, 0, 0, Math.PI * 2);
      ctx.ellipse(-20, -2, 4, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shield graphic if playing and hit
      if (invulnerableTimer > 0 && Math.floor(frameCount / 5) % 2 === 0) {
        ctx.beginPath();
        ctx.arc(0, 0, 35, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.4)';
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawCruiser = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00FF00';
      
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-30, 0); ctx.lineTo(30, 0);
      ctx.moveTo(-40, 10); ctx.lineTo(15, 10);
      ctx.moveTo(-40, -10); ctx.lineTo(15, -10);
      ctx.moveTo(-50, 20); ctx.lineTo(0, 20);
      ctx.moveTo(-50, -20); ctx.lineTo(0, -20);
      for (let i = -50; i < 20; i += 15) { ctx.moveTo(i, -i * 0.4); ctx.lineTo(i, i * 0.4); }
      ctx.stroke();

      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 0); ctx.lineTo(-60, 40); ctx.lineTo(-50, 0); ctx.lineTo(-60, -40); ctx.closePath();
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(-40, 15); ctx.lineTo(-40, -15); ctx.lineTo(-25, -8); ctx.lineTo(-25, 8); ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-35, 8); ctx.lineTo(-30, 8); ctx.moveTo(-35, 0); ctx.lineTo(-25, 0); ctx.moveTo(-35, -8); ctx.lineTo(-30, -8);
      ctx.stroke();

      ctx.fillStyle = '#00FF00';
      const drawTurret = (tx: number, ty: number) => {
        ctx.beginPath(); ctx.arc(tx, ty, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      };
      drawTurret(10, 15); drawTurret(10, -15); drawTurret(-10, 22); drawTurret(-10, -22);

      ctx.fillStyle = 'rgba(0, 255, 0, 0.9)';
      ctx.beginPath();
      ctx.arc(-55, 20, 4, 0, Math.PI * 2); ctx.arc(-55, -20, 4, 0, Math.PI * 2); ctx.arc(-50, 0, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawLaser = (x: number, y: number, isEnemy: boolean) => {
      ctx.save();
      ctx.strokeStyle = isEnemy ? '#FF0000' : '#00FF00';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = isEnemy ? '#FF0000' : '#00FF00';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (isEnemy ? 40 : -40), y);
      ctx.stroke();
      ctx.restore();
    };

    // UI Drawing
    const drawUI = () => {
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00FF00';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE: ${score.toString().padStart(5, '0')}`, 20, 40);
      
      ctx.textAlign = 'right';
      ctx.fillText(`SHIELDS: [${'|'.repeat(shields)}${' '.repeat(3 - shields)}]`, width - 20, 40);
    };

    const drawCenterText = (text: string, subtext?: string, blink = false) => {
      if (blink && Math.floor(frameCount / 30) % 2 === 0) return;
      ctx.font = 'bold 24px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00FF00';
      ctx.textAlign = 'center';
      ctx.fillText(text, width / 2, height / 2);
      if (subtext) {
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.fillText(subtext, width / 2, height / 2 + 40);
      }
    };

    // ==========================================
    // GAME LOOP
    // ==========================================
    const loop = () => {
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;
      frameCount++;

      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, width, height);
      drawGrid();

      // Stars logic
      const starSpeedMulti = mode === 'playing' ? 3 : 1;
      stars.forEach(s => {
        ctx.fillStyle = `rgba(0, 255, 0, ${s.size * 0.4})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
        s.x -= s.speed * starSpeedMulti;
        if (s.x < 0) { s.x = width; s.y = Math.random() * height; }
      });

      // Base Positions (Rebel right, Cruiser left)
      rebel.base_x = width * 0.8;
      cruiser.base_x = width * 0.15;

      if (mode === 'idle') {
        rebel.x = rebel.base_x + Math.sin(frameCount * 0.04) * 40;
        cruiser.x = cruiser.base_x + Math.sin(frameCount * 0.02) * 20;
        
        let dodging = false;
        const incoming = enemyLasers.find(l => l.x < rebel.x + 30 && l.x > rebel.x - 250 && Math.abs(l.y - rebel.y) < 30);
        if (incoming) {
          dodging = true;
          rebel.targetY = incoming.y > rebel.y ? rebel.y - 60 : rebel.y + 60;
          if (rebel.targetY < 40) rebel.targetY = 60;
          if (rebel.targetY > height - 40) rebel.targetY = height - 60;
          if (Math.random() > 0.6 && Math.abs(rebel.rollTarget - rebel.roll) < 0.1) rebel.rollTarget += Math.PI * 2;
        }
        if (!dodging && frameCount % 90 === 0 && Math.random() > 0.4) {
          rebel.targetY = height / 2 + (Math.random() * 120 - 60);
        }
        rebel.y += (rebel.targetY - rebel.y) * 0.06;
        cruiser.y += (rebel.y - cruiser.y) * 0.02;

        if (frameCount % 50 === 0 && Math.random() > 0.3) {
          enemyLasers.push({ x: cruiser.x + 10, y: cruiser.y + 15, speed: 20, active: true });
          enemyLasers.push({ x: cruiser.x + 10, y: cruiser.y - 15, speed: 20, active: true });
        }
        
        drawCenterText("CLICK TO ENGAGE MISSION CONTROL", "START GAME", true);
        ctx.textAlign = 'left';
        ctx.font = '14px "JetBrains Mono", monospace';
        ctx.fillText('~ galactic_radar_scan.sh', 20, 30);
      } 
      else if (mode === 'starting') {
        if (frameCount % 60 === 0) countdown--;
        if (countdown <= 0) {
            mode = 'playing';
            invulnerableTimer = 100;
        } else {
            drawCenterText(`INITIATING: ${countdown}...`);
        }
        rebel.x = rebel.base_x;
        cruiser.x = cruiser.base_x;
      }
      else if (mode === 'playing') {
        score += 1; // Survival points
        if (invulnerableTimer > 0) invulnerableTimer--;

        // Player Input
        if (keys.up) rebel.vy -= 1.5;
        if (keys.down) rebel.vy += 1.5;
        rebel.vy *= 0.9; // Friction
        rebel.y += rebel.vy;
        
        if (rebel.y < 30) { rebel.y = 30; rebel.vy = 0; }
        if (rebel.y > height - 30) { rebel.y = height - 30; rebel.vy = 0; }

        // Player Shoot (shoot left towards cruiser)
        if (keys.shoot && now - lastShotTime > 200) {
            playerLasers.push({ x: rebel.x - 20, y: rebel.y + 25, speed: -25, active: true });
            playerLasers.push({ x: rebel.x - 20, y: rebel.y - 25, speed: -25, active: true });
            lastShotTime = now;
        }

        rebel.x = rebel.base_x + Math.sin(frameCount * 0.1) * 10; // jitter

        // Boss AI
        const targetCruiserY = rebel.y + Math.sin(frameCount * 0.02) * 150; 
        cruiser.y += (targetCruiserY - cruiser.y) * 0.03;
        cruiser.x = cruiser.base_x + Math.sin(frameCount * 0.05) * 30;

        // Boss Shoot
        if (frameCount % 40 === 0) {
            enemyLasers.push({ x: cruiser.x + 80, y: cruiser.y + 15, speed: 18 + Math.min(score/500, 15), active: true });
            enemyLasers.push({ x: cruiser.x + 80, y: cruiser.y - 15, speed: 18 + Math.min(score/500, 15), active: true });
        }

        drawUI();
      }
      else if (mode === 'gameover') {
        drawCenterText("MISSION FAILED / GAME OVER", `FINAL SCORE: ${score} - CLICK TO RETRY`, false);
        // Slowly drift ships
        rebel.x += 2;
        rebel.y += 1;
        rebel.roll += 0.05;
      }

      rebel.roll += (rebel.rollTarget - rebel.roll) * 0.12;

      // Update Lasers
      for (let i = enemyLasers.length - 1; i >= 0; i--) {
        const l = enemyLasers[i];
        l.x += l.speed;
        
        // Collision with player
        if (mode === 'playing' && invulnerableTimer <= 0) {
            const dx = l.x - rebel.x;
            const dy = l.y - rebel.y;
            if (Math.sqrt(dx*dx + dy*dy) < rebel.radius) {
                shields--;
                invulnerableTimer = 60; // 1 second i-frames
                l.active = false;
                if (shields <= 0) {
                    mode = 'gameover';
                }
            }
        }
        
        if (l.active) drawLaser(l.x, l.y, true);
        if (l.x > width + 100 || !l.active) enemyLasers.splice(i, 1);
      }

      for (let i = playerLasers.length - 1; i >= 0; i--) {
        const l = playerLasers[i];
        l.x += l.speed;
        
        // Collision with boss
        if (mode === 'playing') {
            const dx = l.x - cruiser.x;
            const dy = l.y - cruiser.y;
            if (Math.sqrt(dx*dx + dy*dy) < cruiser.radius) {
                score += 50;
                l.active = false;
                // Boss Hit flash
                ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
                ctx.beginPath(); ctx.arc(cruiser.x, cruiser.y, cruiser.radius, 0, Math.PI * 2); ctx.fill();
            }
        }

        if (l.active) drawLaser(l.x, l.y, false);
        if (l.x < -100 || !l.active) playerLasers.splice(i, 1);
      }

      drawCruiser(cruiser.x, cruiser.y);
      drawRebel(rebel.x, rebel.y, rebel.roll, invulnerableTimer > 0);

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      resizeObserver.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isExpanded]);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(10,10,10,0.95)' }}
          />
        )}
      </AnimatePresence>

      <div 
        style={{ 
          width: isExpanded ? '100vw' : '100%', 
          height: isExpanded ? '100vh' : '100%', 
          position: isExpanded ? 'fixed' : 'relative',
          top: isExpanded ? 0 : 'auto',
          left: isExpanded ? 0 : 'auto',
          zIndex: isExpanded ? 9999 : 1,
          borderRadius: isExpanded ? '0' : '8px', 
          overflow: 'hidden', 
          border: isExpanded ? 'none' : '1px solid var(--border)',
          transition: 'all 0.3s ease-in-out',
          cursor: isExpanded ? 'crosshair' : 'pointer'
        }}
      >
        <canvas 
          ref={canvasRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'block',
            background: '#0A0A0A'
          }} 
        />

        {isExpanded && (
          <button 
            onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              padding: '8px 16px',
              background: 'rgba(0, 255, 0, 0.1)',
              border: '1px solid #00FF00',
              color: '#00FF00',
              fontFamily: 'JetBrains Mono',
              fontSize: '14px',
              cursor: 'pointer',
              zIndex: 10000,
              backdropFilter: 'blur(4px)'
            }}
          >
            ← Go Back
          </button>
        )}
      </div>
    </>
  );
}
