import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { DRUM_PADS, DrumPadI } from './config/drumPadConfig';
import './style.css';

interface DrumPadProps {
  displayTimeoutMs: number;
  pad: DrumPadI;
  padTimeoutRef: MutableRefObject<number | null>;
  setDisplayText: (text: string) => void;
  setShowText: (show: boolean) => void;
  volume: number;
}

const DrumPad = ({ pad, volume, setDisplayText, setShowText, displayTimeoutMs, padTimeoutRef }: DrumPadProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (padTimeoutRef.current) {
      clearTimeout(padTimeoutRef.current)
    }
    if (audioRef.current) {
      setDisplayText(pad.text)
      setShowText(true);
      padTimeoutRef.current = setTimeout(() => {
        setShowText(false);
      }, displayTimeoutMs);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      audioRef.current.volume = volume / 100;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === pad.id.toLowerCase()) {
        playAudio();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pad.id, volume]);

  return (
    <div className="drum-pad" id={pad.id} onClick={playAudio}>
      <p>{pad.id}</p>
      <audio ref={audioRef} src={pad.src} className="clip" id={pad.id} />
    </div>
  );
}

export const App = () => {
  const DISPLAY_CHANGE_TIME_MS = 750;
  const VOLUME_CHANGE_QUANTITY = 5;

  const volumeTimeoutRef = useRef<number | null>(null);
  const padTimeoutRef = useRef<number | null>(null);

  const [displayText, setDisplayText] = useState<string>('');
  const [volume, setVolume] = useState<number>(100);
  const [showVolume, setShowVolume] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);

  const handleScroll = (event: any) => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current)
    }
    const isVolumeUp = event.wheelDelta > 0;
    setVolume((prevVolume) => Math.round(
      isVolumeUp
        ? Math.min(prevVolume + VOLUME_CHANGE_QUANTITY, 100)
        : Math.max(prevVolume - VOLUME_CHANGE_QUANTITY, 0)
    ));
    setShowVolume(true);
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolume(false);
    }, DISPLAY_CHANGE_TIME_MS);
  };

  useEffect(() => {
    window.addEventListener('mousewheel', handleScroll);
    return () => {
      window.removeEventListener('mousewheel', handleScroll);
    };
  }, []);

  return (
    <div id="main-container">
      <div id="display">{showVolume ? `VOLUME ${volume}` : showText ? displayText : 'DRUM MACHINE'}</div>
      <div id="drum-machine">
        {DRUM_PADS.map((pad: DrumPadI) => (
          <DrumPad
            key={pad.id}
            pad={pad}
            volume={volume}
            setDisplayText={setDisplayText}
            setShowText={setShowText}
            displayTimeoutMs={DISPLAY_CHANGE_TIME_MS}
            padTimeoutRef={padTimeoutRef}
          />
        ))}
      </div>
    </div>
  );
}
