const LOADING_USER = "LOADING_USER";
/*const INITIAL_STATE = {
  colors: ["white", "black", "red", "green", "blue", "yellow"],
  index: 0,
};
// const INIT_STATE = { cont: 0 };

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "NEXT_COLOR":
      return {
        ...state,
        index: (state.index + 1) % state.colors.length,
      };
    case "PREVIOUS_COLOR":
      return {
        ...state,
        index: state.index > 0 ? state.index - 1 : state.colors.length - 1,
      };
    case "ADD_COLOR":
      return {
        ...state,
        colors: [...state.colors, action.payload],
        index: state.colors.length,
      };
    case "DELETE":
      if(state.colors.length <= 1) return state; 
      return {
        ...state,
        colors: state.colors.filter((el) => el !== state.colors[state.index]),
        index: state.index === state.colors.length - 1 ? 0 : state.index,
      };
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

function criarCor() {
  const oneChar = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let cor = "#";
  const aleatorio = () => Math.floor(Math.random() * oneChar.length);
  for (let i = 0; i < 6; i += 1) {
    cor += oneChar[aleatorio()];
  }
  return cor;
}

document.getElementById("next").addEventListener("click", () => {
  store.dispatch({ type: "NEXT_COLOR" });
});

document.getElementById("previous").addEventListener("click", () => {
  store.dispatch({ type: "PREVIOUS_COLOR" });
});

document.getElementById("random").addEventListener("click", ({ target }) => {
  store.dispatch({ type: "PREVIOUS_COLOR" });
  const cor = criarCor();
  // target.style.border = "1px solid red";
  // target.style.background = cor;
  store.dispatch({ type: "ADD_COLOR", payload: cor });
  console.log(cor);
});

document.getElementById("delete").addEventListener("click", () => {
  store.dispatch({ type: "DELETE" });
});

store.subscribe(() => {
  const { index, colors } = store.getState();
  console.log(index, colors, ' - ', colors[index]);
  span = document.getElementById("value");
  span.innerHTML = `[ ${colors[index]} ] Index no Array colors: [ ${index} ]`;
  document.getElementById('color').style.background = colors[index];
  carregaStateNaTela();
});

const carregaStateNaTela = () => {
  const pre = document.createElement('pre');
  const div = document.getElementById('state');
  div.innerHTML = '';
  pre.innerHTML = JSON.stringify(store.getState());
  // console.log(pre.innerHTML)
  div.appendChild(pre);
}

window.onload = () => carregaStateNaTela();
*/

const clearButton = document.getElementById('clear_btn');

 const INITIAL_STATE = {
  idUser: null,
  key: null,
  timer: null,
  search: '',
  searchList: [],
  FETCH_URL: 'http://localhost:3000',
  loading: false,
  loadingUser: false,
}; // http://127.0.0.1:3000

const load = () => {
  const pre = document.createElement('pre');
  const div = document.getElementById('state');
  const userId = window.localStorage.getItem('@userId') || null;
  const key = window.localStorage.getItem('@key') || null;
  const loadingUser = window.localStorage.getItem('@loadingUser') === 'true' || false;
  const FETCH_URL = window.localStorage.getItem('@FETCH_URL') || 'http://localhost:3000';
  const result = window.localStorage.getItem('@result') || null;
  console.log(loadingUser, result)
  if(!loadingUser && !userId || !key) {
    // const newKey = generateId(7,5);
    // window.localStorage.setItem('@key', newKey);
    return getUser(FETCH_URL);  
  } 
  div.innerHTML = '';
  // pre.innerHTML = JSON.stringify(INITIAL_STATE, null, 2) + 'tuffy';
  div.appendChild(pre);
}

const getUser = async (FETCH_URL) => {
  const loadingUser = window.localStorage.getItem('@loadingUser') === 'true' || false;
  if(loadingUser) return;
  try {
    // const response = await axios.get(`https://megas-l1w6.onrender.com/users`,
    //   {  headers: {                  
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Headers": "*", 
    //       "Content-Type": "application/json;"                   
    //   } }
    // );
const r = await fetch('https://megas-l1w6.onrender.com/users');
    const response = await r.json();
    console.log(response)
    // window.localStorage.setItem('@result', JSON.stringify(response.data));
    console.log(`GET: Here's the list of todos`, response.data);

  } catch (errors) {
    console.error(errors);
  } finally {
    // window.localStorage.setItem('@loadingUser', false);
    // load();
  }
}
window.onload = () => getUser() 
// const getTodoItems = async () => {
//   try {
//     const response = await axios.get(`http://localhost:3000/users`);

//     const todoItems = response.data;

//     console.log(`GET: Here's the list of todos`, todoItems);

//     return todoItems;
//   } catch (errors) {
//     console.error(errors);
//   }
// };

// const createTodoElement = item => {
//   const todoElement = document.createElement('li');

//   todoElement.appendChild(document.createTextNode(item.key));

//   return todoElement;
// };

// const updateTodoList = todoItems => {
//   const todoList = document.querySelector('ul');

//   if (Array.isArray(todoItems) && todoItems.length > 0) {
//     todoItems.map(todoItem => {
//       todoList.appendChild(createTodoElement(todoItem));
//     });
//   } else if (todoItems) {
//     todoList.appendChild(createTodoElement(todoItems));
//   }
// };

// const main = async () => {
//   updateTodoList(await getTodoItems());
// };

// main();