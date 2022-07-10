const loadingStatus = (loadingStatus = "loading", action) => {
    if (action.type === "UPDATE_LOADING_STATUS"){
        return action.status
    } else {
        return loadingStatus
    }
}

export default loadingStatus