import React, { useState } from 'react';
import { 
  Folder, Terminal, Activity, FileText, Calculator, X, Sparkles 
} from 'lucide-react';

export default function VirtualDesktop({ onOpenTerminal, onOpenTaskManager, onOpenFileTransfer }) {
  const [openWindows, setOpenWindows] = useState([
    { id: 'sysinfo', title: 'System Diagnostics', icon: Activity, x: 80, y: 60, width: 480, height: 320 },
    { id: 'notepad', title: 'Quick Notes.txt', icon: FileText, x: 220, y: 140, width: 440, height: 280 }
  ]);

  const [activeWindow, setActiveWindow] = useState('sysinfo');
  const [notepadContent, setNotepadContent] = useState(
    "NovaDesktop Remote Session Active\n=================================\nConnected via 256-bit AES WebRTC stream.\nLatency: 12ms | FPS: 60 | Status: Optimal"
  );
  const [calcInput, setCalcInput] = useState('0');
  const [calcResult, setCalcResult] = useState('');

  const handleCalcClick = (val) => {
    if (val === 'C') {
      setCalcInput('0');
      setCalcResult('');
    } else if (val === '=') {
      try {
        setCalcResult(eval(calcInput.replace('×', '*').replace('÷', '/')).toString());
      } catch (e) {
        setCalcResult('Error');
      }
    } else {
      setCalcInput(prev => prev === '0' ? val : prev + val);
    }
  };

  const closeWindow = (id) => setOpenWindows(openWindows.filter(w => w.id !== id));

  const launchApp = (id, title, IconComp) => {
    if (id === 'terminal') { onOpenTerminal(); return; }
    if (id === 'taskmgr') { onOpenTaskManager(); return; }
    if (id === 'files') { onOpenFileTransfer(); return; }

    const existing = openWindows.find(w => w.id === id);
    if (existing) {
      setActiveWindow(id);
    } else {
      const newWin = { id, title, icon: IconComp, x: 100 + openWindows.length * 30, y: 80 + openWindows.length * 30, width: 460, height: 320 };
      setOpenWindows([...openWindows, newWin]);
      setActiveWindow(id);
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '650px',
      background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
        gridAutoRows: '90px',
        gap: '1rem',
        width: '360px',
        zIndex: 2
      }}>
        <div onClick={() => launchApp('files', 'File Explorer', Folder)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <Folder size={36} color="#00f2fe" />
          <span style={{ fontSize: '0.75rem', color: '#fff', marginTop: '0.35rem' }}>File Manager</span>
        </div>
        <div onClick={() => launchApp('terminal', 'Remote Shell', Terminal)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <Terminal size={36} color="#00ffaa" />
          <span style={{ fontSize: '0.75rem', color: '#fff', marginTop: '0.35rem' }}>Terminal</span>
        </div>
        <div onClick={() => launchApp('taskmgr', 'Task Manager', Activity)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <Activity size={36} color="#7f00ff" />
          <span style={{ fontSize: '0.75rem', color: '#fff', marginTop: '0.35rem' }}>Task Manager</span>
        </div>
        <div onClick={() => launchApp('notepad', 'Quick Notes.txt', FileText)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <FileText size={36} color="#ffaa00" />
          <span style={{ fontSize: '0.75rem', color: '#fff', marginTop: '0.35rem' }}>Notepad</span>
        </div>
        <div onClick={() => launchApp('calc', 'Calculator', Calculator)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <Calculator size={36} color="#e100ff" />
          <span style={{ fontSize: '0.75rem', color: '#fff', marginTop: '0.35rem' }}>Calculator</span>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        {openWindows.map(win => {
          const IconComp = win.icon;
          const isSelected = activeWindow === win.id;

          return (
            <div
              key={win.id}
              onClick={() => setActiveWindow(win.id)}
              style={{
                position: 'absolute',
                left: `${win.x}px`,
                top: `${win.y}px`,
                width: `${win.width}px`,
                height: `${win.height}px`,
                background: 'rgba(12, 17, 30, 0.92)',
                backdropFilter: 'blur(16px)',
                borderRadius: '12px',
                border: isSelected ? '1px solid rgba(0, 242, 254, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: isSelected ? 10 : 5
              }}
            >
              <div style={{
                background: 'rgba(20, 28, 48, 0.8)',
                padding: '0.5rem 0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IconComp size={16} color="var(--primary-cyan)" />
                  <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#fff' }}>{win.title}</span>
                </div>
                <button onClick={() => closeWindow(win.id)} style={{ background: 'none', border: 'none', color: '#ff4466', cursor: 'pointer' }}>
                  <X size={14} />
                </button>
              </div>

              <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                {win.id === 'sysinfo' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Host OS</span><span style={{ color: '#fff' }}>Windows 11 Pro 64-Bit</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Processor</span><span style={{ color: '#fff' }}>Intel Core i9-13900K 5.4GHz</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>RAM</span><span style={{ color: '#fff' }}>64 GB DDR5</span></div>
                  </div>
                )}
                {win.id === 'notepad' && (
                  <textarea
                    value={notepadContent}
                    onChange={(e) => setNotepadContent(e.target.value)}
                    style={{ width: '100%', height: '100%', background: 'transparent', border: 'none', color: 'var(--primary-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
                  />
                )}
                {win.id === 'calc' && (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.75rem', borderRadius: '8px', marginBottom: '0.75rem', textAlign: 'right' }}>
                      <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', color: '#fff' }}>{calcInput}</div>
                      {calcResult && <div style={{ fontSize: '0.9rem', color: 'var(--accent-green)' }}>= {calcResult}</div>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', flex: 1 }}>
                      {['7','8','9','÷','4','5','6','×','1','2','3','-','C','0','=','+'].map((btn) => (
                        <button key={btn} onClick={() => handleCalcClick(btn)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>{btn}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        height: '48px',
        background: 'rgba(8, 12, 24, 0.9)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="var(--primary-cyan)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>NovaOS Host</span>
        </div>
        <span style={{ color: 'var(--accent-green)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>● 60 FPS</span>
      </div>
    </div>
  );
}
