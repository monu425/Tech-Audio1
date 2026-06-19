const fetchProducts = async ( selectedTab: string ) => {

  try {
    const data = await fetch( `https://dummyjson.com/products/category/${selectedTab.toLowerCase()}`,
      {
        next: {
          revalidate: 300,
          tags: ["products"],
        },
      }
    ).then((res) => res.json());

    return data?.products || [];

  } catch (error) {

    console.log(
      "Error fetching products:",
      error
    );

    return [];
  }
};

export { fetchProducts,}