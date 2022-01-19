import axios, {Axios, AxiosResponse} from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true, // браузер разбирайся с куками сам
    headers: {
        'API-KEY': "5bc4afc0-333b-44bc-8069-41cc41813f50"
    }
})

//api

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}


export const authAPI = {
    login(params: LoginParamsType ) {
        return instance.post<LoginParamsType, AxiosResponse<CommonResponseType<{userId?: number}>>>('auth/login', params)
    },
    me(){
        return instance.get<CommonResponseType<{id: number,email: string,login: string}>>('auth/me')
    },
    logOut(){
        return instance.delete<CommonResponseType>('auth/login')
    }
}


//types

type CommonResponseType<T ={}> = {
    resultCode: number
    messages: Array<string>
    fieldsError: Array<string>
    data: T

}



