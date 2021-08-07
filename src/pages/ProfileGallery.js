import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Avatar, Container, Grid, makeStyles, Paper, TextField, Menu, MenuItem, Button } from '@material-ui/core';
import EditPatient from './EditPatient';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        borderRadius: "10px"
    },
    fixedHeight: {
        cursor: "pointer",
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,

    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    diseaseBox: {
        border: "1px solid grey",
        borderRadius: "5px",
        textAlign:"center",
        marginBottom:"0px !important"
    },
    info: {
        "& > *": {
            margin: "0px !important",
            padding: "0px !important"
        },
        '&: last-child': {
            float: "right"
        }
    },
    large: {
        height:"80px !important",
        width:"80px !important",
        "& > img":{
            height:"80px !important",
            width:"80px !important"
        }
    }
}));
function ProfileGallery(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [profileDirectory, setProfileDirectory] = useState([])
    const [selectedProfile, setSelectedProfile] = useState("")
    const [selectedProfileID, setSelectedProfileID] = useState('')
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [options, setOptions] = useState('byName')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [editData, setEditData] = useState()
    useEffect(() => {
        setProfileDirectory([...props.data])
    }, [props.data])
    console.log(profileDirectory)
    const handleEditProfile = (ele) => {
        console.log(ele)
        setOpenEditProfile(true)
        setEditData(ele)
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(selectedProfileID)
    console.log(selectedProfile)


    return (
        <>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4} >
                                    <Autocomplete
                                        id="search"
                                        options={profileDirectory}
                                        getOptionLabel={(option) => {
                                            if (options === "byName") {
                                                return option['PATIENT_FIRST_NAME'] + " " + option['PATIENT_LAST_NAME'] || {}
                                            } else {
                                                return option['MOBILE_NO'] || {}
                                            }
                                        }}
                                        size="small"
                                        // PopperComponent={PopperMy}
                                        onChange={(event, newValue) => {
                                            console.log(event)
                                            console.log(newValue)
                                            setSelectedProfileID(newValue && newValue['PATIENT_ID'])
                                            setSelectedProfile(newValue && newValue['PATIENT_FIRST_NAME'] + " " + newValue['PATIENT_LAST_NAME'])
                                        }}
                                        // style={{ width: 300 }}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label={options === "byName" ? "Search By Name" : "Search By Mobile Number"}
                                                variant="outlined"
                                                fullWidth
                                                value={selectedProfile}
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Grid container spacing={1} style={{ textAlign: "right" }}>
                                        <Grid item xs={6} style={{ textAlign: "center" }}>
                                            <FilterListIcon onClick={handleClick} aria-controls="filter-menu" aria-haspopup="true" />
                                            <Menu
                                                id="filter-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={() => {
                                                    setOptions('byName')
                                                    handleClose()
                                                }
                                                }>
                                                    Filter By Name
                                                </MenuItem>
                                                <MenuItem onClick={() => {
                                                    setOptions('byMobile')
                                                    handleClose()
                                                }
                                                }>
                                                    Filter By Mobile Number
                                                </MenuItem>

                                            </Menu>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="outlined" color="priamry"
                                                onClick={() => {
                                                    setSelectedProfile('')
                                                    setSelectedProfileID('')
                                                }}
                                            >Reset</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>

                        {profileDirectory ?
                            selectedProfileID !== "" ?
                                profileDirectory
                                    .filter(item => item['PATIENT_ID'].toLowerCase().indexOf(selectedProfileID && selectedProfileID.toLowerCase()) !== -1)
                                    .map(ele => (
                                        <Grid item xs={6} sm={4} md={3} >
                                            <Paper
                                                className={fixedHeightPaper}
                                                elevation={3}
                                                onClick={() => handleEditProfile(ele)}
                                            >
                                                <Grid container spacing={1}>
                                                    <Grid item container xs={4}>
                                                        <Avatar alt={"Preview"} src={ele['IMAGE']} className={classes.large} variant="rounded" height="80px" width="80px" />
                                                    </Grid>
                                                    <Grid item xs={8} className={classes.info} >
                                                        <h4>{ele['PATIENT_FIRST_NAME'] + " " + ele['PATIENT_LAST_NAME']}</h4>
                                                        <h5>{ele['TEMPORARY_ADDRESS_LINE1'] + "," + ele['TEMPORARY_ADDRESS_LINE2']}</h5>
                                                        <h5>{ele['GENDER']}</h5>
                                                        <h5 className={classes.diseaseBox}>{'Bladder Cancer'}</h5>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    ))
                                :
                                profileDirectory.map(ele => (
                                    <Grid item xs={6} sm={4} md={3} >
                                        <Paper
                                            className={fixedHeightPaper}
                                            elevation={3}
                                            onClick={() => handleEditProfile(ele)}
                                        >
                                            <Grid container spacing={1}>
                                                <Grid item xs={4}>
                                                    <Avatar alt={"Preview"} src={ele['IMAGE']} className={classes.large} variant="rounded" />
                                                </Grid>
                                                <Grid item xs={8} className={classes.info} >
                                                    <h4>{ele['PATIENT_FIRST_NAME'] + " " + ele['PATIENT_LAST_NAME']}</h4>
                                                    <h5>{ele['TEMPORARY_ADDRESS_LINE1'] + "," + ele['TEMPORARY_ADDRESS_LINE2']}</h5>
                                                    <h5>{ele['GENDER']}</h5>
                                                    <Grid container>
                                                        <Grid item xs={5}></Grid>
                                                        <Grid item xs={7}>
                                                            <h5 className={classes.diseaseBox}>{'Bladder Cancer'}</h5>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                ))
                            : <h5>Directory is empty</h5>}
                    </Grid>
                </Container>
            </main>
            {openEditProfile ? <EditPatient open={openEditProfile} close={() => setOpenEditProfile(false)} editData={editData} /> : ""}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        data: state.reducer.data
    }
}
export default connect(mapStateToProps)(ProfileGallery)
