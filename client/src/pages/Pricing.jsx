import React, { useState } from "react";

const Pricing = () => {
    const [productArray, setProductArray] = useState([
        { productName: 'Shirt', price: [10, 20, 30, 40], productDescription: 'A classic cotton shirt for everyday wear.' },
        { productName: 'TShirt', price: [100, 200, 300, 400], productDescription: 'Comfortable and stylish T-shirt for casual occasions.' },
        { productName: 'Pants', price: [10, 20, 30, 40], productDescription: 'Versatile pants suitable for various occasions.' },
        { productName: 'Jeans', price: [10, 20, 30, 40], productDescription: 'Durable and fashionable denim jeans.' },
        { productName: 'Boxers', price: [10, 20, 30, 40], productDescription: 'Soft and breathable boxers for everyday comfort.' },
        { productName: 'Joggers', price: [10, 20, 30, 40], productDescription: 'Casual joggers perfect for lounging or light activities.' },
        { productName: 'Suit', price: [10, 20, 30, 40], productDescription: 'Elegant suit for formal occasions and events.' },
    ]);

    return (
        <div className="container mx-auto mt-8 font-Montserrat">
            <h1 className="text-3xl font-bold mb-4">Product Pricing Table</h1>
            <table className="min-w-full border border-gray-300 xxl:text-lg xl:text-lg lg:text-lg md:text-sm sm:text-xs es:text-xs">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Product</th>
                        <th className="border border-gray-300 p-2 xxl:block xl:block lg:block md:block sm:hidden es:hidden">Description</th>
                        <th className="border border-gray-300 p-2">Washing</th>
                        <th className="border border-gray-300 p-2">Iron</th>
                        <th className="border border-gray-300 p-2">Bleach</th>
                        <th className="border border-gray-300 p-2">Color</th>
                    </tr>
                </thead>
                <tbody>
                    {productArray.map((product, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2 text-center font-semibold">{product.productName}</td>
                            <td className="border border-gray-300 py-2 px-3 break-all xxl:block xl:block lg:block md:block sm:hidden es:hidden">{product.productDescription}</td>
                            {product.price.map((price, priceIndex) => (
                                <td key={priceIndex} className="border border-gray-300 p-2 text-center">{`₹${price}`}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pricing;
