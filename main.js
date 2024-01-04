let palavras = [

    animais = ['gato', 'cachorro', 'galinha', 'elefante', 'cavalos', 'cobra', 'papagaio'],

    objetos = ['cadeira', 'mesa', 'porta', 'janela', 'televisao', 'relogio', 'celular'],

    comida = ['banana', 'maçã', 'alface', 'tomate', 'macarrão', 'feijao', 'arroz']
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
let numeroDeTentativas = 8
let letrasChutada = [];

tentativasNohtml.innerHTML = numeroDeTentativas;

quantidadeDeLetrasNoHtml.innerHTML = numeroDeLetras;

tipo.innerHTML = tipoDaPalavra;

palavraNoHtml.innerHTML = palavraEscondida;

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

    console.log('palavraEscondida:', palavraEscondida); // Adicione este log
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    valorDoInput = document.getElementById('input-letra').value;

    if (valorDoInput != '' && isNaN && !letrasChutada.includes(valorDoInput)) {
        letrasChutada.push(valorDoInput);

        if (palavra.includes(valorDoInput)) {
            mgsDeInstrucao.innerHTML = `A letra (${valorDoInput}) existe na palavra`;
            mgsDeInstrucao.style.color = 'green';
            revelarCaracteres(palavra, valorDoInput);

            var strDefault = palavraEscondida;
            var str = strDefault.replace(/\s/g, '');

            console.log(str)

            // Verificar se o jogador ganhou
            if (palavra === str) {
                mgsDeInstrucao.innerHTML = 'Você Ganhou :)';
                document.getElementById('input-letra').style.display = 'none';
                document.getElementById('botao-enviar').setAttribute('value', 'Jogar Novamente')
            
                document.getElementById('botao-enviar').addEventListener('click', () => {
                    window.location.reload();
                })
            }

        } else {
            mgsDeInstrucao.innerHTML = `A letra (${valorDoInput}) não existe na palavra`;
            mgsDeInstrucao.style.color = 'orange';

            numeroDeTentativas = numeroDeTentativas - 1;
            tentativasNohtml.innerHTML = numeroDeTentativas;

            if (numeroDeTentativas == 0) {
                mgsDeInstrucao.innerHTML = 'Você Perdeu :(';
                mgsDeInstrucao.style.color = 'red'
                document.getElementById('input-letra').style.display = 'none';
                imgForca.setAttribute('src', './img/boneco-enforcado.jpg');
                document.getElementById('botao-enviar').setAttribute('value', 'Jogar Novamente')

                document.getElementById('botao-enviar').addEventListener('click', () => {
                    window.location.reload();
                })
            }
        }
    } else if (letrasChutada.includes(valorDoInput)) {
        mgsDeInstrucao.innerHTML = `Você já escolheu a letra ${valorDoInput}, tente outra.`;
    }

    let limparBotao = document.getElementById('input-letra');
    limparBotao.value = '';

});



