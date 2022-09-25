
export default function useUsersAuthData() {
    const _usersAuthData = [
        {
            role: 'doctor',
            login: '12345',
            password: '12345'
        },
        {
            role: 'coordinator',
            login: 'qwer',
            password: 'qwer'
        },
    ];

    const userRole = function(authInfo) {
        return _usersAuthData.find(item => {
            if (item.login === authInfo.login && item.password === authInfo.password) return true
        })?.role
    };

    return userRole
}
