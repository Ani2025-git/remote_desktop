import React, { useState, useRef, useEffect } from 'react';
import ControlBar from './ControlBar';
import VirtualDesktop from './VirtualDesktop';
import RemoteTaskManager from './RemoteTaskManager';
import RemoteTerminal from './RemoteTerminal';
import FileTransferModal from './FileTransferModal';

export default function RemoteViewport({ activeStream, sessionDetails, onDisconnect }) {
  const [cursorPos, setCursorPos] = useState({ x: 400, y: 300, visible: true });
  const [showTaskManager, setShowTaskManager] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showFileTransfer, setShowFileTransfer] = useState(false);
  const [streamQuality, setStreamQuality] = useState('HD 60 FPS');
  const [toastMessage, setToastMessage] = useState('');

  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(12);

  const videoRef = useRef(null);
  const viewportRef = useRef(null);

  useEffect(() => {
    if (activeStream && videoRef.current) {
      videoRef.current.srcObject = activeStream;
    }
  }, [activeStream]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 5));
      setLatency(Math.floor(10 + Math.random() * 6));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true
    });
  };

  const handleSendHotkey = (keyLabel) => {
    setToastMessage(`Sent Remote Key Combo: [${keyLabel}]`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div 
      ref={viewportRef}
      onMouseMove={handleMouseMove}
      style={{
        width: '100vw',
        height: '100vh',
        background: '#040710',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'crosshair'
      }}
    >
      <ControlBar
        onDisconnect={onDisconnect}
        onToggleTaskManager={() => setShowTaskManager(true)}
        onToggleTerminal={() => setShowTerminal(true)}
        onToggleFileTransfer={() => setShowFileTransfer(true)}
        onSendHotkey={handleSendHotkey}
        streamQuality={streamQuality}
        setStreamQuality={setStreamQuality}
        fps={fps}
        latency={latency}
      />

      {toastMessage && (
        <div style={{
          position: 'absolute',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 242, 254, 0.9)',
          color: '#000',
          fontWeight: 700,
          padding: '0.5rem 1.25rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          zIndex: 600
        }}>
          {toastMessage}
        </div>
      )}

      {activeStream ? (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      ) : (
        <VirtualDesktop
          onOpenTerminal={() => setShowTerminal(true)}
          onOpenTaskManager={() => setShowTaskManager(true)}
          onOpenFileTransfer={() => setShowFileTransfer(true)}
        />
      )}

      {cursorPos.visible && (
        <div className="remote-cursor-halo" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />
      )}

      {showTaskManager && <RemoteTaskManager onClose={() => setShowTaskManager(false)} />}
      {showTerminal && <RemoteTerminal onClose={() => setShowTerminal(false)} />}
      {showFileTransfer && <FileTransferModal onClose={() => setShowFileTransfer(false)} />}
    </div>
  );
}
