// import { Authentication } from './utils/auth.js';
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
//   /////////////////////////////
  const BASE_URL = 'https://66695a342e964a6dfed4c586.mockapi.io';
  
  class Authentication {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
  
    verifyData() {
      if (!this.email.endsWith('@gmail.com')) {
        throw new Error('emailError');
      }
  
      if (this.password.length < 5) {
        throw new Error('passwordError');
      }
    }
  
    async signup() {
      try {
        const getUsers = await fetch(`${BASE_URL}/users`);
        const users = await getUsers.json();
  
        const doesUserExists = users.find((user) => user.email === this.email);
  
        if (doesUserExists) {
          return {
            statusCode: 409,
            message: 'the email is already exists',
            data: '',
          };
        }
  
        const response = await fetch(`${BASE_URL}/users`, {
          method: 'POST',
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
          headers: {
            'content-type': 'application/json',
          },
        });
  
        const createdUser = await response.json();
  
        return {
          statusCode: 201,
          message: 'signed up successfully',
          data: createdUser,
        };
      } catch (error) {
        console.log('in catch block');
        console.log(error);
      }
    }
  
    async signin() {
      try {
        const getUsers = await fetch(`${BASE_URL}/users`);
        const users = await getUsers.json();
  
        const doesUserExits = users.find((user) => user.email === this.email);
  
        if (!doesUserExits) {
          return {
            statusCode: 404,
            message: 'email or password incorrect',
            data: '',
          };
        }
  
        if (this.password !== doesUserExits.password) {
          return {
            statusCode: 404,
            message: 'email or password incorrect',
            data: '',
          };
        }
  
        return {
          statusCode: 200,
          message: 'logged in successfully',
          data: doesUserExits,
        };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          message: 'Internal server error',
          data: '',
        };
      }
    }
  }
  /////////////////
  const signInForm = document.querySelector('form');
  const messagePreview = document.querySelector('.message');
  
  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    messagePreview.textContent = '';
  
    const emailInput = e.target.email;
    const passwordInput = e.target.password;
  
    try {
      const user = new Authentication(
        emailInput.value.trim(),
        passwordInput.value.trim()
      );
  
      user.verifyData();
  
      const res = await user.signin();
      if (res.statusCode === 404) {
        messagePreview.textContent = res.message;
        messagePreview.style.color = 'crimson';
      }
  
      if (res.statusCode === 200) {
        LocalStorageData.setData(res.data);
        window.location.replace('/housedesign.html');
      }
    } catch (error) {
      if (error.message === 'emailError' || error.message === 'passwordError') {
        messagePreview.textContent = 'email or password incorrect';
        messagePreview.style.color = 'crimson';
      }
    }
  });