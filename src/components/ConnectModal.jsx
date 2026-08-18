import React, { useState } from 'react';
import { Monitor, KeyRound, ArrowRight, ShieldCheck, Zap, Info } from 'lucide-react';

export default function ConnectModal({ onConnect, onCancel, defaultSessionId = '' }) {
  const [sessionId, setSessionId] = useState(defaultSessionId || '742-910-835');
  const [passcode, setPasscode] = useState('8492');
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = (e) => {
    e.preventDefault();
    if (!sessionId.trim()) {
      setError('Please enter a valid 9-digit Session ID');
      return;
    }
    if (!passcode.trim()) {
      setError('Security passcode is required');
      return;
    }

    setError('');
    setConnecting(true);

    setTimeout(() => {
      setConnecting(false);
      onConnect({
        sessionId: sessionId.replace(/\s+/g, ''),
        passcode: passcode,
        connectTime: new Date().toLocaleTimeString()
      });
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(4, 7, 15, 0.8)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="glass-panel-glow" style={{
        width: '100%',
        maxWidth: '460px',
        padding: '2rem',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(79, 172, 254, 0.2) 100%)',
            border: '1px solid rgba(0, 242, 254, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)'
          }}>
            <Monitor size={28} color="#00f2fe" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>
            Connect to Remote Desktop
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Enter the host Session ID and Passcode to initiate ultra-low latency WebRTC control.
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 51, 102, 0.15)',
            border: '1px solid rgba(255, 51, 102, 0.4)',
            color: '#ff6688',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Info size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleConnect} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Host Session ID
            </label>
            <div style={{ position: 'relative' }}>
              <Monitor size={18} color="var(--primary-cyan)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                placeholder="e.g. 742-910-835"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  background: 'rgba(10, 15, 28, 0.8)',
                  border: '1px solid rgba(0, 242, 254, 0.25)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Security Passcode
            </label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={18} color="var(--primary-cyan)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter PIN code"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  background: 'rgba(10, 15, 28, 0.8)',
                  border: '1px solid rgba(0, 242, 254, 0.25)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  letterSpacing: '2px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 242, 254, 0.05)',
            border: '1px dashed rgba(0, 242, 254, 0.2)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={16} color="var(--accent-green)" />
              256-Bit TLS P2P Encrypted
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary-cyan)' }}>
              <Zap size={14} /> Low-Latency Mode
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={connecting}
              className="btn-primary"
              style={{ flex: 1.5, justifyContent: 'center', opacity: connecting ? 0.7 : 1 }}
            >
              {connecting ? <>Establishing Stream...</> : <>Connect Remote <ArrowRight size={18} /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
