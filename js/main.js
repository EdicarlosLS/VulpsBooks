let listaLivros = document.getElementById("lista-livros");
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

livros.forEach((livro) => {
	listaLivros.appendChild(cardForBook(livro));
});

function cardForBook(livro){
	let li = document.createElement("li");
	li.innerHTML =  `<img src="${livro.capa}" alt="capa" class="capa">
				<h6 class="titulo">${livro.titulo}</h6>`;
	return li;
}

let modal = document.getElementById("modal");
for (let index = 0; index <= listaLivros.childNodes.length; index++) {
	const child = listaLivros.childNodes[index];

	if(child){
		child.addEventListener("click",()=>{
			modal.style.display = "block";
			carregarModalComLivro(index);
		});
	}
}

let btnClose = document.getElementById("close");
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
