import React, { useState } from 'react';
import HostStudio from './components/HostStudio';
import RemoteViewport from './components/RemoteViewport';
import ConnectModal from './components/ConnectModal';
import SettingsModal from './components/SettingsModal';
import { 
  Monitor, Zap, ArrowRight, Settings, KeyRound, Radio, Sparkles, Activity, Lock
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  const [activeStream, setActiveStream] = useState(null);
  const [sessionDetails, setSessionDetails] = useState(null);

  const handleConnectSuccess = (details) => {
    setSessionDetails(details);
    setShowConnectModal(false);
    setCurrentView('client');
  };

  const handleDisconnect = () => {
    if (activeStream) {
      activeStream.getTracks().forEach(track => track.stop());
      setActiveStream(null);
    }
    setSessionDetails(null);
    setCurrentView('home');
  };

  if (currentView === 'client') {
    return (
      <RemoteViewport
        activeStream={activeStream}
        sessionDetails={sessionDetails}
        onDisconnect={handleDisconnect}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div className="bg-grid-overlay" />

      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(8, 11, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 242, 254, 0.15)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div onClick={() => setCurrentView('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary-cyan) 0%, var(--accent-purple) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Monitor size={22} color="#000" />
            </div>
            <div>
              <span className="shimmer-text" style={{ fontSize: '1.25rem', fontWeight: 800 }}>NovaDesktop</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--primary-cyan)', display: 'block', fontWeight: 600, textTransform: 'uppercase' }}>Ultra-Low Latency P2P</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setCurrentView('home')} style={{ background: currentView === 'home' ? 'rgba(0, 242, 254, 0.12)' : 'transparent', border: 'none', color: currentView === 'home' ? 'var(--primary-cyan)' : 'var(--text-muted)', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Dashboard</button>
            <button onClick={() => setCurrentView('host')} style={{ background: currentView === 'host' ? 'rgba(0, 242, 254, 0.12)' : 'transparent', border: 'none', color: currentView === 'host' ? 'var(--primary-cyan)' : 'var(--text-muted)', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Host Studio Desk</button>
            <button onClick={() => setShowConnectModal(true)} className="btn-primary" style={{ padding: '0.55rem 1.25rem' }}><Zap size={16} /> Connect to Remote</button>
            <button onClick={() => setShowSettingsModal(true)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', padding: '0.55rem', borderRadius: '8px', cursor: 'pointer' }}><Settings size={18} /></button>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, zIndex: 1, paddingBottom: '3rem' }}>
        {currentView === 'host' ? (
          <HostStudio onStartVirtualHost={() => setCurrentView('client')} activeStream={activeStream} setActiveStream={setActiveStream} />
        ) : (
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
            <div className="glass-panel-glow" style={{ padding: '3rem 2.5rem', textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.25)', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--primary-cyan)', marginBottom: '1.25rem', fontWeight: 600 }}>
                <Sparkles size={14} /> WebRTC P2P Direct Connect Protocol
              </div>
              <h1 style={{ fontSize: '2.75rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Next-Gen Remote Desktop Access & Control</h1>
              <p style={{ maxWidth: '680px', margin: '0 auto 2rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>Instantly stream, manage, and control desktop workstations with ultra-low latency, real-time keyboard/mouse relaying, system diagnostics, and chunked file transfer.</p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => setShowConnectModal(true)} className="btn-primary" style={{ padding: '0.85rem 2rem' }}><KeyRound size={20} /> Access Remote Desktop <ArrowRight size={18} /></button>
                <button onClick={() => setCurrentView('host')} className="btn-secondary" style={{ padding: '0.85rem 2rem' }}><Radio size={20} color="var(--primary-cyan)" /> Host Session Desk</button>
                <button onClick={() => setCurrentView('client')} className="btn-secondary" style={{ padding: '0.85rem 2rem', borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }}><Monitor size={20} /> Virtual Machine OS Demo</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.75rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0, 242, 254, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><Zap size={22} color="var(--primary-cyan)" /></div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Ultra-Low Latency Stream</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>WebRTC Peer-to-Peer hardware accelerated video pipeline achieving sub-15ms roundtrip latency at up to 60 FPS.</p>
              </div>
              <div className="glass-panel" style={{ padding: '1.75rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(127, 0, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><Activity size={22} color="var(--accent-purple)" /></div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Remote Task Manager & Shell</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Monitor CPU, RAM, and GPU telemetry in real time, terminate hung processes, or execute commands via dark PowerShell CLI console.</p>
              </div>
              <div className="glass-panel" style={{ padding: '1.75rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0, 255, 170, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><Lock size={22} color="var(--accent-green)" /></div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>256-Bit Encrypted Security</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full TLS signaling protection with 9-digit Session ID and regenerable Security Passcode authorization.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {showConnectModal && <ConnectModal onConnect={handleConnectSuccess} onCancel={() => setShowConnectModal(false)} />}
      {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} />}
    </div>
  );
}
