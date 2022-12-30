import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { IconButton, Box, Tooltip, Menu, MenuItem } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CallIcon from "@mui/icons-material/Call";
import ComputerIcon from "@mui/icons-material/Computer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SchoolIcon from "@mui/icons-material/School";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AuthContext from "../context/AuthContext";

const drawerWidth = 265;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function SideBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={true}>
          <Toolbar sx={{ backgroundColor: "#6ECCAF" }}>
            <Tooltip title="معلومات">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <AccountCircleIcon sx={{ color: "whitesmoke", fontSize: 30 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="اشعارات" sx={{ backgroundColor: "#6ECCAF" }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <NotificationsActiveIcon
                  sx={{ color: "whitesmoke", fontSize: 30 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => {
                setAnchorElUser(null);
              }}
            >
              <MenuItem key={"تسجيل الخروج"} onClick={() => logout()}>
                <Typography textAlign="center">{"تسجيل الخروج"}</Typography>
              </MenuItem>
            </Menu>{" "}
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1, textAlign: "right" }}
              component="div"
            >
              صفحة التحكم
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 1,
            justifyContent: "flex-start",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={true}
        >
          <DrawerHeader>
            <SchoolIcon sx={{ fontSize: 45, color: "#6ECCAF" }} />
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem key={"الصفحة الرئيسية"} disablePadding>
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <HomeIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary={"الصفحة الرئيسية"} />
              </ListItemButton>
            </ListItem>

            <ListItem key={"قائمة الشركات"} disablePadding>
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <ApartmentIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary={"قائمة الشركات"} />
              </ListItemButton>
            </ListItem>

            <ListItem key={"مقابلة شخصية"} disablePadding>
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <ComputerIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary={"مقابلة شخصية"} />
              </ListItemButton>
            </ListItem>

            <ListItem key={"المهام الاسبوعية"} disablePadding>
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <AssignmentIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary={"المهام الاسبوعية"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key={"المهام الاسبوعية"} disablePadding>
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <CallIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary={"التواصل"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"الحساب الشخصي"} disablePadding>
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary={"الحساب الشخصي"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
}
