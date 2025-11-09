/* Constantes que pegam cada input pelo ID */
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confSenha = document.getElementById('confSenha');
const dataNasc = document.getElementById('dataNasc');
const tel = document.getElementById('tel');
const btnCadastrar = document.getElementById('btnCadastrar');
const msg = document.getElementById('msg');
const termos = document.getElementById('termos');


/* Função que espera o html ter todo seu conteúdo carregado e coloca a mask nos inputs */
document.addEventListener('DOMContentLoaded', function (){
    IMask(document.getElementById('tel'),{
        mask: '(00) 00000-0000'
    });

    IMask(document.getElementById('dataNasc'),{
        mask: '00/00/0000'
    })
});

/* Grupo de Funções de verificação */
function verifyName(name){
    return name.length >= 3; 
}

function verifyEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

function verifySenha(senha){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    return regex.test(senha)
    
}

function verifyConfSenha(senha,confSenha){
    return senha === confSenha;
}

function verifyTermos(){
    return termos.checked;
}

/* Função que limpa os inputs após o clique do botão */
function ClearInputs(){
    nome.value = '';
    email.value = '';
    senha.value = '';
    confSenha.value = '';
    dataNasc.value = '';
    tel.value = '';
    msg.value = '';
    termos.checked = false;
}

/* Evento de clique no botão que chama as funções de verificação para ver se esta tudo correto */
document.getElementById('btnCadastrar').addEventListener('click',function(){
    msg.style.color = 'red';
    if (!verifyName(nome.value)){
        msg.textContent = 'O Nome deve conter 3 ou mais caracteres';
    }else if (!verifyEmail(email.value)){
        msg.textContent = 'O E-mail não é válido';
    }else if (!verifySenha(senha.value)){
        msg.textContent = 'A Senha deve ter pelo menos uma letra maiúscula, uma minúscula, um número e no mínimo 8 caracteres';
    }else if (!verifyConfSenha(senha.value,confSenha.value)){
        msg.textContent = 'Os campos Senha e Confirme sua Senha devem ser iguais';
    }else if (!verifyTermos()){
        msg.textContent = 'Leia e aceite os termos de condição';
    }else{
        alert(`Olá ${nome.value}, Seja bem-vindo a ...`); /*Tem que ter o nome do projeto pra colocar aqui*/  
    }
    ClearInputs();
})