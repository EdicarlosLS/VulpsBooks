let listaLivros = document.getElementById("lista-livros");
let livros = [];

for (let i = 0; i < 10; i++) {
	let livro = {titulo : "Titulo " + i, capa : "./img/capa.png"};
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
		});
	}
}

let btnClose = document.getElementById("close");
btnClose.addEventListener("click", ()=>{
	modal.style.display= "none";
});
