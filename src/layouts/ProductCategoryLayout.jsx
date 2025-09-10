import ProductCategoryCard from "../components/products/ProductCategoryCard";

const productCategories = [
    {id: 1, name: 'SPECIAL OF THE DAY', image: "https://www.katachiware.com.au/wp-content/uploads/2025/03/Traditional-Bento-Box-640x640.jpg"},
    {id: 2, name: 'BENTO', image: "https://www.katachiware.com.au/wp-content/uploads/2025/03/Traditional-Bento-Box-640x640.jpg"},
    {id: 3, name: 'RAMEN', image: "https://hikarimiso.com/wp-content/uploads/2024/05/Trimmed_03_Miso-Ramen_02_M.jpg"},
    {id: 4, name: 'RICE BOWLS', image: "https://feedgrump.com/wp-content/uploads/2023/05/hawaii-chicken-katsu-curry-plating-feature.jpg"},
    {id: 5, name: 'FISH N CHIPS', image: "https://www.thespruceeats.com/thmb/sdVTq0h7xZvJjPr6bE2fhh5M3NI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-best-fish-and-chips-recipe-434856-hero-01-27d8b57008414972822b866609d0af9b.jpg"},
    {id: 6, name: 'SNACK N DESSERT', image: "https://iamafoodblog.b-cdn.net/wp-content/uploads/2024/12/takoyaki-recipe-4790w.jpg"},
    {id: 7, name: 'DRINKS', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5zVfH2FPAZ68cp-oPOGisnO3Czi-aS-5NGg&s"}
];



const ProductCategoryLayout = ({onCategoryClick }) => {
    return (
        <div>
            <div className="row">
                <div className="col-md-6 text-center">
                    <ProductCategoryCard category={productCategories[0]} onClick={onCategoryClick} large />
                </div>
                <div className = "col-md-6">
                    <div className="row row-cols-1 row-cols-md-2 g-4  text-center">
                    {productCategories.slice(1, 5).map((category ) => (
                        <div className="col" key={category.id}>
                        <ProductCategoryCard category={category} onClick={onCategoryClick} />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div className = "row row-cols-1 row-cols-md-2 g-4 text-center mt-4">
                    {productCategories.slice(5).map((category) => (
                        <div className="col" key={category.id}>
                            <ProductCategoryCard category={category} onClick={onCategoryClick} wide />
                        </div>
                    ))}
            </div>
        </div>

    );
};

export default ProductCategoryLayout;