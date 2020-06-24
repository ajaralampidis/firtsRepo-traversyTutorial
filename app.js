//Book Class: Constructora de objetos -> Libro

class Libro {
    constructor(titulo, autor, isbn){
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
    }
}

//UI Class: Maneja la interfaz Gráfica

class UI {
    static mostrarLibros() {
        const libros = Guardar.getLibros();

        libros.forEach((libro) => UI.agregarLibroALista(libro)); 
    };

    static agregarLibroALista(libro) {
        const lista = document.querySelector("#lista-libros");

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `;

        lista.appendChild(row);
    };

    static eliminarLibros(elemento) {
        if(elemento.classList.contains("delete")){
            elemento.parentElement.parentElement.remove();
        }
    }

    static alerta(mensaje, className) {
        const div = document.createElement("div");
        div.className= `text-center alert alert-${className}`;
        div.appendChild(document.createTextNode(mensaje));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        //desvancer
        setTimeout(() => document.querySelector(".alert").remove(), 2200);
    }

    static limpiarCampos(){
        document.querySelector("#titulo").value = "";
        document.querySelector("#autor").value = "";
        document.querySelector("#isbn").value = "";
    }

};



//Guardar en Local Storage

class Guardar {
    static getLibros() {
        let libros;
        if(localStorage.getItem("libros") === null) {
            libros = [];
        }else {
            libros = JSON.parse(localStorage.getItem("libros"));
        }

        return libros;
    };

    static addLibro(libro) {
        const libros = Guardar.getLibros();
        libros.push(libro);
        localStorage.setItem("libros", JSON.stringify(libros));
    };

    static eliminarLibro(isbn) {
        const libros = Guardar.getLibros();

        libros.forEach((libro, index) => {
            if (libro.isbn === isbn) {
                libros.splice(index, 1);
            }
        });

        localStorage.setItem("libros", JSON.stringify(libros));

    }    
};






//Event: Mostrar los libros
document.addEventListener("DOMContentLoaded", UI.mostrarLibros);





//Evento: Añadir un Libro
document.querySelector("#book-form").addEventListener("submit", (event) => {

    // Prevenir acccion por default submit
    event.preventDefault();

    //Obtener Valores
    const titulo = document.querySelector("#titulo").value;
    const autor = document.querySelector("#autor").value;
    const isbn = document.querySelector("#isbn").value;


    //Validación
    if(titulo === "" || autor === "" || isbn === "") {
        UI.alerta("Completa bien boludo", "danger");
    }   else {
        //Instanciar Libro
        const libro = new  Libro(titulo, autor, isbn);


        //Añadir Libro a UI
        UI.agregarLibroALista(libro);

        //Guardar Libro a localStorage
        Guardar.addLibro(libro);

        //Alerta Libro Agregado
        UI.alerta("Buena Kpo", "success");


        //Limpiar Campos
        UI.limpiarCampos();
    
    }

});

//Evento: Remover un Libro

document.querySelector("#lista-libros").addEventListener("click", (event) => {

    //console.log(event.target.innerHTML);

    // Eliminar Libro de UI
    UI.eliminarLibros(event.target);

    // Eliminar Libro del localStorage
    if (event.target.innerHTML == "Delete") {
        Guardar.eliminarLibro(event.target.parentElement.previousElementSibling.textContent);
        //Alerta Libro Eliminaste
        UI.alerta("Quien te conoce", "success");
    };

});