'use strict'
import { Octokit, App } from "https://cdn.skypack.dev/octokit";

const form = document.querySelector('form');
const results = document.querySelector('.results');

console.log('edjasb')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.repo.value ? searchRepo(form.repo.value) : showError(form) ;
})



function showError(form){
  let error = document.createElement('p');
  error.className= 'error';
  error.innerHTML = 'Поле должно быть заполнено';
  form.append(error);
  form.repo.addEventListener('input', () => {error.remove()}, {once: true})
}

async function searchRepo(str){
    const octokit = new Octokit({
      auth: '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'
    })

    let resp = await octokit.request(`GET /search/repositories?q=${str}&per_page=10`, {
      headers: {},
    })

    showResults(resp)
}

function showResults(resp){
  results.innerHTML = '';
  if (resp.data.items.length == 0) {
    results.innerHTML='<h2>Ничего не найдено</h2>';
    return;
  }
  resp.data.items.forEach(element => {
      let date = new Date(element.created_at);
      results.innerHTML += `<div class='results__item'><a target='_blank' href='${element.html_url}' class="result__name">${element.name}</a>
        <p class="result__desc">${element.description}<p>  
        <p class="result__lang"><span>Язык: </span>${element.language}</p>
        <p class="result__watchers"><span>Просматривают: </span>${element.watchers}</p>
        <p class="result__watchers"><span>Создан: </span>${date.toLocaleString()}</p></div>`;
  });

}



