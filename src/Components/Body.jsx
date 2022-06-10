/**
 * This is the Body component
 * 
 * This is where all the components are called and laid out
 * 
 *  
 * 
 *    
 */

import { useState } from "react";
import Card from "./Card";
import BaseCurrencySelect from "./BaseCurrencySelect";
import SupportedVsCurrencySelect from "./SupportedVsCurrencySelect";

import { convertCurrency } from "../Apis";


const Body = () => {
    /**
     * Loading state(boolean) to control when a request for data is made to the server
     * for a particular rate
     */
    const [loading, setLoading] = useState(false);


    /**
     * Amount state to hold value of amount to be converted
     */
    const [amount, setAmount] = useState();


    /**
     * Base currency state to hold and set value selected for the base currency
     */
    const [base_currency, setBaseCurrency] = useState('');


    /**
     * Target currency state to hold value selected for the target currency
     */
    const [target_currency, setTargetCurrency] = useState('');


    /**
     * Converted amount state to hold value the equivalent value of the amount provided after conversion
     */
    const [convertedAmount, setConvertedAmount] = useState('');




    /**
     * Function to make api call for the rate
     * 
     * and the convert the amount provided with the rate returned from the api
     */
    const convertBaseToTarget = async () => {
        setLoading(true);


        /**
         * Setting params for the endpoint to consume
         * 
         */
        const form_data = { base_currency, target_currency }


        /**
         * Make request to the api 
         * 
         */
        await convertCurrency(form_data)
            .then((response) => {

                setLoading(false);


                /**
                 * Get value of rate returned in the response 
                 * 
                 */
                const rate = response.data[`${base_currency}`];

                /**
                 * Convert by multiplying rate by the amount entered 
                 * 
                 */
                const converted = amount * rate[`${target_currency}`];


                /**
                 * Set convertedAmount state 
                 * 
                 */
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