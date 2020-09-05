const responseHandler = (response) => {
    if (response.ok) {
        return response.json()
    }
    throw response.json() 
}

const handleQueryParams = (queryParams) => {
    let queryString = Object.keys(queryParams).map(objectKey => {
        queryParams[objectKey] ? objectKey + '=' + queryParams[objectKey] 
        :
        null
    })
    return queryString.join('&')
}

module.exports = {responseHandler, handleQueryParams}