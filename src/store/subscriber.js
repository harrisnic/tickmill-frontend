import store from './index';
import axios from "axios";

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'setToken':
            if (mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
            } else {
                axios.defaults.headers.common['Authorization'] = null;
            }
            break;
    }
});
