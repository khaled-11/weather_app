const searchData = (searchData = {cityName:'new york', zipCode:""}, action) => {
    if (action.type === "UPDATE_LAST_SEARCH"){
        return action.searchData
    } else {
        return searchData
    }
}

export default searchData