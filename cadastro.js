document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".register-form");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmar-senha");
    const telefoneInput = document.getElementById("telefone");

    function obterUsuarios() {
        return JSON.parse(localStorage.getItem("usuarios")) || [];
    }

    function salvarUsuarios(usuarios) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();
        const confirmarSenha = confirmarSenhaInput.value.trim();
        const telefone = telefoneInput.value.trim();

        if (!nome || !email || !senha || !confirmarSenha || !telefone) {
            alert("Preencha todos os campos!");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        const usuarios = obterUsuarios();
        usuarios.push({
            nome,
            email,
            senha,
            telefone, // Corrigido: antes estava "numero"
            data: new Date().toLocaleString("pt-BR")
        });

        salvarUsuarios(usuarios);
        alert("Usuário cadastrado com sucesso!");

        // Limpar campos do formulário
        form.reset();
    });
});
