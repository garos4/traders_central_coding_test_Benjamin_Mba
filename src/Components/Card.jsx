/**
 * This is the card component
 * 
 * It accepts two props
 * 
 * 1. title: which handles the title
 * 
 * 2. children: which handles everything child passed to the component
 *  
 */


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