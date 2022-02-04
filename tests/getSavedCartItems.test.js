const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it ('Teste se ao exercutar funçao o metodo getitem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it ('Testa se foi usado param especifico', () => {
    getSavedCartItems('cartItem');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItem');
  })
});
