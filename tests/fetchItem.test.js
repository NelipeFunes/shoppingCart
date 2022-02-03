require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it ('Teste se fetchItem é uma funçao', () => {
    expect(typeof fetchItem === 'function').toBe(true);
  });
  it ('Testa se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it ('Teste se chamar funçao fetchItem a fetch utilia endpoint correta', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it ('Teste o retorno da funçao fetchItem com argumento especifico', async () => {
    const func = await fetchItem('MLB1615760527');
    expect(func).toBe(item);
  });
  it('Teste se chamar a funçao fetchItem sem argumento', () => {
    fetchItem();
    expect(fetchItem()).rejects.toThrow(new Error('mensagem esperada aqui'));

  });
});
