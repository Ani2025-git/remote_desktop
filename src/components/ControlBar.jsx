import React, { useState } from 'react';
import { 
  Maximize2, Activity, Terminal, HardDrive, 
  LogOut, Cpu, Zap, Sliders, ChevronDown
} from 'lucide-react';

export default function ControlBar({ 
  onDisconnect, 
  onToggleTaskManager, 
  onToggleTerminal, 
  onToggleFileTransfer,
  onSendHotkey,
  streamQuality,
  setStreamQuality,
  fps,
  latency
}) {
  const [showHotkeysMenu, setShowHotkeysMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  const triggerFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen().catch(err => console.log(err));
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      padding: '0.5rem 1rem',
      background: 'rgba(8, 12, 24, 0.88)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(0, 242, 254, 0.3)',
      borderRadius: '30px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '0.75rem', borderRight: '1px solid rgba(255, 255, 255, 0.12)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
        <span style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Zap size={12} /> {latency}ms</span>
        <span style={{ color: 'var(--primary-cyan)' }}>{fps} FPS</span>
      </div>

      <button onClick={onToggleTaskManager} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', borderRadius: '20px' }}>
        <Activity size={14} color="var(--primary-cyan)" /> Task Mgr
      </button>
      <button onClick={onToggleTerminal} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', borderRadius: '20px' }}>
        <Terminal size={14} color="var(--accent-green)" /> Terminal
      </button>
      <button onClick={onToggleFileTransfer} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', borderRadius: '20px' }}>
        <HardDrive size={14} color="var(--accent-amber)" /> Files
      </button>

      <div style={{ position: 'relative' }}>
        <button onClick={() => { setShowHotkeysMenu(!showHotkeysMenu); setShowQualityMenu(false); }} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', borderRadius: '20px' }}>
          <Cpu size={14} color="var(--accent-pink)" /> Hotkeys <ChevronDown size={12} />
        </button>

        {showHotkeysMenu && (
          <div style={{
            position: 'absolute',
            top: '120%',
            left: 0,
            background: 'rgba(10, 14, 26, 0.95)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: '12px',
            padding: '0.5rem',
            width: '180px',
            zIndex: 600,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem'
          }}>
            {['Ctrl + Alt + Del', 'Alt + Tab', 'Windows Key', 'Win + R', 'Ctrl + Shift + Esc'].map(hk => (
              <button key={hk} onClick={() => { onSendHotkey(hk); setShowHotkeysMenu(false); }} style={{ background: 'none', border: 'none', color: '#fff', padding: '0.4rem', borderRadius: '6px', textAlign: 'left', fontSize: '0.8rem', cursor: 'pointer' }}>
                {hk}
              </button>
            ))}
          </div>
        )}
      </div>

      <button onClick={triggerFullscreen} className="btn-secondary" style={{ padding: '0.4rem 0.5rem', borderRadius: '50%' }}><Maximize2 size={14} /></button>
      <button onClick={onDisconnect} className="btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '20px' }}><LogOut size={14} /> Disconnect</button>
    </div>
  );
}
