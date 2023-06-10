import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

interface BladeType {
  price: number;
  name: string;
  imgUrl: string;
  _id: string;
}

const ShortTrackBlades = () => {
  const [bladeTypes, setBladeTypes] = useState<BladeType[]>([]);

  const [fetchError, setFetchError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get("api/v1/products");
        if (!data.ok) throw Error("did not recieve data");
        setBladeTypes(data.products);
        setFetchError(null);
      } catch (error: any) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="shortTrackBlades">
      <h3>Short Track Blades</h3>
      {isLoading ? (
        <p>Loading products..</p>
      ) : !fetchError ? (
        bladeTypes.map((blade) => (
          <Product
            key={blade._id}
            imgUrl={blade.imgUrl}
            name={blade.name}
            price={blade.price}
          />
        ))
      ) : (
        <p>Error occurred during load...</p>
      )}
    </div>
  );
};

export default ShortTrackBlades;
