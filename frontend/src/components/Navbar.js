import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import logo from "../assets/logo.ico";
import LogoUnicam from "../assets/logoUnicam.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onSignOut } from "states/authSlice";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1.5),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const NavbarElement = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Navbar({ test }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box data-testid={test}>
      <CssBaseline />
      <NavbarElement
        data-testid="navbar"
        position="fixed"
        open={open}
        style={{ background: "#222C4A", elevation: 2 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            data-testid="menu-button"
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            data-testid="main-text"
            variant="h6"
            noWrap
            component="div"
            width="20%"
          >
            Digital Library
          </Typography>
          <Grid container direction="row" justifyContent="right">
            <img alt="" src={LogoUnicam} style={{ maxWidth: 35 }} />
          </Grid>
        </Toolbar>
      </NavbarElement>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Grid container>
            <img
              data-testid="logo"
              src={logo}
              alt="logo"
              style={{ width: "50px", height: "50px", marginLeft: "10px" }}
            />
          </Grid>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <HomeIcon />  */}
        <List data-testid="side-menu">
          <ListItem component={Link} to="/" button key="home">
            <ListItemIcon>
              {" "}
              <HomeIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/books" button key="MenuBookIcon">
            <ListItemIcon>
              {" "}
              <MenuBookIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Cerca Libro" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {isAuth ? (
            <>
              <ListItem component={Link} to="/profile" button key="profile">
                <ListItemIcon>
                  {" "}
                  <AccountCircleIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Profilo" />
              </ListItem>
              <ListItem component={Link} to="/groups" button key="groups">
                <ListItemIcon>
                  {" "}
                  <GroupIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Gruppi" />
              </ListItem>
              <ListItem
                button
                key="logout"
                onClick={() => dispatch(onSignOut())}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <ListItem component={Link} to="/signin" button key="login">
              <ListItemIcon>
                {" "}
                <LoginIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
