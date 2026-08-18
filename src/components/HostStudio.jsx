import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, Copy, Check, Play, Square, Shield, Lock, Users, 
  Activity, RefreshCw, Eye, MousePointer, HardDrive, FileText
} from 'lucide-react';

export default function HostStudio({ onStartVirtualHost, activeStream, setActiveStream }) {
  const [sessionId, setSessionId] = useState('742-910-835');
  const [passcode, setPasscode] = useState('8492');
  const [copiedSession, setCopiedSession] = useState(false);
  const [copiedPasscode, setCopiedPasscode] = useState(false);

  const [allowControl, setAllowControl] = useState(true);
  const [allowFiles, setAllowFiles] = useState(true);
  const [allowClipboard, setAllowClipboard] = useState(true);
  const [allowAudio, setAllowAudio] = useState(false);

  const [isHosting, setIsHosting] = useState(false);
  const [sharingType, setSharingType] = useState('none');
  const [connectedClients, setConnectedClients] = useState([
    { id: 'client-1', name: 'Workstation-Client-Alpha', ip: '192.168.1.104', connectedAt: '20:45:12', latency: 14 }
  ]);

  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(12);
  const [bandwidth, setBandwidth] = useState(4.2);

  const videoRef = useRef(null);

  useEffect(() => {
    if (!isHosting) return;
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 5));
      setLatency(Math.floor(10 + Math.random() * 8));
      setBandwidth((3.8 + Math.random() * 0.9).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, [isHosting]);

  const handleStartScreenShare = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        handleStartVirtualHostMode();
        return;
      }
      
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always', frameRate: { ideal: 60, max: 60 } },
        audio: allowAudio
      });

      setActiveStream(mediaStream);
      setIsHosting(true);
      setSharingType('screen');

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      mediaStream.getVideoTracks()[0].onended = () => {
        handleStopSharing();
      };
    } catch (err) {
      console.warn('Screen share cancelled or failed:', err);
    }
  };

  const handleStartVirtualHostMode = () => {
    setIsHosting(true);
    setSharingType('virtual');
    onStartVirtualHost();
  };

  const handleStopSharing = () => {
    if (activeStream) {
      activeStream.getTracks().forEach(track => track.stop());
      setActiveStream(null);
    }
    setIsHosting(false);
    setSharingType('none');
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'session') {
      setCopiedSession(true);
      setTimeout(() => setCopiedSession(false), 2000);
    } else {
      setCopiedPasscode(true);
      setTimeout(() => setCopiedPasscode(false), 2000);
    }
  };

  const generateNewPasscode = () => {
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    setPasscode(newPin);
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      <div className="glass-panel-glow" style={{
        padding: '1.75rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: isHosting ? 'rgba(0, 255, 170, 0.15)' : 'rgba(0, 242, 254, 0.15)',
            border: `1px solid ${isHosting ? 'var(--accent-green)' : 'var(--primary-cyan)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Monitor size={26} color={isHosting ? 'var(--accent-green)' : 'var(--primary-cyan)'} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>Host Studio Desk</h1>
              {isHosting ? <span className="badge-live">Live Host Active</span> : (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '12px' }}>
                  Standby
                </span>
              )}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              Provide remote desktop access to client workstations with WebRTC P2P stream.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {!isHosting ? (
            <>
              <button onClick={handleStartScreenShare} className="btn-primary">
                <Play size={18} /> Share Real Desktop Stream
              </button>
              <button onClick={handleStartVirtualHostMode} className="btn-secondary">
                <Monitor size={18} /> Virtual OS Studio
              </button>
            </>
          ) : (
            <button onClick={handleStopSharing} className="btn-danger">
              <Square size={18} /> Terminate Host Session
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={18} color="var(--primary-cyan)" /> Session Access Credentials
            </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Your Session ID
              </span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(5, 8, 18, 0.8)',
                border: '1px solid rgba(0, 242, 254, 0.25)',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                marginTop: '0.35rem'
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary-cyan)', letterSpacing: '2px' }}>
                  {sessionId}
                </span>
                <button
                  onClick={() => copyToClipboard(sessionId, 'session')}
                  style={{ background: 'none', border: 'none', color: copiedSession ? 'var(--accent-green)' : 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {copiedSession ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Security Passcode
                </span>
                <button 
                  onClick={generateNewPasscode}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-cyan)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                >
                  <RefreshCw size={12} /> Regenerate
                </button>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(5, 8, 18, 0.8)',
                border: '1px solid rgba(0, 242, 254, 0.25)',
                padding: '0.75rem 1rem',
                borderRadius: '10px'
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color: '#fff', letterSpacing: '3px' }}>
                  {passcode}
                </span>
                <button
                  onClick={() => copyToClipboard(passcode, 'passcode')}
                  style={{ background: 'none', border: 'none', color: copiedPasscode ? 'var(--accent-green)' : 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {copiedPasscode ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} color="var(--primary-cyan)" /> Remote Client Permissions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MousePointer size={16} color="var(--primary-cyan)" /> Allow Remote Mouse & Keyboard Input
                </span>
                <input type="checkbox" checked={allowControl} onChange={(e) => setAllowControl(e.target.checked)} style={{ accentColor: 'var(--primary-cyan)', width: '18px', height: '18px' }} />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HardDrive size={16} color="var(--primary-cyan)" /> Allow Bidirectional File Transfer
                </span>
                <input type="checkbox" checked={allowFiles} onChange={(e) => setAllowFiles(e.target.checked)} style={{ accentColor: 'var(--primary-cyan)', width: '18px', height: '18px' }} />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={16} color="var(--primary-cyan)" /> Synchronize Clipboard Data
                </span>
                <input type="checkbox" checked={allowClipboard} onChange={(e) => setAllowClipboard(e.target.checked)} style={{ accentColor: 'var(--primary-cyan)', width: '18px', height: '18px' }} />
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Host Screen Stream Monitor
              </h3>
              {sharingType === 'screen' && <span style={{ color: 'var(--accent-green)', fontSize: '0.8rem' }}>DisplayCapture API</span>}
              {sharingType === 'virtual' && <span style={{ color: 'var(--primary-cyan)', fontSize: '0.8rem' }}>Virtual OS Mode</span>}
            </div>

            <div style={{
              width: '100%',
              height: '240px',
              background: '#040710',
              borderRadius: '12px',
              border: '1px solid rgba(0, 242, 254, 0.15)',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {sharingType === 'screen' ? (
                <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : sharingType === 'virtual' ? (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <Monitor size={48} color="var(--primary-cyan)" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>Virtual Machine OS Active</p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
                  <Eye size={40} style={{ marginBottom: '0.5rem', opacity: 0.4 }} />
                  <p style={{ fontSize: '0.85rem' }}>No Screen Stream Active</p>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>STREAM FPS</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-green)', marginTop: '0.2rem' }}>
                {isHosting ? `${fps} FPS` : '0'}
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>P2P LATENCY</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-cyan)', marginTop: '0.2rem' }}>
                {isHosting ? `${latency} ms` : '0 ms'}
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BITRATE</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-purple)', marginTop: '0.2rem' }}>
                {isHosting ? `${bandwidth} MB/s` : '0.0'}
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={16} color="var(--primary-cyan)" /> Connected Remote Peers ({connectedClients.length})
            </h3>
            {connectedClients.map(client => (
              <div key={client.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.03)',
                padding: '0.6rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}>
                <div>
                  <span style={{ fontWeight: 600, color: '#fff' }}>{client.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '0.5rem' }}>({client.ip})</span>
                </div>
                <span style={{ color: 'var(--accent-green)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  {client.latency}ms ping
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
