const radio = (radio = "new_york", action) => {
    if (action.type === "UPDATE_RADIO"){
        return action.selectedRadio
    } else {
        return radio
    }
}

export default radio