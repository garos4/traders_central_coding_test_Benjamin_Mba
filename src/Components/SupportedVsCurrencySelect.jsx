/**
 * This is the target currency select component
 * 
 * It makes api call to get the data
 * 
 * Then parses the data to the select
 * 
 * handleChange function mutates the target currency state in the Body component
 * 
 */

import  { useEffect, useState } from "react";
import { getSupportedVsCurrency } from "../Apis";

const SupportedVsCurrencySelect = ({ label, nullValueMessage, fieldName, handleChange }) => {
    const [SupportedVsCurrency, setSupportedVsCurrency] = useState([]);
    const [loading, setLoading] = useState([]);


    useEffect(() => {
        loadSupportedVsCurrency();
    }, []);

    const loadSupportedVsCurrency = async () => {
        setLoading(true);
        await getSupportedVsCurrency()
            .then((response) => {
                console.log(response);
                setLoading(false);
                setSupportedVsCurrency(response.data);
            })
            .catch((error) => {
                setLoading(false);

                console.log(error);
                alert('Something went horribly wrong....')            });
    }


    return (
        <div className='form-group'>
            <label>{label}</label>
            {loading ? (
                <div className="row  d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>

                    </div>
                </div>
            ) :
                <select required className="form-select" aria-label={label} name={fieldName} onChange={(e) => handleChange(e.target.value)}>
                    <option value="">{nullValueMessage}</option>
                    {
                        SupportedVsCurrency.map((item, index) => {
                            return (<option key={index} value={item}>{item}</option>)
                        })
                    }
                </select>
            }

        </div>
    );
}

export default SupportedVsCurrencySelect;