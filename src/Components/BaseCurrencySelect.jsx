import { useEffect, useState } from "react";
import { getCoinList } from "../Apis";

const BaseCurrencySelect = ({ label, nullValueMessage, fieldName, handleChange }) => {
    const [coinList, setCoinList] = useState([]);
    const [loading, setLoading] = useState([]);


    useEffect(() => {

        loadCoinList();
    }, []);

    const loadCoinList = async () => {
        setLoading(true);
        await getCoinList()
            .then((response) => {
                console.log(response);
                setLoading(false);
                setCoinList(response.data);
            })
            .catch((error) => {
                setLoading(false);

                console.log(error);
                alert('Something went horribly wrong....')
            });
    }


    return (
        <div className='form-group'>
            <label>{label}</label>
            {
                loading ? (
                    <div className="row  d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>

                        </div>
                    </div>
                ) :
                    <select required className="form-select" aria-label={label} name={fieldName} onChange={(e) => handleChange(e.target.value)}>
                        <option value="">{nullValueMessage}</option>

                        {
                            coinList.map((item) => {
                                return (<option key={item.id} value={item.id}>{item.symbol}</option>)
                            })
                        }
                    </select>


            }

        </div>
    );
}

export default BaseCurrencySelect;