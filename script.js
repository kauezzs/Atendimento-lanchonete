// Sistema de Atendimento de uma Lanchonete - versão JavaScript (roda 100% no navegador)

const SENHA_CORRETA = "1234";
let carrinho = []; // cada item: { nome, preco, quantidade }

// ----- Elementos das telas -----
const telaLogin = document.getElementById("tela-login");
const telaMenu = document.getElementById("tela-menu");
const telaRelatorio = document.getElementById("tela-relatorio");

const campoSenha = document.getElementById("senha");
const mensagemErro = document.getElementById("mensagem-erro");

const campoProduto = document.getElementById("produto");
const campoQuantidade = document.getElementById("quantidade");
const listaItens = document.getElementById("lista-itens");
const subtotalAtualEl = document.getElementById("subtotal-atual");

// ===================================================
// 1) SENHA
// (o "repita até acertar" é o próprio usuário clicando de novo,
// já que na web não existe um laço bloqueando a tela)
// ===================================================
document.getElementById("btn-entrar").addEventListener("click", verificarSenha);
campoSenha.addEventListener("keyup", (evento) => {
    if (evento.key === "Enter") verificarSenha();
});

function verificarSenha() {
    const senhaDigitada = campoSenha.value;

    if (senhaDigitada === SENHA_CORRETA) {
        mensagemErro.hidden = true;
        carrinho = [];
        atualizarListaItens();
        telaLogin.hidden = true;
        telaMenu.hidden = false;
    } else {
        mensagemErro.hidden = false; // "Senha incorreta!"
        campoSenha.value = "";
        campoSenha.focus();
    }
}

// ===================================================
// 2) MENU - switch
// Identifica a opção escolhida e determina o preço
// ===================================================
document.getElementById("btn-adicionar").addEventListener("click", adicionarProduto);

function adicionarProduto() {
    const opcao = parseInt(campoProduto.value, 10);
    const quantidade = Math.max(parseInt(campoQuantidade.value, 10) || 1, 1);

    let nome;
    let preco;

    switch (opcao) {
        case 1:
            nome = "Hambúrguer";
            preco = 15.00;
            break;
        case 2:
            nome = "Pizza";
            preco = 20.00;
            break;
        case 3:
            nome = "Refrigerante";
            preco = 6.00;
            break;
        case 4:
            nome = "Batata Frita";
            preco = 10.00;
            break;
        default:
            // ===================================================
            // 3) VALIDAÇÃO
            // Opção inválida: avisa e não adiciona nada ao pedido
            // ===================================================
            alert("Opção inválida!");
            return;
    }

    carrinho.push({ nome, preco, quantidade });
    atualizarListaItens();
}

// ===================================================
// FOR percorrendo o carrinho para montar a lista e o subtotal
// ===================================================
function atualizarListaItens() {
    listaItens.innerHTML = "";
    let subtotal = 0;

    for (let i = 0; i < carrinho.length; i++) {
        const item = carrinho[i];
        const totalItem = item.preco * item.quantidade;
        subtotal += totalItem;

        const li = document.createElement("li");
        li.textContent = `${item.quantidade}x ${item.nome} - R$ ${totalItem.toFixed(2)}`;
        listaItens.appendChild(li);
    }

    subtotalAtualEl.textContent = subtotal.toFixed(2);
}

// ===================================================
// 4 e 5) FINALIZAR PEDIDO
// (equivale ao "break" que encerra o laço de pedidos na versão console)
// ===================================================
document.getElementById("btn-finalizar").addEventListener("click", finalizarPedido);

function finalizarPedido() {
    let subtotal = 0;
    let totalItens = 0;

    for (const item of carrinho) {
        subtotal += item.preco * item.quantidade;
        totalItens += item.quantidade;
    }

    // ===================================================
    // 6) QUANTIDADE - for
    // Mostra sequência de 1 até a quantidade total de produtos
    // ===================================================
    const listaRegistrados = document.getElementById("lista-registrados");
    listaRegistrados.innerHTML = "";
    for (let i = 1; i <= totalItens; i++) {
        const li = document.createElement("li");
        li.textContent = `Produto ${i} registrado`;
        listaRegistrados.appendChild(li);
    }

    // ===================================================
    // 7) DESCONTO - operador ternário (obrigatório)
    // 10% de desconto se subtotal >= R$ 50,00
    // ===================================================
    const desconto = (subtotal >= 50.00) ? subtotal * 0.10 : 0.0;
    const total = subtotal - desconto;

    document.getElementById("total-itens").textContent = totalItens;
    document.getElementById("relatorio-subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("relatorio-desconto").textContent = desconto.toFixed(2);
    document.getElementById("relatorio-total").textContent = total.toFixed(2);

    telaMenu.hidden = true;
    telaRelatorio.hidden = false;
}

// ----- Novo pedido: volta para a tela de login -----
document.getElementById("btn-novo-pedido").addEventListener("click", () => {
    carrinho = [];
    campoSenha.value = "";
    telaRelatorio.hidden = true;
    telaLogin.hidden = false;
});
