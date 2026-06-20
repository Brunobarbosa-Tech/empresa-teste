const chatbotButton = document.getElementById("chatbotButton");
const chatbotBox = document.getElementById("chatbotBox");
const closeChat = document.getElementById("closeChat");

const chatMessages = document.getElementById("chatMessages");
const chatOptions = document.getElementById("chatOptions");

const restartChat = document.getElementById("restartChat");

// estado do fluxo
let respostas = {
    servico: "",
    objetivo: "",
    segmento: ""
};

let etapaAtual = "inicio";

// ⌨️ DIGITANDO (NOVO)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showTyping() {
    const typing = document.createElement("div");
    typing.classList.add("typing");
    typing.id = "typing";

    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

// BOTÃO ABRIR CHAT
chatbotButton.addEventListener("click", () => {
    chatbotBox.classList.toggle("active");

    if (chatbotBox.classList.contains("active")) {
        iniciarChat();
    }
});

// fechar chat
closeChat.addEventListener("click", () => {
    chatbotBox.classList.remove("active");
});

// MENSAGEM (MODIFICADA COM TYPING)
async function addMessage(texto, tipo = "bot", typingEffect = true) {

    if (tipo === "bot" && typingEffect) {
        showTyping();
        await delay(800);
        removeTyping();
    }

    const msg = document.createElement("div");
    msg.classList.add(tipo);
    msg.innerHTML = texto;

    chatMessages.appendChild(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// OPÇÕES
function renderOptions(opcoes) {

    chatOptions.innerHTML = "";

    opcoes.forEach(opcao => {

        const btn = document.createElement("button");

        btn.innerHTML = `
            <i class="${opcao.icon}"></i>
            ${opcao.label}
        `;

        btn.addEventListener("click", opcao.action);

        chatOptions.appendChild(btn);
    });
}

// INICIAR CHAT
function iniciarChat() {

    chatMessages.innerHTML = "";
    chatOptions.innerHTML = "";

    respostas = {
        servico: "",
        objetivo: "",
        segmento: ""
    };

    etapaAtual = "inicio";

    addMessage(`
        Olá 👋 <br><br>
        Sou o assistente da MockyCode.<br><br>
        Qual serviço você procura?
    `);

    renderOptions([
        {
            label: "Site",
            icon: "bi bi-laptop",
            action: selecionarSite
        },
        {
            label: "Landing Page",
            icon: "bi bi-phone",
            action: selecionarLanding
        },
        {
            label: "Sistema",
            icon: "bi bi-gear",
            action: selecionarSistema
        },
        {
            label: "UX/UI",
            icon: "bi bi-palette",
            action: selecionarDesign
        }
    ]);
}

// SITE
function selecionarSite() {

    respostas.servico = "Site";

    addMessage("💻 Site", "user");

    addMessage("Qual o objetivo do seu site?");

    renderOptions([
        {
            label: "Institucional",
            icon: "bi bi-building",
            action: () => selecionarObjetivo("Institucional")
        },
        {
            label: "Vendas",
            icon: "bi bi-cart",
            action: () => selecionarObjetivo("Vendas")
        },
        {
            label: "Portfólio",
            icon: "bi bi-briefcase",
            action: () => selecionarObjetivo("Portfólio")
        },
        {
            label: "Outro",
            icon: "bi bi-three-dots",
            action: () => selecionarObjetivo("Outro")
        }
    ]);
}

// LANDING
function selecionarLanding() {

    respostas.servico = "Landing Page";

    addMessage("📱 Landing Page", "user");

    addMessage("Qual o objetivo da sua landing page?");

    renderOptions([
        {
            label: "Vendas",
            icon: "bi bi-cart",
            action: () => selecionarObjetivo("Vendas")
        },
        {
            label: "Captação de Leads",
            icon: "bi bi-people",
            action: () => selecionarObjetivo("Leads")
        },
        {
            label: "Apresentação",
            icon: "bi bi-easel",
            action: () => selecionarObjetivo("Apresentação")
        }
    ]);
}


// ===============================
// SISTEMA
// ===============================
function selecionarSistema() {

    respostas.servico = "Sistema";

    addMessage("⚙ Sistema", "user");

    addMessage("Que tipo de sistema você precisa?");

    renderOptions([
        {
            label: "Gestão",
            icon: "bi bi-kanban",
            action: () => selecionarObjetivo("Gestão")
        },
        {
            label: "Automação",
            icon: "bi bi-lightning",
            action: () => selecionarObjetivo("Automação")
        },
        {
            label: "Outro",
            icon: "bi bi-three-dots",
            action: () => selecionarObjetivo("Outro")
        }
    ]);
}


// ===============================
// UX/UI
// ===============================
function selecionarDesign() {

    respostas.servico = "UX/UI";

    addMessage("🎨 UX/UI", "user");

    addMessage("O que você precisa no design?");

    renderOptions([
        {
            label: "Interface",
            icon: "bi bi-brush",
            action: () => selecionarObjetivo("Interface")
        },
        {
            label: "Identidade Visual",
            icon: "bi bi-palette",
            action: () => selecionarObjetivo("Identidade")
        }
    ]);
}


// ===============================
// OBJETIVO
// ===============================
function selecionarObjetivo(objetivo) {

    respostas.objetivo = objetivo;

    addMessage(objetivo, "user");

    addMessage("Qual segmento da empresa?");

    renderOptions([
        {
            label: "Saúde",
            icon: "bi bi-heart-pulse",
            action: () => finalizarFluxo("Saúde")
        },
        {
            label: "Advocacia",
            icon: "bi bi-bank",
            action: () => finalizarFluxo("Advocacia")
        },
        {
            label: "Construção",
            icon: "bi bi-hammer",
            action: () => finalizarFluxo("Construção")
        },
        {
            label: "Outro",
            icon: "bi bi-three-dots",
            action: () => finalizarFluxo("Outro")
        }
    ]);
}


// ===============================
// FINAL
// ===============================
function finalizarFluxo(segmento) {

    respostas.segmento = segmento;

    addMessage(segmento, "user");

    addMessage(`
        ✅ Perfeito!<br><br>
        Já tenho as informações do seu projeto.<br><br>
        Clique abaixo para falar com um especialista.
    `);

    renderOptions([
        {
            label: "Falar no WhatsApp",
            icon: "bi bi-whatsapp",
            action: abrirWhatsApp
        }
    ]);
}


// ===============================
// WHATSAPP
// ===============================
function abrirWhatsApp() {

    const mensagem = `
Olá!

Vim pelo site da MockyCode.

Serviço: ${respostas.servico}
Objetivo: ${respostas.objetivo}
Segmento: ${respostas.segmento}
`;

    const url = `https://wa.me/5511987100570?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}


// ===============================
// RESTART
// ===============================
restartChat.addEventListener("click", iniciarChat);