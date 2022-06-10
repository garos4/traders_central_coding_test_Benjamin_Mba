import { useEffect } from 'react'

const Card = ({title,children}) => {

    return (
        <div className="card">
            <div className="card-header">
                <h3 className='text-center'>{title}</h3>
            </div>
            <ul className="card-body">
                {children}
            </ul>
        </div>
    );
}

export default Card;