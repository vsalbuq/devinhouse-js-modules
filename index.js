/**
 * 1 - Ao inserir nome e idade nos campos e clicar no botão, criar novo objeto;
 * 2 - Validar campos: Se estiver vazio, exibir mensagem informando o erro;
 * 3 - Validar idade: Máximo 3 dígitos;
 * 4 - Ao clicar no botão "Dizer nome", exibir mensagem informando o nome;
 * 5 - Ao clicar no botão "Dizer idade", exibir mensagem informando a idade;
 */


/**
 * Quantos contextos tenho dentro deste código?
 * - Classes User e UserList
 * - Front end (adiciono elementos à página e atribuo ações a botões)
 * - Funções validadoras
 * - Print
 */

import User from "./classes/User.js";
import UserList from "./classes/UserList.js";
import { isEmpty, isValidAge } from "./functions/validators.js";
import { printAge, printName } from "./functions/print.js";

const users = new UserList();

document
  .querySelector('#btn-registrar')
  .addEventListener("click", () => {
    let name = document.querySelector('#name').value;
    let age = document.querySelector('#age').value;

    if (isEmpty(name)) {
      alert("Favor preencher o campo 'Nome'");
      return;
    }

    if (isEmpty(age) || !isValidAge(age)) {
      alert("Favor preencher o campo 'Idade' com um valor válido.");
      return;
    }

    const user = new User(name, age);
    users.add(user);

    appendToList(user);
  });

function appendToList(user) {
  let row = document.createElement('tr');
  let textName = document.createTextNode(user.name);
  let textAge = document.createTextNode(user.age);
  let tdName = createTableCell(textName);
  let tdAge = createTableCell(textAge);
  let tdActions = createTableCell();

  let btnDizerNome = document.createElement('button');
  btnDizerNome.classList.add("btn-dizer-nome");
  btnDizerNome.addEventListener('click', () => printName(user.name));
  btnDizerNome.innerHTML = "Dizer Nome";


  let btnDizerIdade = document.createElement('button');
  btnDizerIdade.classList.add("btn-dizer-idade");
  btnDizerIdade.addEventListener('click', () => printAge(user.age));
  btnDizerIdade.innerHTML = "Dizer Idade";

  tdActions.appendChild(btnDizerNome);
  tdActions.appendChild(btnDizerIdade);

  row.appendChild(tdName);
  row.appendChild(tdAge);
  row.appendChild(tdActions);

  document.querySelector('tbody').appendChild(row);
}

function createTableCell(innerElement = "") {
  let td = document.createElement('td');
  td.appendChild(innerElement);
  return td;
}
