import api from './api';
/* const arr = [1,3,4,5,8,9];

const newArr = arr.map(item => item+2);
////console.log(newArr);


const sum = arr.reduce(function(total,next){
    return total+next;
});
////console.log(sum);

const filter = arr.filter(function(item){
    return item %2 === 0;
});
////console.log(filter);

const find = arr.find(function(item){
    return item === 4;
});
//console.log(find);


function soma (a = 3,b = 6){
    return a+b;
}
//console.log(soma(1));

const usuario = {
    nome: 'Roberto',
    idade:21,
    endereco :{
        cidade :'São Paulo',
        estado:'SP'
    }
};

//const {nome, idade, endereco : {cidade}} = usuario;
//console.log(cidade);


function monstraNome ({nome, idade}){
    console.log(nome, idade);
}
monstraNome(usuario);

//REST 
const {nome, ...resto} = usuario;
console.log(resto);

const arrg = [1,2,3,4,5];
const [a,b, ...c]=arrg;
console.log(c);

//SPREAD
const arr1 = [1,2,3];
const arr2 = [4,5,6];

const arr3 = [...arr1,...arr2];
//console.log(arr3);
 */

//Object Short Syntax

//import {soma as somaFunc, sub} from './functions';
//import somaFunc from './soma'
/* import * as funcoes from './functions'
console.log(sub(1,2));

console.log(funcoes.soma(1,2));
 */
/* 
 const minhaPromise = () => new Promise((resolve,reject) => {
    setTimeout(()=>{resolve('Ok')},2000);
 });

 async function executaPromise(){
     const response = await minhaPromise();
     console.log(response);
     
 }
 executaPromise() */
/*  import axios from 'axios'
 
 class Api {
     static async getUserInfo(username){
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);      
            console.log(response);
            
        } catch (error) {
            console.warn('Erro na API')
        }
        
        }
 }
 Api.getUserInfo('roberto-almeida19'); */
 class App{
    constructor(){
        this.repositories = [];
        this.formEl = document.getElementById('repo-form');
        this.listEl = document.getElementById('repo-list');
        this.inputEl = document.querySelector('input[name=repository]');
        this.registerHandlers();
    }
    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoad(loading = true) {
        if(loading === true){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando'));
            loadingEl.setAttribute('id','loading');
            this.formEl.appendChild(loadingEl);
        }
        else{
            document.getElementById('loading').remove();
        }
    }

   async addRepository(event){
        event.preventDefault();
        const repoInput = this.inputEl.value;
        if(repoInput.length==0)
        return;
        
        this.setLoad();
      try {
        
        const response = await api.get(`/repos/${repoInput}`);
        const {name, description, html_url, owner :{avatar_url}} = response.data;
        console.log(response);
        this.repositories.push({
            name,
            description,
            avatar_url,
            html_url
        });
        this.render();
      } catch (error) {
          alert('O repositório não existe!');
      }
      this.setLoad(false);
    }
    render(){
        this.listEl.innerHTML = '';
        this.repositories.forEach( repo =>{
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descEl = document.createElement('p');
            descEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target','_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);

        });
        this.inputEl.text = '';
    }

 }
 new App();