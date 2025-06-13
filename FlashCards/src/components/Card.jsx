

const Card = ({ Category,className,content,difficulty,imageLink}) => {
    return (
        <div className={`${className} ${difficulty}`} >
            <h1>{Category} :</h1>
            <p>{content}</p>
            {imageLink ? (<img className= 'card-image' src={imageLink} alt="" />) : null}
        
        </div>
    )
}


export default Card