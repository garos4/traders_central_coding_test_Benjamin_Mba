import  { useState } from "react";
import Card from "./Card";
import BaseCurrencySelect from "./BaseCurrencySelect";
import SupportedVsCurrencySelect from "./SupportedVsCurrencySelect";

import { convertCurrency } from "../Apis";


const Body = () => {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState();
    const [base_currency, setBaseCurrency] = useState('');
    const [target_currency, setTargetCurrency] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');

    const convertBaseToTarget = async () => {
        setLoading(true);

        const form_data = { base_currency, target_currency }

        await convertCurrency(form_data)
            .then((response) => {

                setLoading(false);

                const rate = response.data[`${base_currency}`];

                console.log(rate[`${target_currency}`]);

                console.log(amount);

                const converted = amount * rate[`${target_currency}`];

                setConvertedAmount(converted);

            })
            .catch((error) => {
                setLoading(false);

                console.log(error);
                alert('Something went horribly wrong....')
            })
    }



    return (

        <>

            <div className="row py-3">
                <div className="col-md-6">
                    <Card title={'Base Currency'}>
                        <BaseCurrencySelect
                            label={'Base Currency'}
                            id={'base_currency'}
                            nullValueMessage={'Select a base currency'}
                            handleChange={setBaseCurrency}
                        />
                    </Card>
                </div>

                <div className="col-md-6">
                    <Card title={'Target Currency'}>
                        <SupportedVsCurrencySelect
                            label={'Target Currency'}
                            id={'target_currency'}
                            nullValueMessage={'Select a target currency'}
                            handleChange={setTargetCurrency}
                        />
                    </Card>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <Card title={'Amount & Result'}>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input type="number" onChange={(e) => setAmount(e.target.value)} className="form-control" />
                        </div>

                        <div className="text-center py-4">
                            <button className="btn btn-dark" disabled={target_currency == "" || base_currency == ""} onClick={() => convertBaseToTarget()}>
                                {
                                    loading ? (
                                        <div className="row  d-flex justify-content-center align-items-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>

                                            </div>
                                        </div>
                                    ) : 'Convert'
                                }
                            </button>
                        </div>
                        {

                            convertedAmount != "" ? (
                                <div className="text-center">
                                    <h3>{convertedAmount} {target_currency}</h3>
                                </div>
                            ) : ''
                        }
                    </Card>
                </div>
            </div>
        </>


    );
}

export default Body;