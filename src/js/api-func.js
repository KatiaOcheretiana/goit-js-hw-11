const axios = require('axios');
import axios from 'axios';


export async function searchApiData(searchItem, page) {
    const BASE_URL = "https://pixabay.com/api/";
    const KEY = "39735643-6cc1b2c73d81a27078c554324";
    
    const options = {
    method: "get",
    url: BASE_URL,
        params: {
            key: KEY,
            q: searchItem,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 40,
            page: page
        }
    }
    
    const response = await axios(options);

    return response.data;

}