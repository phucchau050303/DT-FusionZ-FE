import ProductCategoryCard from "../components/products/ProductCategoryCard";

const productCategories = [
    {id: 1, name: 'SPECIAL OF THE DAY', image: "https://dtfusionzstorage.blob.core.windows.net/menu-images/SobaNoodlesSalad.avif"},
    {id: 2, name: 'BENTO', image: "https://dtfusionzstorage.blob.core.windows.net/menu-images/3F3W.avif"},
    {id: 3, name: 'RAMEN', image: "https://hikarimiso.com/wp-content/uploads/2024/05/Trimmed_03_Miso-Ramen_02_M.jpg"},
    {id: 4, name: 'RICE BOWLS', image: "https://dtfusionzstorage.blob.core.windows.net/menu-images/Katsudon.avif"},
    {id: 5, name: 'FISH N CHIPS', image: "https://dtfusionzstorage.blob.core.windows.net/menu-images/fishAndChips.avif"},
    {id: 6, name: 'ENTREÉ', image: "https://iamafoodblog.b-cdn.net/wp-content/uploads/2024/12/takoyaki-recipe-4790w.jpg"},
    {id: 7, name: 'DRINKS', image: "https://dtfusionzstorage.blob.core.windows.net/menu-images/Drinks.jpg"}
];


function onClick() {
    window.location.href = `/menu/`;
}

const ProductCategoryLayout = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-6 text-center">
                    <ProductCategoryCard category={productCategories[0]} onClick={onClick} large />
                </div>
                <div className = "col-md-6">
                    <div className="row row-cols-1 row-cols-md-2 g-4  text-center">
                    {productCategories.slice(1, 5).map((category ) => (
                        <div className="col" key={category.id}>
                        <ProductCategoryCard category={category} onClick={onClick} />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div className = "row row-cols-1 row-cols-md-2 g-4 text-center mt-4">
                    {productCategories.slice(5).map((category) => (
                        <div className="col" key={category.id}>
                            <ProductCategoryCard category={category} onClick={onClick} wide />
                        </div>
                    ))}
            </div>
        </div>

    );
};

export default ProductCategoryLayout;