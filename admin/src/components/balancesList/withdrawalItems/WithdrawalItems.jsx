import "./withdrawalItems.scss";

const WithdrawalItems = ({item}) => {
    return (
        <div className="searchItems">
            <img 
                src={item.image} 
                alt="" 
                className="siImg" 
            />
            <div className="siDesc">
                <h1 className="siTitle">{item.bookName}</h1>
                <span className="siGenre">{item.txnHash}</span>
                <span className="siRegion">{item.amount}</span>
                <span className="siLabel">{item.withdrawAt}</span>
            </div>
        </div>
    )
}

export default WithdrawalItems