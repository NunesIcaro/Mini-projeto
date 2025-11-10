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
const listaUsuarios = document.getElementById('listaUsuarios');

// Array para armazenar os usuários cadastrados
let usuarios = [];

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

function verifyDataNasc(dataNasc) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dataNasc)) {
        return false;
    }

    // Quebra a data em dia, mês e ano
    const [dia, mes, ano] = dataNasc.split('/').map(Number);
    const data = new Date(ano, mes - 1, dia);

    if (
        data.getDate() !== dia ||
        data.getMonth() !== mes - 1 ||
        data.getFullYear() !== ano
    ) {
        return false;
    }

    // Verifica se a data não é futura
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (data > hoje) {
        return false;
    }

    return true;
}

/* Função que adiciona usuário à lista */
function adicionarUsuarioLista(nomeUsuario, emailUsuario){
    // Cria uma div para colocar as informações do usuário
    const divUsuario = document.createElement('div');
    divUsuario.className = 'user-item';
    
    const nomeParagrafo = document.createElement('p');
    nomeParagrafo.className = 'user-name';
    nomeParagrafo.textContent = nomeUsuario;
    
    const emailParagrafo = document.createElement('p');
    emailParagrafo.className = 'user-email';
    emailParagrafo.textContent = emailUsuario;
    
    divUsuario.append(nomeParagrafo);
    divUsuario.append(emailParagrafo);
    listaUsuarios.append(divUsuario);
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

/* Evento de clique no botão que chama as funções de verificação para ver se está tudo correto */
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
    }else if (!verifyDataNasc(dataNasc.value)){
        msg.textContent = 'A data de nascimento não é válida ou é uma data futura';
    }else if (!verifyTermos()){
        msg.textContent = 'Leia e aceite os termos de condição';
    }else{
         // Se tudo estiver correto, adiciona o usuário na lista
        const novoUsuario = {
            nome: nome.value,
            email: email.value
        };
        
        usuarios.push(novoUsuario);
        
        // Adiciona o usuário na lista que aparece na tela
        adicionarUsuarioLista(nome.value, email.value);
        
        // Mostra mensagem de sucesso
        msg.style.color = 'green';
        msg.textContent = 'Usuário cadastrado com sucesso!';
        
        alert(`Olá ${nome.value}, agora você está concorrendo a um prêmio de R$ 100.000,00`);
    }

})