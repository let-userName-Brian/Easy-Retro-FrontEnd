import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material/';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";

export default function CardMenu({ removeCardFunc }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function deleteCard() {
    handleClose()
    removeCardFunc()
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={menuOpen ? 'true' : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={deleteCard}>Delete Card</MenuItem>
      </Menu>
    </div>
  )
}
