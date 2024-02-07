import axios from "axios";

// Define a function for common API Call using axios

export const commonRequest = async (method, url, body) => {

    // Request Configuration
    let reqConfig = {
        method, 
        url,
        data : body,
        headers : {
            "content-type" : "application/json"
        }

    }

    // API Call using axios library
    return await axios(reqConfig).then((response) => {
        return response
    }).catch((err) => {
        return err
    })


}