import React from 'react'
import {
    Route,
    Switch,
    Redirect,
    HashRouter,
} from "react-router-dom";
import AddPatient from '../../pages/AddPatient';
import EditPatient from '../../pages/EditPatient';
import ProfileGallery from '../../pages/ProfileGallery';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';

function Layout() {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <HashRouter>
                <Header open={open} openDrawer={handleDrawerOpen} />
                <SideBar open={open} closeDrawer={handleDrawerClose} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/profileGallery" />}
                    />
                    <Route path="/addPatient" component={AddPatient} />
                    <Route path="/editPatient" component={EditPatient} />
                    <Route path="/profileGallery" component={ProfileGallery} />
                </Switch>
            </HashRouter>
        </>
    )
}
export default Layout

