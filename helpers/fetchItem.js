const fetchItem = async (id) => {
  if (!id) throw new Error('mensagem esperada aqui');
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  const output = await fetch(endpoint);
  const data = await output.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
