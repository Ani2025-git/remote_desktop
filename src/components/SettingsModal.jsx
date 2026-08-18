import React, { useState } from 'react';
import { Settings, X, Check } from 'lucide-react';

export default function SettingsModal({ onClose }) {
  const [relayServer, setRelayServer] = useState('wss://signal.novadesktop.net/v1');
  const [targetFps, setTargetFps] = useState('60');

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(4, 7, 15, 0.8)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div className="glass-panel-glow" style={{ width: '100%', maxWidth: '540px', padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={22} color="var(--primary-cyan)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>NovaDesktop Preferences</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.85rem' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>WebRTC Relay Server</label>
            <input type="text" value={relayServer} onChange={(e) => setRelayServer(e.target.value)} style={{ width: '100%', padding: '0.65rem', background: 'rgba(10, 15, 28, 0.8)', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '8px', color: '#fff' }} />
          </div>
          <button onClick={onClose} className="btn-primary" style={{ justifyContent: 'center' }}><Check size={18} /> Save Settings</button>
        </div>
      </div>
    </div>
  );
}
