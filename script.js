const cart = document.querySelector('.cart__items');

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
  const targ = event.target;
  cart.removeChild(targ);
  localStorage.setItem('cartItems', cart.innerHTML);
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
  const data = {
    sku: items.id,
    name: items.title,
    salePrice: items.price,
  };
  cart.appendChild(createCartItemElement(data));
  localStorage.setItem('cartItems', cart.innerHTML);
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

function empCart() {
  const carrinho = document.querySelectorAll('.cart__items');
  carrinho[0].innerHTML = '';
  localStorage.setItem('cartItems', cart.innerHTML);
}
async function totalPrice() {
  await fetchItem();
  const price = cart.innerHTML.split('$');
  console.log(price);
}

window.onload = async () => {
  await createItems('computador');
  const loading = document.querySelector('.loading');
  loading.remove();
  cart.innerHTML = localStorage.getItem('cartItems');
  const cartList = document.querySelectorAll('.cart__item');
  cartList.forEach((list) => {
    list.addEventListener('click', cartItemClickListener);
  });
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', empCart);
  totalPrice();
};
