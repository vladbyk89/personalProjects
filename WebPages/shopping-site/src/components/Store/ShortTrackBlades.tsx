import Product from "./Product";

const ShortTrackBlades = () => {
  const bladeTypes = [
    {
      name: "M-Wave Firm",
      imgUrl: "https://www.skate-tec.com/webp/m-wave-flex-low-noise.webp",
      price: 599.88,
    },
    {
      name: "M-Wave Flex",
      imgUrl: "https://www.skate-tec.com/webp/m-wave-flex-low-noise.webp",
      price: 599.88,
    },
    {
      name: "Nagano",
      imgUrl: "https://www.skate-tec.com/webp/nagano2020.webp",
      price: 599.88,
    },
    {
      name: "Otto",
      imgUrl: "https://www.skate-tec.com/webp/otto-main.webp",
      price: 599.88,
    },
  ];

  return (
    <div className="shortTrackBlades">
      <h3>Short Track Blades</h3>
      {bladeTypes.map((blade) => (
        <Product imgUrl={blade.imgUrl} name={blade.name} price={blade.price} />
      ))}
    </div>
  );
};

export default ShortTrackBlades;
