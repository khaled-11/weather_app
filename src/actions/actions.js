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
export const updateCoordinates = (values) => {
    return {
        type:'UPDATE_COORDINATES',
        coordinates:values
    };
}
export const updateLoadingStatus = (status) => {
    return {
        type:'UPDATE_LOADING_STATUS',
        status:status
    };
}

export const updateLastSearchData = (searchData) => {
    return {
        type:'UPDATE_LAST_SEARCH',
        searchData:searchData
    };
}




