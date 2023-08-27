let listaLivros = document.getElementById("lista-livros");
let modal = document.getElementById("modal");
let btnClose = document.getElementById("close");
let pesquisa = document.getElementById("pesquisa");
let loader = document.getElementById("loader");
let livros = [];

let termoDePesquisa = "";
let qtdItens = 0;
let resultadosPorPagina = 12;
let qtdPaginas = 0;
let paginaAtual = 1;
let paginacao = document.getElementById("paginacao");
let spanPagAtual = document.getElementById("pag-atual");
let btnPagAnteiror = document.getElementById("pag-anterior");
let btnPagProxima = document.getElementById("pag-proxima");

let mensagem = document.getElementById("mensagem");

function carregarListaLivros() {
  listaLivros.innerHTML = "";
  livros.forEach((livro, idx) => {
    listaLivros.appendChild(cardFromBook(livro, idx));
  });
}

function cardFromBook(livro, index) {
  let li = document.createElement("li");
  li.innerHTML = `<img src="${livro.capa}" alt="${livro.titulo}" class="capa">
				<h6 class="titulo">${livro.titulo}</h6>`;

  li.addEventListener("click", () => {
    modal.style.display = "block";
    carregarModalComLivro(index);
	btnClose.focus();
  });

  return li;
}

btnClose.addEventListener("click", () => {
  modal.style.display = "none";
});

function carregarModalComLivro(index) {
  let titulo = document.getElementById("titulo");
  let capa = document.getElementById("capa");
  let autores = document.getElementById("autores");
  let publicacao = document.getElementById("publicacao");
  let editora = document.getElementById("editora");
  let descricao = document.getElementById("descricao");
  let categorias = document.getElementById("categorias");

  let livro = livros[index];

  titulo.innerText = livro.titulo;
  capa.setAttribute("src", livro.capa);
  autores.innerHTML = "";
  livro.autores.forEach((autor) => autores.appendChild(spanFromAutor(autor)));
  publicacao.innerText = livro.publicacao;
  editora.innerText = livro.editora;
  descricao.innerText = livro.descricao;
  titulo.innerText = livro.titulo;
  categorias.innerHTML = "";
  livro.categorias.forEach((categoria) =>
    categorias.appendChild(spanFromCategoria(categoria))
  );
}

function spanFromAutor(autor) {
  let span = document.createElement("span");
  span.classList.add("autor");
  span.innerText = autor;
  span.addEventListener("click", () => {
    termoDePesquisa = `inauthor:${autor}`;
    pesquisar(termoDePesquisa);
    mensagem.innerHTML = `<p>Você pesquisou pelo autor(a): <span class="destaque">${autor}</span></p>`;
  });
  return span;
}

function spanFromCategoria(categoria) {
  let span = document.createElement("span");
  span.classList.add("categoria");
  span.innerText = categoria;
  span.addEventListener("click", () => {
    termoDePesquisa = `subject:${categoria}`;
    pesquisar(termoDePesquisa);
    mensagem.innerHTML = `<p>Você pesquisou pela categoria: <span class="destaque">${categoria}</span></p>`;
  });
  return span;
}

async function pesquisar(
  termoDePesquisa,
  pagina = 0,
  resultadosPorPagina = 12
) {
  modal.style.display = "none";
  loader.style.display = "block";
  pesquisa.value = "";
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${termoDePesquisa}&startIndex=${
      pagina * resultadosPorPagina
    }&maxResults=${resultadosPorPagina}&filter=partial&printType=books`
  );
  let resultado = await response.json();

  livros = [];

  if (resultado.totalItems) {
    qtdItens = resultado.totalItems;

    qtdPaginas =
      qtdPaginas < 1 ? Math.round(qtdItens / resultadosPorPagina) : qtdPaginas;
    resultado.items.forEach((livroPesquisa) => {
      livros.push(livroFromPesquisa(livroPesquisa));
    });
  } else {
    livros.push(livroFromPesquisa(resultado));
  }
  carregarListaLivros();
  atualizarPaginacao();
  loader.style.display = "none";
  mensagem.focus();
}

function livroFromPesquisa(resultado) {
  let livro = {
    titulo: resultado.volumeInfo.title,
    capa: resultado.volumeInfo.imageLinks.thumbnail,
    autores: resultado.volumeInfo.authors,
    publicacao: resultado.volumeInfo.publishedDate,
    editora: resultado.volumeInfo.publisher,
    descricao: resultado.volumeInfo.description,
    categorias: resultado.volumeInfo.categories,
  };

  return livro;
}

pesquisa.addEventListener("search", () => {
  termoDePesquisa = pesquisa.value;
  paginaAtual = 1;
  qtdPaginas = 0;
  pesquisar(termoDePesquisa);
  mensagem.innerHTML = `<p>Você pesquisou por: <span class="destaque">${termoDePesquisa}</span></p>`;
});

btnPagAnteiror.addEventListener("click", () => {
  if (paginaAtual > 1) {
    paginaAtual--;
  }

  pesquisar(termoDePesquisa, paginaAtual, resultadosPorPagina);
});

btnPagProxima.addEventListener("click", () => {
  if (paginaAtual < qtdPaginas) {
    paginaAtual++;
  }

  pesquisar(termoDePesquisa, paginaAtual, resultadosPorPagina);
});

function atualizarPaginacao() {
  paginacao.style.display = "block";
  spanPagAtual.innerText = `Página ${paginaAtual} de ${qtdPaginas}`;

  if (paginaAtual == 1) {
    btnPagAnteiror.setAttribute("disabled", "");
  } else {
    btnPagAnteiror.removeAttribute("disabled");
  }

  if (paginaAtual == qtdPaginas) {
    btnPagProxima.setAttribute("disabled", "");
  } else {
    btnPagProxima.removeAttribute("disabled");
  }
}
