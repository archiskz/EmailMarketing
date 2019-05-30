
export async function commonCallApi({
    serverUrl = "",
    path, // endpoint
    method = 'POST',
    data,
    isLogin = false,
}) {
    let contentType = 'application/json';
    // check if type api login is application/x-www-form-urlencoded
    if (isLogin) contentType = 'application/x-www-form-urlencoded';
    // get token from local storage
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    let token = '';
    if (tokenStorage) {
        token = `${tokenStorage.token_type} ${tokenStorage.access_token}`;
    }

    // set headers
    const headers = new Headers({
        'Content-Type': contentType
    });
    const body = isLogin ? `grant_type=${encodeURIComponent(data.grant_type)}&username=${encodeURIComponent(data.username)}&password=${encodeURIComponent(data.password)}` : JSON.stringify(data);
    headers.append('Authorization', token);

    try {
        // real server
        const response = await fetch(`${serverUrl}/${path}`, {
            method,
            headers,
            body,
            credentials: 'include',
        });
        console.log("response", response);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') > -1) {
            const jsonRes = await response.json();
            if (response.ok) {
                return jsonRes;
            }
            if (isLogin) {
                console.log("KET QUA : " + jsonRes)
                return {
                    errorMessage: 'Username or password incorrect.'
                }
            }
            if (jsonRes.error_description) {
                return {
                    errorMessage: jsonRes.error_description
                };
            }
            if (jsonRes.err && jsonRes.err.length) {
                return {
                    errorMessage: jsonRes.err[0].msg
                }
            }
            if (jsonRes.status == 500) {
                return {
                    errorMessage: jsonRes.message
                }
            }
            return {
                errorMessage: 'Some thing errors !',
            };
        }
        return {};

    } catch (error) {
        console.log(error);
        return {
            errorMessage: 'Some thing errors !',
        };
    }
}
