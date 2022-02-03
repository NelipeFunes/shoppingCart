const fetchProducts = async (product) => {
  if (!product) throw new Error('You must provide an url');
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const output = await fetch(endpoint);
  const data = await output.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
