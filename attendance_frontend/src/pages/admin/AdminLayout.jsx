import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink, Outlet } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Mini variant drawer
          </Typography>

          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ backgroundColor: "lightblue" }}
      >
        <List
          sx={{
            marginTop: "60px",
            height: "100%",
            backgroundColor: "#1976D2",
          }}
        >
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="teacher"
              style={({ isActive }) => ({
                color: "white",
                backgroundColor: isActive ? "darkblue" : "",
                display: "block",
              })}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {open && (
                  <Stack direction="row">
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      <FaChalkboardTeacher
                        size={25}
                        color="white"
                      ></FaChalkboardTeacher>
                    </ListItemIcon>
                    <span>student</span>
                  </Stack>
                )}
                {!open && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <FaChalkboardTeacher
                      size={25}
                      color="white"
                    ></FaChalkboardTeacher>
                  </ListItemIcon>
                )}
              </ListItemButton>
            </NavLink>
            <Divider color="white" />
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="batch"
              style={({ isActive }) => ({
                color: "white",
                backgroundColor: isActive ? "darkblue" : "",
                display: "block",
              })}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {open && (
                  <Stack direction="row">
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      <FaChalkboardTeacher
                        size={25}
                        color="white"
                      ></FaChalkboardTeacher>
                    </ListItemIcon>
                    <span>student</span>
                  </Stack>
                )}
                {!open && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <FaChalkboardTeacher
                      size={25}
                      color="white"
                    ></FaChalkboardTeacher>
                  </ListItemIcon>
                )}
              </ListItemButton>
            </NavLink>
            <Divider color="white" />
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="admin"
              style={({ isActive }) => ({
                color: "white",
                backgroundColor: isActive ? "darkblue" : "",
                display: "block",
              })}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {open && (
                  <Stack direction="row">
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      <FaChalkboardTeacher
                        size={25}
                        color="white"
                      ></FaChalkboardTeacher>
                    </ListItemIcon>
                    <span>student</span>
                  </Stack>
                )}
                {!open && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <FaChalkboardTeacher
                      size={25}
                      color="white"
                    ></FaChalkboardTeacher>
                  </ListItemIcon>
                )}
              </ListItemButton>
            </NavLink>
            <Divider color="white" />
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="attendance"
              style={({ isActive }) => ({
                color: "white",
                backgroundColor: isActive ? "darkblue" : "",
                display: "block",
              })}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {open && (
                  <Stack direction="row">
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      <FaChalkboardTeacher
                        size={25}
                        color="white"
                      ></FaChalkboardTeacher>
                    </ListItemIcon>
                    <span>student</span>
                  </Stack>
                )}
                {!open && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <FaChalkboardTeacher
                      size={25}
                      color="white"
                    ></FaChalkboardTeacher>
                  </ListItemIcon>
                )}
              </ListItemButton>
            </NavLink>
            <Divider color="white" />
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="student"
              style={({ isActive }) => ({
                color: "white",
                backgroundColor: isActive ? "darkblue" : "",
                display: "block",
              })}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {open && (
                  <Stack direction="row">
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      <FaChalkboardTeacher
                        size={25}
                        color="white"
                      ></FaChalkboardTeacher>
                    </ListItemIcon>
                    <span>student</span>
                  </Stack>
                )}
                {!open && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <FaChalkboardTeacher
                      size={25}
                      color="white"
                    ></FaChalkboardTeacher>
                  </ListItemIcon>
                )}
              </ListItemButton>
            </NavLink>
            <Divider color="white" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "50px" }}>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
