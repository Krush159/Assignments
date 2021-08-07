import { ADD_NEW_PATIENT, EDIT_PATIENT_INFO } from './ActionTypes'

const initState = {
    data: JSON.parse(localStorage.getItem('patients')) || []
}
const reducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case ADD_NEW_PATIENT:
            if (state.data === null) {
                localStorage.setItem("patients", JSON.stringify([action.payload]))
                return { ...state, data: [action.payload] }
            } else {
                let allPatients = JSON.parse(localStorage.getItem('patients'))
                let updatedPatients = [...allPatients, action.payload]
                localStorage.setItem('patients', JSON.stringify(updatedPatients))
                return { ...state, data: [...state.data, action.payload] }
            }
        case EDIT_PATIENT_INFO:
            const profileDirectory = JSON.parse(localStorage.getItem('patients'))
            const updatedDirectory = profileDirectory.map(item => [action.payload].find(ele => ele['PATIENT_ID'] === item['PATIENT_ID']) || item)
            console.log(updatedDirectory)
            localStorage.setItem('patients', JSON.stringify(updatedDirectory))
            return { ...state, data: [...updatedDirectory] }
        default:
            return state;
    }
}
export default reducer