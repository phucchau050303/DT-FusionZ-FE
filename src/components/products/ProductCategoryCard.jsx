import '../../styles/ProductCategoryCard.css';

const ProductCategoryCard = ({ category, onClick, large, wide }) => {
  return (
    <div className={`card category-card border-0 rounded-0 bg-light${large ? ' large-card' : ''} ${wide ? ' wide-card' : ' '} `} onClick={() => onClick(category)}>
        <img src={category.image} alt={category.name} className={`card-img-top rounded-0 img-fluid category-img${large ? ' large-img' : ''}`} />
        <div className="card-body">
            <h3 className="card-title category-text">{category.name}</h3>
        </div>
    </div>
    );
};
export default ProductCategoryCard;