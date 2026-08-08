/**
 * Web Audio API helper to generate a subtle, soft, and realistic paper rustle sound
 * when turning notebook pages.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a gentle, subtle paper page-turn rustle.
 */
export function playPaperRustle(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.22; // 220ms subtle paper glide

    // 1. Generate Noise Buffer (Soft filtered noise)
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise smoothing
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08; // Medium balanced amplitude
      b6 = white * 0.115926;
    }

    // Soft Paper Surface Glide Filter
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const bandFilter = ctx.createBiquadFilter();
    bandFilter.type = 'bandpass';
    bandFilter.frequency.setValueAtTime(2400, now);
    bandFilter.frequency.exponentialRampToValueAtTime(1500, now + duration);
    bandFilter.Q.setValueAtTime(0.9, now);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.04); // Balanced medium volume attack
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Smooth natural fade

    source.connect(bandFilter);
    bandFilter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(now);
    source.stop(now + duration);
  } catch {
    // Ignore browser autoplay restrictions gracefully
  }
}
