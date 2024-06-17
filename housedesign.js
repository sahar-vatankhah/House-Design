// const BASE_URL = 'https://66695a342e964a6dfed4c586.mockapi.io';

// import { LocalStorageData } from './utils/storage.js';
class LocalStorageData {
    static setData(data) {
      localStorage.setItem('user', JSON.stringify(data._id));
    }
  
    static getData(term) {
      const data = localStorage.getItem(term);
      return JSON.parse(data);
    }
  
    static removeData() {
      localStorage.removeItem('user');
    }
  }
  
  
  ////////////
  const BASE_URL = 'https://66695a342e964a6dfed4c586.mockapi.io';
  
  
  
  const checkUser = async () => {
    try {
      const token = LocalStorageData.getData('user');
      console.log(token);
  
      if (token) {
        const res = await fetch(`${BASE_URL}/users/${token}`);
  
        if (res.status !== 200) {
          window.location.replace('./signin.html');
        } else {
          const user = await res.json();
          emailPreview.textContent = 'welcome ' + user.email;
          emailPreview.style.color = 'lightgreen';
  
          // if (user.role === 'admin') {
          //   const panelAdminButton = document.createElement('a');
          //   panelAdminButton.textContent = 'admin panel';
          //   panelAdminButton.href = './adminPanel.html';
          //   panelAdminButton.className = 'btn btn-outline-danger';
          //   links.append(panelAdminButton);
          // }
        }
      } else {
        window.location.replace('./signin.html');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  checkUser();
  
  
  
  
  const section = document.querySelector('section');
  const keyApi = '2Y8SgEv2Rp85Lh7SLCAEDIdTgYKa-d4Hj_Q5NJr0Acg';
  const query = 'home design';
  const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${keyApi}`;
  
  const userData = async () => {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data.results;
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  
  userData().then(data => {
    if (data && data.length > 0) {
      data.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.cursor = 'pointer';
        section.append(card);
  
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = user.urls.small;
        img.alt = user.alt_description;
        card.append(img);
  
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.append(cardBody);
  
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = 'Home Design';
        cardBody.append(title);
  
        const text = document.createElement('p');
        text.classList.add('card-text');
        text.textContent = 'A beautiful home design picture.';
        cardBody.append(text);
  
        const button = document.createElement('button');
        button.textContent = 'View More';
        cardBody.append(button);
  
        button.addEventListener('click', () => {
          window.open(user.links.html, '_blank');
        });
      });
    } else {
      console.log('No data found');
    }
  });