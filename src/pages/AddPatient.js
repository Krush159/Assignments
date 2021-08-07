import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import clsx from 'clsx';
import { connect } from 'react-redux';
import {
    CircularProgress,
    Button,
    TextField,
    MenuItem,
    Grid,
    Paper,
    Chip,
    Typography,
    IconButton,
    DialogTitle,
    Avatar,
    Checkbox,
    Container
} from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
    Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import Badge from '@material-ui/core/Badge';
// import axiosInstance from '../../../component/Utils/AxiosInstance';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { MuiPickersUtilsProvider, KeyboardDatePicker, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DialogActions from '@material-ui/core/DialogActions';
import ReactHtmlParser from 'react-html-parser';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { addPatient } from '../redux/Actions';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "pink",
        color: "white"
    },
    fixedHeight: {
        height: `calc(100vh - 200px)`,
        overflowY: 'auto',
        marginBottom: "20px"
    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    chipContainer: {
        backgroundColor: "transparent",
        display: "inline-block",
        marginTop: 10
    },
    chip: {
        marginTop: 10,
        marginRight: 5
    },
    iconStyle: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    rootRadio: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
    inputImage: {
        display: 'none',
    },
}));
function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.rootRadio}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: 25,
        bottom: 25,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '15px 15px',
    },
}))(Badge);
function AddPatient(props) {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date());
    const [gender, setGender] = useState('female')
    const [marital, setMarital] = useState('unmarried')
    const [isLoading, setIsLoading] = useState(false)
    const [addressCopy, setAddressCopy] = useState(false)
    const [imageURL, setImageURL] = useState('')
    const [profiles, setProfiles] = useState([])
    const mobileRegex = /^[6789]\d{9}$/;

    const data = {
        "firstName": "",
        "lastName": "",
        "selectGender": "Female",
        "dob": null,
        "maritalStatus": "Unmarried",
        "selectOccupation": "",
        "mobileNo": "",
        "email": "",
        "temporaryAddressLine1": "",
        "temporaryAddressLine2": "",
        "permanentAddressLine1": "",
        "permanentAddressLine2": "",
        "imageFile": {}
    }
    const handleAddress = () => {
        setAddressCopy(!addressCopy)
    }

    const uploader = (file) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setImageURL(reader.result)
        })
        reader.readAsDataURL(file);
    }

    console.log(data['imageFile'])
    console.log(moment(selectedDate).format('DD/MM/YYYY'))
    return (
        <>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Formik
                                initialValues={data}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    console.log(values)
                                    setSubmitting(true);
                                    const obj = {
                                        "PATIENT_ID": uuidv4(),
                                        "PATIENT_FIRST_NAME": values.firstName,
                                        "PATIENT_LAST_NAME": values.lastName,
                                        "GENDER": values.selectGender,
                                        "DOB": values.dob,
                                        "MARITAL_STATUS": values.maritalStatus,
                                        "OCCUPATION": values.selectOccupation,
                                        "MOBILE_NO": values.mobileNo,
                                        "EMAIL_ID": values.email,
                                        "TEMPORARY_ADDRESS_LINE1": values.temporaryAddressLine1,
                                        "TEMPORARY_ADDRESS_LINE2": values.temporaryAddressLine2,
                                        "PERMANENT_ADDRESS_LINE1": addressCopy ? values.temporaryAddressLine1 : values.permanentAddressLine1,
                                        "PERMANENT_ADDRESS_LINE2": addressCopy ? values.temporaryAddressLine2 : values.permanentAddressLine2,
                                        "IMAGE": imageURL
                                    }
                                    console.log(obj)
                                    props.addPatient(obj)
                                    // if (localStorage.getItem('patients') === null) {
                                    //    localStorage.setItem("patients", JSON.stringify([obj]))
                                    // } else {
                                    //     let allPatients = JSON.parse(localStorage.getItem('patients'))
                                    //     let updatedPatients = [...allPatients,obj]
                                    //     localStorage.setItem('patients', JSON.stringify(updatedPatients))
                                    // }
                                    setSubmitting(false)
                                    resetForm()
                                    

                                }}

                                validationSchema={Yup.object().shape({
                                    "firstName": Yup.string().required('Required'),
                                    "lastName": Yup.string(),
                                    "dob": Yup.date().nullable().required('Required'),
                                    "selectOccupation": Yup.string().required('Required'),
                                    "mobileNo": Yup.string().matches(mobileRegex, 'Mobile number is not valid').required('Required'),
                                    "email": Yup.string().email().required('Required'),
                                    "temporaryAddressLine1": Yup.string().required('Required'),
                                    "temporaryAddressLine2": Yup.string(),
                                    "permanentAddressLine1": Yup.string().required('Required'),
                                    "permanentAddressLine2": Yup.string(),
                                })}
                            >
                                {({
                                    values,
                                    touched,
                                    errors,
                                    dirty,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleReset,
                                    setFieldValue
                                }) =>
                                (
                                    <Form className={classes.form}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <Paper className={classes.paper}>
                                                    <input
                                                        accept="image/*"
                                                        className={classes.inputImage}
                                                        id="imageFile"
                                                        name="imageFile"
                                                        type="file"
                                                        onChange={(e) => {
                                                            setFieldValue('imageFile', e.currentTarget.files[0])
                                                            uploader(e.currentTarget.files[0])
                                                        }}
                                                    />
                                                    <label htmlFor="imageFile">
                                                        <IconButton aria-label="imageFile" component="span" disableRipple disableFocusRipple className={classes.iconStyle}>
                                                            <StyledBadge
                                                                badgeContent="+"
                                                                color="secondary"
                                                                overlap="circular"
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'right',
                                                                }}
                                                            >
                                                                <Avatar
                                                                    src={imageURL}
                                                                    style={{
                                                                        margin: "10px",
                                                                        width: "100px",
                                                                        height: "100px",
                                                                    }}
                                                                />
                                                            </StyledBadge>
                                                        </IconButton>
                                                    </label>
                                                    <div>{`${values.firstName + " " + values.lastName}`}</div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Paper className={classes.paper}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={2} style={{ textAlign: "left" }}>
                                                                    <h5>Patient Name</h5>
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <TextField
                                                                        error={errors.firstName && touched.firstName}
                                                                        variant="outlined"
                                                                        margin="dense"
                                                                        required
                                                                        fullWidth
                                                                        id="firstName"
                                                                        name="firstName"
                                                                        autoComplete="firstName"
                                                                        autoFocus
                                                                        value={values.firstName}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        helperText={
                                                                            errors.firstName && touched.firstName
                                                                                ? errors.firstName
                                                                                : null
                                                                        }
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <TextField
                                                                        error={errors.lastName && touched.lastName}
                                                                        variant="outlined"
                                                                        margin="dense"
                                                                        fullWidth
                                                                        id="lastName"
                                                                        name="lastName"
                                                                        autoComplete="lastName"
                                                                        value={values.lastName}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        helperText={
                                                                            errors.lastName && touched.lastName
                                                                                ? errors.lastName
                                                                                : null
                                                                        }
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={2} style={{ textAlign: "left" }}>
                                                                    <h5>Gender</h5>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <FormControl component="fieldset">
                                                                        <RadioGroup
                                                                            row
                                                                            name="selectGender"
                                                                            value={values.selectGender}
                                                                            onChange={(event) => {
                                                                                setFieldValue('selectGender', event.currentTarget.value)
                                                                            }}>
                                                                            <FormControlLabel value='Male' control={<StyledRadio />} label="Male" />
                                                                            <FormControlLabel value='Female' control={<StyledRadio />} label="Female" />
                                                                            <FormControlLabel value='Others' control={<StyledRadio />} label="Others" />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={2} style={{ textAlign: "left" }}>
                                                                    <h5>Date Of Birth</h5>
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                        <KeyboardDatePicker
                                                                            autoOk
                                                                            variant="inline"
                                                                            value={values.dob}
                                                                            onChange={value => setFieldValue("dob", value)}
                                                                            helperText={
                                                                                errors.dob && touched.dob
                                                                                    ? errors.dob
                                                                                    : null
                                                                            }
                                                                            InputAdornmentProps={{ position: "end" }}
                                                                            format="dd/MM/yyyy"
                                                                            maxDate={new Date()}
                                                                        />
                                                                    </MuiPickersUtilsProvider>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={2} style={{ textAlign: "left" }}>
                                                                    <h5>Marital Status</h5>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <FormControl component="fieldset">
                                                                        <RadioGroup
                                                                            row
                                                                            name="maritalStatus"
                                                                            value={values.maritalStatus}
                                                                            onChange={(event) => {
                                                                                setFieldValue('maritalStatus', event.currentTarget.value)
                                                                            }}
                                                                        >
                                                                            <FormControlLabel value="Married" control={<StyledRadio />} label="Married" />
                                                                            <FormControlLabel value="Unmarried" control={<StyledRadio />} label="Unmarried" />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={2} style={{ textAlign: "left" }}>
                                                                    <h5>Occupation</h5>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <TextField
                                                                        error={errors.selectOccupation && touched.selectOccupation}
                                                                        id="selectOccupation"
                                                                        select
                                                                        variant="outlined"
                                                                        margin="dense"
                                                                        className={classes.textField}
                                                                        value={values.selectOccupation}
                                                                        onChange={handleChange("selectOccupation")}
                                                                        fullWidth
                                                                        required
                                                                        helperText={
                                                                            errors.selectOccupation && touched.selectOccupation
                                                                                ? errors.selectOccupation
                                                                                : null
                                                                        }
                                                                    >
                                                                        <MenuItem value="Professor"><em>Professor</em></MenuItem>
                                                                        <MenuItem value="Engineer"><em>Engineer</em></MenuItem>
                                                                        <MenuItem value="Army Officer"><em>Army Officer</em></MenuItem>
                                                                        <MenuItem value="BusinessMan"><em>BusinessMan</em></MenuItem>
                                                                        <MenuItem value="Clerk"><em>Clerk</em></MenuItem>
                                                                        <MenuItem value="Pilot"><em>Pilot</em></MenuItem>
                                                                    </TextField>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={2} >
                                                                <Grid item xs={2} style={{ textAlign: "left" }}>
                                                                    <h5>Mobile Number</h5>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <TextField
                                                                        error={errors.mobileNo && touched.mobileNo}
                                                                        variant="outlined"
                                                                        margin="dense"
                                                                        required
                                                                        fullWidth
                                                                        id="mobileNo"
                                                                        name="mobileNo"
                                                                        autoComplete="mobileNo"
                                                                        value={values.mobileNo}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        helperText={
                                                                            errors.mobileNo && touched.mobileNo
                                                                                ? errors.mobileNo
                                                                                : null
                                                                        }
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={2} style={{ textAlign: "left" }}>
                                                                    <h5>Email Address</h5>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <TextField
                                                                        error={errors.email && touched.email}
                                                                        variant="outlined"
                                                                        margin="dense"
                                                                        required
                                                                        fullWidth
                                                                        id="email"
                                                                        name="email"
                                                                        autoComplete="email"
                                                                        value={values.email}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        helperText={
                                                                            errors.email && touched.email
                                                                                ? errors.email
                                                                                : null
                                                                        }
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12}>
                                                                    <FormControlLabel
                                                                        style={{ float: "right" }}
                                                                        control={<Checkbox checked={addressCopy} onChange={handleAddress} name="checkedA" disabled={values.temporaryAddressLine1 === "" ? true : false} />}
                                                                        label="Copy Temporary Address"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={2} style={{ textAlign: "left" }}><h5>Temporary Address</h5></Grid>
                                                                <Grid item xs={4}>
                                                                    <Grid container spacing={1}>
                                                                        <Grid item xs={12}>
                                                                            <TextField
                                                                                error={errors.temporaryAddressLine1 && touched.temporaryAddressLine1}
                                                                                variant="outlined"
                                                                                margin="dense"
                                                                                required
                                                                                fullWidth
                                                                                id="temporaryAddressLine1"
                                                                                name="temporaryAddressLine1"
                                                                                autoComplete="temporaryAddressLine1"
                                                                                value={values.temporaryAddressLine1}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                helperText={
                                                                                    errors.temporaryAddressLine1 && touched.temporaryAddressLine1
                                                                                        ? errors.temporaryAddressLine1
                                                                                        : null
                                                                                }
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <TextField
                                                                                error={errors.temporaryAddressLine2 && touched.temporaryAddressLine2}
                                                                                variant="outlined"
                                                                                margin="dense"
                                                                                fullWidth
                                                                                id="temporaryAddressLine2"
                                                                                name="temporaryAddressLine2"
                                                                                autoComplete="temporaryAddressLine2"
                                                                                value={values.temporaryAddressLine2}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                helperText={
                                                                                    errors.temporaryAddressLine2 && touched.temporaryAddressLine2
                                                                                        ? errors.temporaryAddressLine2
                                                                                        : null
                                                                                }
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={2} style={{ textAlign: "left" }}>
                                                                    <h5>Permanent Address</h5>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Grid container spacing={1}>
                                                                        <Grid item xs={12}>
                                                                            <TextField
                                                                                error={errors.permanentAddressLine1 && touched.permanentAddressLine1}
                                                                                variant="outlined"
                                                                                margin="dense"
                                                                                required
                                                                                fullWidth
                                                                                id="permanentAddressLine1"
                                                                                name="permanentAddressLine1"
                                                                                autoComplete="permanentAddressLine1"
                                                                                value={addressCopy ? values.temporaryAddressLine1 : values.permanentAddressLine1}
                                                                                onChange={(event) => {
                                                                                    if (addressCopy === true) {
                                                                                        setFieldValue('permanentAddressLine1', values.temporaryAddressLine1)
                                                                                    } else {
                                                                                        setFieldValue('permanentAddressLine1', event.currentTarget.value)
                                                                                    }
                                                                                }}
                                                                                onBlur={handleBlur}
                                                                                helperText={
                                                                                    errors.permanentAddressLine1 && touched.permanentAddressLine1
                                                                                        ? errors.permanentAddressLine1
                                                                                        : null
                                                                                }
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <TextField
                                                                                error={errors.permanentAddressLine2 && touched.permanentAddressLine2}
                                                                                variant="outlined"
                                                                                margin="dense"
                                                                                fullWidth
                                                                                id="permanentAddressLine2"
                                                                                name="permanentAddressLine2"
                                                                                autoComplete="permanentAddressLine2"
                                                                                value={addressCopy ? values.temporaryAddressLine2 : values.permanentAddressLine2}
                                                                                onChange={(event) => {
                                                                                    if (addressCopy === true) {
                                                                                        setFieldValue('permanentAddressLine2', values.temporaryAddressLine2)
                                                                                    } else {
                                                                                        setFieldValue('permanentAddressLine2', event.currentTarget.value)
                                                                                    }
                                                                                }}
                                                                                onBlur={handleBlur}
                                                                                helperText={
                                                                                    errors.permanentAddressLine2 && touched.permanentAddressLine2
                                                                                        ? errors.permanentAddressLine2
                                                                                        : null
                                                                                }
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <DialogActions>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            className={classes.submit}
                                                            disabled={isSubmitting}
                                                        >
                                                            {isLoading ? <CircularProgress size={20} style={{ color: "blue" }} /> : "Add"}
                                                        </Button>
                                                    </DialogActions>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )
                                }
                            </Formik>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    );
}
// export default AddPatient
const mapStateToProps = (state) => {
    return {
        // openAddRoleModal: state.RoleReducer.open,
        // deptArr: state.DeptReducer.deptArr
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPatient: (payload) => dispatch(addPatient(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPatient)

