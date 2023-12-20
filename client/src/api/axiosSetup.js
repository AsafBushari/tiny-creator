import axios from 'axios';
import { server } from '../../config';

export default () => {
    return axios.create({
        baseURL: server.hostName,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}