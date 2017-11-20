// export const addAccessToken = (token) => {
//     return {
//         type:'ACCESS_TOKEN',
//         token
//     }
// };
export const createClinic = (id) => {
    return {
        type:'CREATE_CLINIC',
        id
    }
};
// export const createUser = (username,password,role) =>{
//     console.log(username,password,role);
//     return {
//         type:'CREATE_USER',
//         username,
//         password,
//         role
//     }
// };