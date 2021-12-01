import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton(props) {
  return (<ArrowBackIcon {...props}>Back </ArrowBackIcon>);
}


function PauseButton(props) {
  return (<PauseCircleIcon {...props} />);
}

function PlayButton(props) {
  return (<PlayCircleIcon  {...props}/>);
}

function SettingsButton(props) {
  return (<SettingsIcon {...props}>Settings </SettingsIcon>);
}




export { BackButton, PauseButton, PlayButton, SettingsButton } 