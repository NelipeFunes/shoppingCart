require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it ('Teste se fetch é uma função.', () => {
    expect(typeof fetchProducts === 'function').toBe(true);
  });
  it ('Testa se a funçao fetch foi chamada.', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it ('Testa se ao chamar o fetchProducts com o argumento computador utiliza o endpoint correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });
  it ('Teste o retorno da função', async () => {
    const func = await fetchProducts('computador');
    expect(func).toBe(computadorSearch);
  });
  it ('Test fetchProducts sem argumento retorna erro', () => {
    expect(fetchProducts()).rejects.toThrow(new Error('You must provide an url'));
  });
});
