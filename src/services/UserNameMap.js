import axios from 'axios';
import store from '../store';

const API_URL = process.env.VUE_APP_URL;

export default class UserNameMap {
    static #localSave = localStorage.getItem('userMap');
    static map = (UserNameMap.#localSave ? JSON.parse(UserNameMap.#localSave) : new Map());

    static async updateAllMap () {
        const Url = `${API_URL}/users`;
            try {
                await axios.get(Url).then(response => {
                    if (response.status === 200) {
                        const list = response.data.data;
                        list.array.forEach(user => {
                        UserNameMap.map.set(user._is, { name: user.name, update: Date.now() });
                        });
                    }
                });
            } catch (error) {
                store.commit('errorMessage', error);
            }
    };

    static async updateUser (id) {
        let result = '';
        const user = UserNameMap.map.get(id);
        if (!user) {
                const Url = `${API_URL}/users/${id}`;
                try {
                    await axios.get(Url).then(response => {
                        if (response.status === 200) {
                            const user = response.data.data;
                            UserNameMap.map.set(user._is, { name: user.name, update: Date.now() });
                            result = user.name;
                        }
                    });
                } catch (e) {
                    result = '';
                }
        };
        return result;
    };

    static async getUserName (id) {
        if (UserNameMap.map.size < 1) {
            UserNameMap.updateAllMap();
        }
        let userName = '';
        const user = UserNameMap.map.get(id);
        if (user) {
            // if we apdate user more 10 minuts
            if ((Date.now - user.update) < 600000) {
                console.log('< 10 minuts');
                userName = user;
            } else {
                userName = UserNameMap.updateUser(id);
            }
        } else {
            userName = UserNameMap.updateUser(id);
        }
        return userName;
    };

    static removeUser (id) {
        if (id) {
            UserNameMap.map.delete(id);
        }
    }
};
