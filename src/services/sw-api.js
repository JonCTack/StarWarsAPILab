import axios from 'axios'

export const getAllStarships = async (request) => {
    let serverResponse
    if(request !== undefined){
    serverResponse = await axios({
        method: 'get',
        url: `${request}`,
    })}else{
    serverResponse = await axios({
        method: 'get',
        url: `https://swapi.dev/api/starships`,
    })}
    console.log(request, serverResponse)
    return serverResponse
}

