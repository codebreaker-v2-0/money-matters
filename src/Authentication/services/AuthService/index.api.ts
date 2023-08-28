import AuthService from ".";
import ApiInitialOptionsConstants from "../../../Common/constants/ApiInitialOptionsConstants";
import { LoginRequest, LoginResponse } from '../../stores/types';
import endpoints from '../endpoints';

class AuthAPI implements AuthService {
    api: string

    constructor() {
        this.api = endpoints.login
    }

    loginAPI = (requestObject: LoginRequest) => {
        const options = {
            method: "POST",
            headers: {
              ...ApiInitialOptionsConstants,
            },
            body: JSON.stringify(requestObject),
          };
        return new Promise<LoginResponse>((resolve, reject) => {
            fetch(this.api, options).then(response => response.json()).then((data) => {
                let isLoginSuccessful = true;
                if (data.get_user_id.length === 0) {
                    isLoginSuccessful = false;
                }
                resolve({
                    ...data,
                    isLoginSuccessful
                })
            });
        })
    }; 
};

export default AuthAPI;