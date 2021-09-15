import axios from 'axios';
import store from '../store';

const API_URL = process.env.VUE_APP_URL;

export default class UserNameMap {
    static map = {};

    static async updateAllMap () {
        const Url = `${API_URL}/users?limit=0`;
            try {
                await axios.get(Url).then(response => {
                    if (response.status === 200) {
                        const list = response.data.data;
                        list.forEach(user => {
                            UserNameMap.map[user._id] = { name: user.name, email: user.email, update: Date.now() };
                        });
                    }
                });
            } catch (error) {
                store.commit('errorMessage', error);
            }
    };

    static async updateUser (id) {
        let result = '';
        const user = UserNameMap.map[id];
        if (!user) {
                const Url = `${API_URL}/users/${id}`;
                try {
                    await axios.get(Url).then(response => {
                        if (response.status === 200) {
                            const user = response.data.data;
                            UserNameMap.map[user._id] = { name: user.name, email: user.email, update: Date.now() };
                            result = user.name | user.email;
                            console.log(result);
                            console.log(UserNameMap.map[user._id]);
                        }
                    });
                } catch (e) {
                    result = '';
                }
        };
        return result;
    };

    static async getUserName (id) {
        if (UserNameMap.map) {
            UserNameMap.updateAllMap();
        }
        let userName = '';
        const user = UserNameMap.map[id];
        console.log('id', id);
        if (user) {
            // if we apdate user more 10 minuts
            if ((Date.now - user.update) < 600000) {
                console.log('user');
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
            delete UserNameMap.map[id];
        }
    }
};
