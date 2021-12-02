import { Avatar } from "@mui/material";

export default function UserAvatar({ user_name, size }) {
  const stringToColor = (string) => {
    let hash = 0;
    let i;
    let color = '#';

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }


    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  }

  const stringAvatar = (name) => {
    const nameParts = name.split(' ');
    const initials = `${nameParts?.[0]?.[0] || ''}${nameParts?.[1]?.[0] || ''}`;
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: size || 48,
        height: size || 48
      },
      children: initials,
    };
  }

  return (<Avatar
    {...stringAvatar(user_name)}
  />)
}