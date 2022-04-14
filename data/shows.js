const axios = require('axios');

getShowBySearch = async (term) => {
    const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${term}`);
    return data;
}

getShowByID = async (id) => {
    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    console.log(data);
    return data;
}

module.exports = {
    getShowBySearch,
    getShowByID
}