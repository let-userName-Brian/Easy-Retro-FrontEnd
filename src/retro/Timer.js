import { useContext, useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SettingsContext from "./SettingsContext";
import { PauseButton, PlayButton, SettingsButton } from "./TimerButtons";

const red = '#f54e4e';
const green = '#4aec8c';



export default function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {

    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = mode === 'work'
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  return (
    <div style={{ marginTop: '-30%' }}>
      <div style={{ display: 'flex', transform: 'scale(0.3, 0.3)', marginTop: '0px', flex: '-1', }}>
        <CircularProgressbar
          value={percentage}
          text={minutes + ':' + seconds}
          styles={buildStyles({
            textColor: '#fff',
            pathColor: mode === 'work' ? red : green,
            tailColor: 'rgba(255,255,255,.2)',
          })} />
      </div>
      <div style={{ marginTop: '-40%' }}>
        {isPaused
          ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
          : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}