import axios from "axios";
import { baseURL } from "../Constants";

const getCoinList = () => new Promise((resolve, reject) => {
    axios.get(`${baseURL}/coins/list`, { params: { include_platform: false } })
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
});


const getSupportedVsCurrency = () => new Promise((resolve, reject) => {
    axios.get(`${baseURL}/simple/supported_vs_currencies`)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
});


const convertCurrency = (data) => new Promise((resolve, reject) => {
    axios.get(`${baseURL}/simple/price`,
        {
            params: {
                ids: data.base_currency,
                vs_currencies: data.target_currency
            }
        }
    )
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
});


export { getCoinList, getSupportedVsCurrency, convertCurrency }