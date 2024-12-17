const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const alterarIconePausarBt = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector("#timer");
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const playSomTemporizador = new Audio('/sons/play.wav');
const pauseSomTemporizador = new Audio('/sons/pause.mp3');
const fimSomTemporizador = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

const duracaoFoco = 1500;
const duracaoCurto = 300;
const duracaoLongo = 900;

/*focoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
    banner.setAttribute('src', '/imagens/foco.png')
})

curtoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
    banner.setAttribute('src', '/imagens/descanso-curto.png')
})

longoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
    banner.setAttribute('src', '/imagens/descanso-longo.png')
})*/

//**** FOI CRIADO UMA FUNÇÃO PARA DIMINUIR O CÓDIGO ****//

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

focoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch(contexto){
        case 'foco':
            titulo.innerHTML = `<h1 class="app__title">
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>`;
            break;
        
        case 'descanso-curto':
            titulo.innerHTML = `<h1 class="app__title">
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            </h1>`;

            break;

        case 'descanso-longo':
            titulo.innerHTML = `<h1 class="app__title">
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            </h1>`;

            break;

        default:

            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        fimSomTemporizador.play();
        alert('Tempo finalizado!');
        zerar();
        
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        pauseSomTemporizador.play();
        zerar();
        return;
    }
    playSomTemporizador.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    alterarIconePausarBt.setAttribute('src', `/imagens/pause.png`);
    

}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    alterarIconePausarBt.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
    
}
mostrarTempo();