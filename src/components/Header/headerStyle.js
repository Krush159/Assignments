import { makeStyles } from "@material-ui/styles";
const drawerWidth = 240;
export default makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
  logotype: {
    color: "white",
    marginLeft: 2.5,
    marginRight: 2.5,
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
   
  },
  appBar: {
    width: "100vw",
  },
//   toolbar: {
//     paddingLeft: 20,
//     paddingRight: 20,
//     minHeight:"45px"
//   },
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: 25,
    paddingLeft: 2.5,
    width: 36,
    
  },
  messageContent: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenu: {
    marginTop: 7,
  },
  headerMenuList: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      // backgroundColor: theme.palette.background.light,
      // color: "white",
    },
  },
  headerMenuButton: {
    marginLeft: 10,
    marginRight: 5,
    padding: 0.5,
  },
  headerMenuButtonSandwich: {
    marginLeft: 9,
    padding: 0.5,
  },
  headerMenuButtonCollapse: {
    marginRight: 2
  },
  headerIcon: {
    fontSize: 28,
    // color: "rgba(255, 255, 255, 0.35)",
    color:"white"
  },
  headerIconCollapse: {
    color: "white",
  },
  profileMenu: {
    minWidth: 265,
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: 2,
  },
  profileMenuItem: {
    color: "black",
  },
  profileMenuIcon: {
    marginRight: 2,
    color: "black",
    '&:hover': {
      color: "white",
    }
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },

  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0,
  },
}));
