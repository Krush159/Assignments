import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "white"
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
        // "& ."
    },
    menuButton: {
        marginRight: 36,

    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        color: "#007CC3"
    },
    menuIcon: {
        color: "#007CC3"
    },
}));
export default function Header(props) {
    const classes = useStyles();
    const headerTitle = window.location.href.split('/').pop()
    console.log(headerTitle)
    const renderTitle = (title) => {
        switch (title) {
            case 'addPatient': return 'Add Patient';
            case 'editPatient': return 'Edit Patient';
            case 'profileGallery': return 'Directory';
            default: return title
        }
    }

    return (
        <>
            <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        aria-label="open drawer"
                        onClick={props.openDrawer}
                        className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
                    >
                        <MenuIcon classes={{ root: classes.menuIcon }} />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {renderTitle(headerTitle)}
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

