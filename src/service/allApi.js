import { BASE_URL } from "./baseurl"
import { commonRequest } from "./commonRequest"

// Add videos ---> function to call API when we click Add button in the modal
export const addVideo = async (body) => {
    return await commonRequest("POST", `${BASE_URL}/videos`, body)
}

// Get Video ----> To show the list of videos in the View part by getting its details from back-end
export const getVideo = async () => {
    return await commonRequest("GET",`${BASE_URL}/videos`, "")
}

// DELETE Video ----> by clicking the trash button in the videocard
export const deleteVideo = async (id) => {
    return await commonRequest("DELETE", `${BASE_URL}/videos/${id}`, {})
}

// Add Category ---> by clicking Add Category button
export const addcategory = async (body) => {
    return await commonRequest("POST", `${BASE_URL}/category`, body)
}

// To get the added category to display in the front-end
export const getcategory = async () => {
    return await commonRequest("GET",`${BASE_URL}/category`, "")
}

// To delete category
export const deletecategory = async (id) => {
    return await commonRequest("DELETE", `${BASE_URL}/category/${id}`, {})
}

// GET Watch History
export const getHistory = async () => {
    return await commonRequest("GET", `${BASE_URL}/watchhistory`, "")
}

// Add History
export const addHistory = async (body) => {
    return await commonRequest("POST", `${BASE_URL}/watchhistory`, body)
}

// Delete History
export const deleteHistory = async (id) => {
    return await commonRequest("DELETE", `${BASE_URL}/watchhistory/${id}`, {})
}

// To get a specific video details from resourse
export const getVideos = async (id) => {
    return await commonRequest("GET",`${BASE_URL}/videos/${id}`, "")
}

// To update video details in category after drag and drop the video
export const updateCategory = async (id, body) => {
    return await commonRequest("PUT",`${BASE_URL}/category/${id}`, body)
}