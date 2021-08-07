import React from 'react';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import { mainListItems, secondaryListItems } from '../MenuList/ListItems';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        backgroundColor: "#007CC3",
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        color: "white",
        fontSize: "16px"
    },
    drawerPaperClose: {
        backgroundColor: "#007CC3",
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(6),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8),
        },
        color: "white",

    },
    menuIcon: {
        color: "white"
    }

}));

function SideBar(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
                }}
                open={props.open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={props.closeDrawer}>
                        <ChevronLeftIcon className={classes.menuIcon} />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={() => history.push('/profileGallery')} >
                        <ListItemIcon>
                            <DashboardIcon className={classes.menuIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Directory" />
                    </ListItem>
                    <ListItem button onClick={() => history.push('/addPatient')}>
                        <ListItemIcon>
                            <PeopleIcon className={classes.menuIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Add Patient" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default SideBar
