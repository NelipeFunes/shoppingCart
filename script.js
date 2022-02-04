function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
function cartItemClickListener(event) {
  const item = document.querySelector('.cart__items');
  const targ = event.target;
  item.removeChild(targ);
}
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
const buttonAddToShip = async (id) => {
  const items = await fetchItem(id);
  const cart = document.querySelector('.cart__items');
  const data = {
    sku: items.id,
    name: items.title,
    salePrice: items.price,
  };
  cart.appendChild(createCartItemElement(data));
};
const shipCart = async (e) => {
  const param = await getSkuFromProductItem(e.target.parentNode);
  buttonAddToShip(param);
};

const createItems = async (item) => {
  const itens = await fetchProducts(item);
  const items = document.querySelector('.items');
  itens.results.forEach((iten) => {
    const param = {
      sku: iten.id,
      name: iten.title,
      image: iten.thumbnail,
    };
    items.appendChild(createProductItemElement(param));
  });
  document.querySelectorAll('.item__add').forEach((btn) => {
    btn.addEventListener('click', shipCart);
  });
};

// const bababoey = async () => {
//   await fetchItem();
//   const btns = document.querySelectorAll('.item__add');
//   console.log(btns);
//   btns.forEach((btn) => {
//     btn.addEventListener('click', console.log('felipe'));
//   });
// };

window.onload = async () => {
  createItems('Fusca');
};
