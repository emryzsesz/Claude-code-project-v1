"use client";

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon } from "./icons";

const NOTE_FREQUENCIES = [110, 164.81, 220];

type ToneNodes = {
  context: AudioContext;
  oscillators: OscillatorNode[];
  masterGain: GainNode;
};

/**
 * Fixed bottom right toggle for a quiet ambient tone, off by default and
 * never remembered as on across a reload, so it can never autoplay with
 * sound. The tone itself is a few soft detuned sine oscillators through
 * a low pass filter, generated entirely with the Web Audio API on the
 * click that turns it on, which also happens to be the user gesture
 * every browser requires before audio can start at all. No audio file
 * is ever fetched.
 */
export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const nodesRef = useRef<ToneNodes | null>(null);

  function startTone() {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const context = new AudioContextClass();

    const masterGain = context.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(context.destination);
    masterGain.gain.linearRampToValueAtTime(0.045, context.currentTime + 1.4);

    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.connect(masterGain);

    const oscillators = NOTE_FREQUENCIES.map((freq, i) => {
      const osc = context.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.detune.value = (i - 1) * 4;

      const voiceGain = context.createGain();
      voiceGain.gain.value = 1 / NOTE_FREQUENCIES.length;

      osc.connect(voiceGain);
      voiceGain.connect(filter);
      osc.start();
      return osc;
    });

    nodesRef.current = { context, oscillators, masterGain };
  }

  function stopTone() {
    const nodes = nodesRef.current;
    if (!nodes) return;
    const { context, oscillators, masterGain } = nodes;

    const now = context.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0, now + 0.4);

    window.setTimeout(() => {
      oscillators.forEach((osc) => osc.stop());
      context.close();
    }, 450);

    nodesRef.current = null;
  }

  function handleToggle() {
    if (enabled) {
      stopTone();
      setEnabled(false);
    } else {
      startTone();
      setEnabled(true);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn off ambient sound" : "Turn on ambient sound"}
      data-cursor-label="open"
      className="fixed bottom-6 right-6 z-[55] flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-white text-navy shadow-lg transition-colors duration-200 hover:border-green hover:text-green"
    >
      {enabled ? <SoundOnIcon className="h-4 w-4" /> : <SoundOffIcon className="h-4 w-4" />}
    </button>
  );
}
