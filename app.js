const api = {
  productInfo: async () => {
    const products = [
      {
        name: "Product 1",
        price: "100",
        quantity: 5,
      },
      {
        name: "Product 2",
        price: "150",
        quantity: 3,
      },
      {
        name: "Product 3",
        price: "300",
        quantity: 10,
      },
    ];

    return products;
  },

  owner: "Ruth",
};

// fetch.then
api.productInfo().then((res) => console.log(res));

// AsyncFunction
const group1 = async () => {
  try {
    const response = await api.productInfo();

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

group1();
