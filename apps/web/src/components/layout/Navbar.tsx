"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="border-b border-gray-200 bg-white"
    >
      <Toolbar className="flex justify-between">

        <div className="flex items-center gap-3">

          <IconButton
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            className="font-bold text-gray-900"
          >
            TaskHub
          </Typography>

        </div>

        <div className="flex items-center gap-2">

          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>

          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
          >
            D
          </Avatar>

        </div>

      </Toolbar>
    </AppBar>
  );
}