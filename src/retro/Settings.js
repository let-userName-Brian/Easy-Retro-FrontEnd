import ReactSlider from 'react-slider';
import './Slider.css'
import SettingsContext from "./SettingsContext";
import {useContext} from "react";
import { BackButton } from "./TimerButtons";

export default function Settings() {
  const settingsInfo = useContext(SettingsContext);

  return(
    <div style={{textAlign:'left'}}>
      <label>Time: {settingsInfo.workMinutes}:00</label>
      <ReactSlider style={{ backgroundColor: '#f0f0f0' }}
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={15}
      />
      <label>Break Time: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={15}
      />
      <div style={{textAlign:'center', marginTop:'20px'}}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}