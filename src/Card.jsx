import "./card.css"
export default function Card(props)
{
    return(
        <div className="item-card">
        <div className="item-image-section">
            <img src={props.item[1].image} alt="" />
        </div>
        <div className="item-details">
            <p className="item-name">{props.item[0]}</p>
            <div className="item-numbers">
                <p className="item-price">{"$"+props.item[1].price}</p>
                <p className="item-quantity">{props.item[1].quantity+"N"}</p>
            </div>
        </div>
        <div className="item-description">
            {props.item[1].description}
        </div>
        <button className="delBtn" onClick={()=>props.clickHandler(props.item)}>
            Del
        </button>
    </div>
    )
}