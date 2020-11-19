export default class ProductApi {
    static async getData () {
        console.log('Fetching remote articles.');
        return fetch("https://run.mocky.io/v3/aea5d98a-654d-4423-bd99-6fbb90843730")
            .then(handleResponse).then(response => {
                return response.data.map((item) =>
                    Object.assign({}, item, { orderedQuantity: 0, quantity: Number(item.quantity) })
                );
            });
    };
}
//this function reside in util file for services
const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
};