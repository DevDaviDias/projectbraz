class ValidarFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.usuarioInput = this.formulario.querySelector('.usuario');
        this.senhaInput = this.formulario.querySelector('.senha');
        this.botaoSubmit = this.formulario.querySelector('button[type="submit"]');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();


        const usuario = this.usuarioInput.value.trim();
        const senha = this.senhaInput.value.trim();


        if (this.camposSaoValidos(usuario, senha)) {

            window.location.href = 'calendario.html';

            
        } else {
            
        }
    }

    camposSaoValidos(usuario, senha) {
        let valid = true;


        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }


        if (!usuario) {
            this.criaErro(this.usuarioInput, 'Usuário não pode estar vazio.');
            valid = false;
        }

        if (!senha) {
            this.criaErro(this.senhaInput, 'Senha não pode estar vazio.');
            valid = false;
        }


        if (valid) {
            valid = this.verificaCredenciais(usuario, senha);
            if (!valid) {
                this.criaErro(this.senhaInput, 'Usuário ou senha incorretos.');
            }
        }

        return valid;
    }

    verificaCredenciais(usuario, senha) {
        const usuarios = [
            { usuario: "usuario1", senha: "12345" },
            { usuario: "Usuario1", senha: "12345" },
            { usuario: "usuario2", senha: "54321" },
        ];


        return usuarios.some((u) => u.usuario === usuario && u.senha === senha);
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}


const login = new ValidarFormulario();
