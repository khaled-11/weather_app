export const updateData = (data) => {
    return {
        type:'UPDATE_DATA',
        data:data
    };
}
export const updateRadioOption = (option) => {
    return {
        type:'UPDATE_RADIO',
        selectedRadio:option
    };
}

