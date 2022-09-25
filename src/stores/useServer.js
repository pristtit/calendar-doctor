import { defineStore } from 'pinia'

export const useServer = defineStore('server', {
    state: () => ({
        _usersAuthData: [
            {
                _id: 123456789876,
                role: 'doctor',
                login: '12345',
                password: '12345',
                name: 'Иван И.И.',
                calendar: []
            },
            {
                _id: 6237612638,
                role: 'doctor',
                login: '123456',
                password: '123456',
                name: 'Петр П.П.',
                calendar: []
            },
            {
                _id: 10879713901639,
                role: 'coordinator',
                login: 'qwer',
                password: 'qwer',
                name: 'Антон А.А.',
            },
        ]
    }),

    getters: {
        schedule: (state) => {
            return state._usersAuthData.map(item => {
                if (item.role === 'doctor') return {name: item.name, calendar: item.calendar}
            })
        }
    },

    actions: {
        userRole(authInfo) {
            const user = this._usersAuthData.find(item => {
                if (item.login === authInfo.login && item.password === authInfo.password) return true
            })
            if (user) {
                return { role: user.role, id: user._id, name: user.name }
            } else {
                return false
            }
        },

        sendCalendar(id, calendar) {
            let user;

            if ( (user = this._usersAuthData.find(item => item._id === id)) ) {
                user.calendar = calendar;
                return true;
            } else {
                console.log('Пользователь не найден');
                return false;
            }
        }
    }
})