import api from "../boot/axios";

export const userService = {
    login,
    logout,
    register,
    updateAccount
};

function login(email : any, password: any){
    return api.post('/account/login', {email, password})
                .then((response) => {
                    if(response.data.token){
                        localStorage.setItem("user", JSON.stringify(response.data));
                    }

                    return response.data;
                });
}
function register(firstName: any,lastName: any, email: any, password: any) {
    return api.post('/account/register', {firstName,lastName, email, password})
                .then((response) => {
                    if(response.data.token){
                        localStorage.setItem("user", JSON.stringify(response.data));
                    }
                    return response.data;
                })
}
function logout(){
    localStorage.removeItem("user");
}

function updateAccount(firstName: any,lastName: any, currentPassword: any, newPassword: any) {
    return api.post('/account/update-account', {firstName,lastName,currentPassword, newPassword})
                .then((response) => {
                    if(response.data.token){
                        localStorage.setItem("user", JSON.stringify(response.data));
                    }
                    return response.data;
                })
}