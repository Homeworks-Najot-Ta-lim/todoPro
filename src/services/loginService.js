import { customAxios } from "./axios"

export const authService = async()=>{
    const response  =await customAxios.post("/auth/sign-in",{
        email: "savbatovnodirbek@gmail.com",
        password: "nodirbek"
    })
    localStorage.setItem("token",response.data.access_token)
    return response.data
}