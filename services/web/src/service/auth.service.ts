import api from "../boot/axios";

export const userService = {
    login,
    logout,
    register
};

function login(email : any, password: any){
    return api.post('/account/login', {email, password})
                .then((response) => {
                    if(response.data.token){
                        console.log(response.data);
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