let listaLivros = document.getElementById("lista-livros");
let modal = document.getElementById("modal");
let btnClose = document.getElementById("close");
let pesquisa = document.getElementById("pesquisa");
let loader = document.getElementById("loader");
let livros = [];

for (let i = 0; i < 10; i++) {
	let livro = {
		titulo : "Titulo " + i,
		capa : "./img/capa.png",
		autores: [
			"Autor " + i,
			"Outro Autor " + i
		],
		publicacao: "10-10-2010",
		editora: "Editora " + i,
		descricao: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.",
		categorias: [
			"Ação " + i,
			"Aventura " + i
		]
	};
	livros.push(livro);
}

function carregarListaLivros(){
	listaLivros.innerHTML = "";
	livros.forEach((livro, idx) => {
		listaLivros.appendChild(cardFromBook(livro, idx));
	});
}

function cardFromBook(livro, index){
	let li = document.createElement("li");
	li.innerHTML =  `<img src="${livro.capa}" alt="capa" class="capa">
				<h6 class="titulo">${livro.titulo}</h6>`;

	li.addEventListener("click",()=>{
		modal.style.display = "block";
		carregarModalComLivro(index);
	});

	return li;
}
/*
for (let index = 0; index <= listaLivros.childNodes.length; index++) {
	const child = listaLivros.childNodes[index];

	if(child){
		child.addEventListener("click",()=>{
			modal.style.display = "block";
			carregarModalComLivro(index);
		});
	}
}*/

btnClose.addEventListener("click", ()=>{
	modal.style.display= "none";
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
	livro.autores.forEach((autor)=> autores.appendChild(spanFromAutor(autor)));
	publicacao.innerText = livro.publicacao;
	editora.innerText = livro.editora;
	descricao.innerText = livro.descricao;
	titulo.innerText = livro.titulo;
	categorias.innerHTML = "";
	livro.categorias.forEach((categoria)=> categorias.appendChild(spanFromCategoria(categoria)));

}

function spanFromAutor(autor){
	let span = document.createElement("span");
	span.classList.add("autor");
	span.innerText = autor;
	return span;
}

function spanFromCategoria(categoria){
	let span = document.createElement("span");
	span.classList.add("categoria");
	span.innerText = categoria;
	return span;
}

async function pesquisar(nomeLivro){
	const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${nomeLivro}&filter=partial&printType=books`);
	let resultado = await response.json();
	//console.log(resultado);
	
	livros = [];
	
	if(resultado.totalItems){
		resultado.items.forEach((livroPesquisa)=>{
			livros.push(livroFromPesquisa(livroPesquisa));
		});
	} else {
			livros.push(livroFromPesquisa(resultado));	
	}
	carregarListaLivros();
	loader.style.display = "none";
}

function livroFromPesquisa(resultado){
	let livro = {
		titulo : resultado.volumeInfo.title,
		capa : resultado.volumeInfo.imageLinks.thumbnail,
		autores: resultado.volumeInfo.authors,
		publicacao: resultado.volumeInfo.publishedDate,
		editora: resultado.volumeInfo.publisher,
		descricao: resultado.volumeInfo.description,
		categorias: resultado.volumeInfo.categories
	};

	return livro;
}

pesquisa.addEventListener("search", ()=>{
	loader.style.display = "block";
	pesquisar(pesquisa.value);
});

