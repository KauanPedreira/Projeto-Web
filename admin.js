document.addEventListener("DOMContentLoaded", () => {
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const telefoneInput = document.getElementById("telefone");
    const senhaInput = document.getElementById("senha");
    const cadastrarBtn = document.getElementById("cadastrar");
    const limparCamposBtn = document.getElementById("limpar-campos");
    const listaUsuarios = document.getElementById("lista");
    const pesquisaInput = document.getElementById("pesquisa");
    const limparListaBtn = document.getElementById("limpar");

    function obterUsuarios() {
        return JSON.parse(localStorage.getItem("usuarios")) || [];
    }

    function salvarUsuarios(usuarios) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    function atualizarLista(usuarios = obterUsuarios()) {
        listaUsuarios.innerHTML = "";
        usuarios.forEach((usuario, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div>
                    <strong>${usuario.nome}</strong> - ${usuario.email} <br>
                    <small>Telefone: ${usuario.telefone} | Senha: ${usuario.senha}</small><br>
                    <small>Cadastrado em: ${usuario.data}</small>
                </div>
                <button onclick="removerUsuario(${index})">Excluir</button>
            `;
            listaUsuarios.appendChild(li);
        });
    }

    cadastrarBtn.addEventListener("click", () => {
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const senha = senhaInput.value.trim();

        if (!nome || !email || !telefone || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        const usuarios = obterUsuarios();
        usuarios.push({
            nome,
            email,
            telefone,
            senha,
            data: new Date().toLocaleString("pt-BR")
        });

        salvarUsuarios(usuarios);
        atualizarLista();

        // Limpa os campos do formulário
        nomeInput.value = "";
        emailInput.value = "";
        telefoneInput.value = "";
        senhaInput.value = "";
    });

    limparCamposBtn.addEventListener("click", () => {
        nomeInput.value = "";
        emailInput.value = "";
        telefoneInput.value = "";
        senhaInput.value = "";
    });

    window.removerUsuario = (index) => {
        const usuarios = obterUsuarios();
        usuarios.splice(index, 1);
        salvarUsuarios(usuarios);
        atualizarLista();
    };

    limparListaBtn.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir todos os usuários?")) {
            localStorage.removeItem("usuarios");
            atualizarLista();
        }
    });

    pesquisaInput.addEventListener("input", () => {
        const termo = pesquisaInput.value.toLowerCase();
        const usuariosFiltrados = obterUsuarios().filter(usuario =>
            usuario.nome.toLowerCase().includes(termo) || usuario.email.toLowerCase().includes(termo)
        );
        atualizarLista(usuariosFiltrados);
    });

    atualizarLista();
});
