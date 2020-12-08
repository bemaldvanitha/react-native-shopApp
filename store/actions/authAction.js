export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBto8SBMBgnklzXvjZGE27OG7yG-yfFH7Q',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            const errId = errorData.error.message;
            throw new Error(errId);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({ type: SIGNUP ,token:resData.idToken,userId: resData.localId});
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBto8SBMBgnklzXvjZGE27OG7yG-yfFH7Q',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            const errId = errorData.error.message;
            throw new Error(errId);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({ type: LOGIN ,token:resData.idToken,userId: resData.localId});
    };
};
