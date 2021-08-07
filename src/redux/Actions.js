import { ADD_NEW_PATIENT, EDIT_PATIENT_INFO } from './ActionTypes'

export const addPatient = (payload) => {
    console.log(payload)
    return {
        type: ADD_NEW_PATIENT,
        payload
    }
}
export const editPatient = (payload) => {
    console.log(payload)
    return {
        type: EDIT_PATIENT_INFO,
        payload
    }
};