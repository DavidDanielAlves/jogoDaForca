let palavras = [

    animais = ['gato', 'cachorro', 'galinha', 'elefante', 'cavalos', 'cobra', 'papagaio'],

    objetos = ['cadeira', 'mesa', 'porta', 'janela', 'televisão', 'relógio', 'celular'],

    comida = ['banana', 'maçã', 'alface', 'tomate', 'macarrão', 'feijão', 'arroz']
]

let numeroIndiceTipo = parseInt(Math.random() * 3);
let tamanhoDaLista = palavras[numeroIndiceTipo].length;
let numeroIndicePalavra = parseInt(Math.random() * tamanhoDaLista);
let palavra = gerarPalavra();
let numeroDeLetras = palavra.length;
let quantidadeDeLetrasNoHtml = document.getElementById('quantidade-letras');
let tipoDaPalavra = numeroIndiceTipo == 0 ? 'animal' : numeroIndiceTipo == 1 ? 'objeto' : 'comida';
let tipo = document.getElementById('tipo');
let palavraNoHtml = document.getElementById('palavra-no-html');
let palavraEscondida = esconderPalavra(palavra);
let formulario = document.querySelector('.form');
let mgsDeInstrucao = document.getElementById('msg-Instrucoes');
let tentativasNohtml = document.getElementById('tentativas');
let imgForca = document.querySelector('.container-forca img');
let numeroDeTentativas = 6;
let letrasChutada = [];

function adicionarAoHtml (elemento, valor) {
    elemento.innerHTML = valor
}

function esconderPalavra(palavra) {
    let caracteres = palavra.split('');
    let palavraEscondida = caracteres.map(caracteres => '_').join(' ');
    return palavraEscondida
}

function gerarPalavra() {
    return palavras[numeroIndiceTipo][numeroIndicePalavra];
}

function revelarCaracteres(palavra, valorDoInput) {
    let palavraReveladaArray = palavraEscondida.split(' ');

    for (let i = 0; i < palavra.length; i++) {
        if (palavra[i] === valorDoInput) {
            palavraReveladaArray[i] = valorDoInput;
        }
    }

    palavraEscondida = palavraReveladaArray.join(' ');

    palavraNoHtml.innerHTML = palavraEscondida;
}

function jogadorAcertou() {
    mgsDeInstrucao.innerHTML = `A letra (${valorDoInput}) existe na palavra`;
    mgsDeInstrucao.style.color = 'green';
    revelarCaracteres(palavra, valorDoInput);

}

function jogadorErrou() {
    mgsDeInstrucao.innerHTML = `A letra (${valorDoInput}) não existe na palavra`;
    mgsDeInstrucao.style.color = 'orange';

    numeroDeTentativas = numeroDeTentativas - 1;
    tentativasNohtml.innerHTML = numeroDeTentativas;
}

function jogadorGanhou() {
    mgsDeInstrucao.innerHTML = 'Você Ganhou :)';
    document.getElementById('input-letra').style.display = 'none';
    document.getElementById('botao-enviar').setAttribute('value', 'Jogar Novamente')

    document.getElementById('botao-enviar').addEventListener('click', () => {
        window.location.reload();
    })

    document.getElementById('palavra-no-html').classList.add('active');
}

function jogadorPerdeu() {
    mgsDeInstrucao.innerHTML = `Você Perdeu :( a palavra era (${palavra})`;
    mgsDeInstrucao.style.color = 'red'
    document.getElementById('input-letra').style.display = 'none';
    imgForca.setAttribute('src', './img/boneco-enforcado.jpg');
    document.getElementById('botao-enviar').setAttribute('value', 'Jogar Novamente')

    document.getElementById('botao-enviar').addEventListener('click', () => {
        window.location.reload();
    })
}

function limparCampo() {
    let limparBotao = document.getElementById('input-letra');
    limparBotao.value = '';
}

adicionarAoHtml(tentativasNohtml, numeroDeTentativas);
adicionarAoHtml(quantidadeDeLetrasNoHtml, numeroDeLetras);
adicionarAoHtml(tipo, tipoDaPalavra);
adicionarAoHtml(palavraNoHtml, palavraEscondida);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    valorDoInput = document.getElementById('input-letra').value;

    if (valorDoInput != '' && isNaN && !letrasChutada.includes(valorDoInput)) {
        letrasChutada.push(valorDoInput);

        if (palavra.includes(valorDoInput)) {
            jogadorAcertou();

            var strDefault = palavraEscondida;
            var str = strDefault.replace(/\s/g, '');

            if (palavra === str) {
                jogadorGanhou();
            }

        } else {
            jogadorErrou();

            if (numeroDeTentativas == 0) {
                jogadorPerdeu();
            }
        }
    } else if (letrasChutada.includes(valorDoInput)) {
        mgsDeInstrucao.innerHTML = `Você já escolheu a letra (${valorDoInput}), tente outra.`;
        mgsDeInstrucao.style.color = 'orange';
    }

    limparCampo();

});