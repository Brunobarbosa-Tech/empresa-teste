var msgCookies = document.getElementById('cookies-msg')
var overlay = document.getElementById('cookies-overlay')

let tempoOk = false
let scrollOk = false

function mostrar() {
    if (!localStorage.getItem("lgpd") && tempoOk && scrollOk) {
        msgCookies.classList.add('mostrar')
        overlay.classList.add('ativo')
    }
}

setTimeout(() => {
    tempoOk = true
    mostrar()
}, 2000)

window.addEventListener("scroll", () => {
    scrollOk = true
    mostrar()
})

function fechar() {
    msgCookies.classList.remove('mostrar')
    overlay.classList.remove('ativo')
}

/* ACEITAR COOKIES */
function aceito() {
    localStorage.setItem("lgpd", "aceito")

    // aqui você poderia ativar scripts reais (analytics, ads etc)
    ativarCookies(true)

    fechar()
}

/* REJEITAR COOKIES */
function rejeitar() {
    localStorage.setItem("lgpd", "rejeitado")

    // aqui você bloqueia tracking real
    ativarCookies(false)

    fechar()
}

/* SIMULA CONTROLE LGPD */
function ativarCookies(permitido) {
    if (permitido) {
        console.log("Cookies de análise ATIVADOS")
        // exemplo: ativar Google Analytics aqui
    } else {
        console.log("Cookies de análise BLOQUEADOS")
        // exemplo: desativar scripts
    }
}