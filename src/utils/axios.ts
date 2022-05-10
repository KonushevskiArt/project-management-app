import axios from 'axios';
import { UserData } from 'pages/LogIn/iterfaces';
import { UseFormReset } from 'react-hook-form';

function checkToken() {
  if (!localStorage.getItem('token')) return '';
  return localStorage.getItem('token');
}

export const Request = (
  method: string,
  urlProp: string,
  reset: UseFormReset<UserData>,
  data?: UserData
) => {
  const baseUrl = 'https://pure-cove-88107.herokuapp.com';
  axios({
    method: method,
    url: `${baseUrl}${urlProp}`,
    headers: { Authorization: `Bearer ${checkToken()}` },
    data: data,
  })
    .then(function (response) {
      if (urlProp === '/signin') localStorage.setItem('token', response.data.token);
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status === 403) alert('User not found');
        reset();
      }
    });
};
