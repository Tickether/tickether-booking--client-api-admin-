import "./salesItems.scss";

const SalesItems = ({item}) => {
    return (
        <div className="searchItems">
            <img 
                src={item.image} 
                alt="" 
                className="siImg" 
            />
            <div className="siDesc">
                <h1 className="siTitle">{item.bookName}</h1>
                <span className="siGenre">{item.bookingDate}</span>
                <span className="siRegion">{item.city}, {item.country}</span>
                <span className="siLabel">{item.country}</span>
            </div>
        </div>
    )
}

export default SalesItems