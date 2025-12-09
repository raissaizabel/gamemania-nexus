document.addEventListener('DOMContentLoaded', () => {

    /* =================================================================
       1. CARREGAMENTO DE COMPONENTES (HEADER/FOOTER)
       Nota: Se você já colocou o <header> direto no HTML, esta função 
       simplesmente não fará nada (e não dará erro), o que é perfeito.
    ================================================================= */
    
    function loadComponent(containerId, filePath) {
        const container = document.getElementById(containerId);
        
        // Se o container não existir (ex: você já hardcoded o header), para aqui.
        if (!container) return;

        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Erro ao carregar ${filePath}: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                container.innerHTML = data;
            })
            .catch(error => {
                console.error('Erro no loadComponent:', error);
            });
    }

    // Tenta carregar, caso existam as divs placeholders
    loadComponent('header-container', 'cabecalho.html');
    loadComponent('footer-container', 'rodape.html');


    /* =================================================================
       2. LÓGICA DE BUSCA (GLOBAL)
    ================================================================= */
    document.body.addEventListener('keypress', (e) => {
        // e.target é o elemento onde o evento ocorreu
        if (e.target && e.target.matches('input[type="search"]') && e.key === 'Enter') {
            e.preventDefault();
            const valor = e.target.value.trim();
            
            if(valor) {
                alert(`Pesquisando por: "${valor}"...`);
                // window.location.href = `busca.html?q=${valor}`;
            }
        }
    });


    /* =================================================================
       3. FUNCIONALIDADES DE FORMULÁRIO (OLHO DA SENHA)
    ================================================================= */
    document.body.addEventListener('click', (e) => {
        // Procura pelo botão com a classe .toggle-password
        const toggleBtn = e.target.closest('.toggle-password');
        
        if (toggleBtn) {
            // Encontra o grupo do input (classe do Bootstrap .input-group)
            const inputGroup = toggleBtn.closest('.input-group');
            
            // Se achou o grupo, busca o input dentro dele
            if (inputGroup) {
                const input = inputGroup.querySelector('input'); 
                const icon = toggleBtn.querySelector('i') || toggleBtn; // Garante pegar o ícone

                if (input) {
                    if (input.type === 'password') {
                        input.type = 'text';
                        if(icon.classList.contains('fa-eye')) {
                            icon.classList.remove('fa-eye');
                            icon.classList.add('fa-eye-slash');
                        }
                    } else {
                        input.type = 'password';
                        if(icon.classList.contains('fa-eye-slash')) {
                            icon.classList.remove('fa-eye-slash');
                            icon.classList.add('fa-eye');
                        }
                    }
                }
            }
        }
    });


    /* =================================================================
       4. VALIDAÇÃO DO CADASTRO
    ================================================================= */
    const formCadastro = document.getElementById('registerForm'); // ID ajustado para o do seu HTML anterior
    
    if (formCadastro) {
        formCadastro.addEventListener('submit', (event) => {
            // Impede o envio padrão imediatamente
            event.preventDefault();
            event.stopPropagation();

            if (formCadastro.checkValidity()) {
                // SUCESSO
                alert('Cadastro realizado com sucesso! (Simulação)');
                formCadastro.reset();
                formCadastro.classList.remove('was-validated');
                
                // Reiniciar ícones de senha para "fechado" se estiverem abertos
                const icons = formCadastro.querySelectorAll('.fa-eye-slash');
                icons.forEach(icon => {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                });

            } else {
                // ERRO
                formCadastro.classList.add('was-validated');
                alert("Por favor, preencha os campos corretamente.");
            }
        }, false);
    }

});






document.addEventListener('DOMContentLoaded', () => {

    /* =================================================================
       CARREGAMENTO DE CABEÇALHO E RODAPÉ
       Esta função busca os arquivos 'cabecalho.html' e 'rodape.html'
       e os insere nos lugares marcados no HTML.
    ================================================================= */
    
    function loadComponent(containerId, filePath) {
        const container = document.getElementById(containerId);
        
        if (!container) return; // Segurança caso a div não exista

        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Erro ao carregar ${filePath}`);
                return response.text();
            })
            .then(data => {
                container.innerHTML = data;
                
                // IMPORTANTE: Se o seu menu hambúrguer usa script para abrir/fechar,
                // certifique-se que o Bootstrap JS está carregado (já está no HTML).
            })
            .catch(error => {
                console.error('Erro ao carregar componente:', error);
            });
    }

    // Carrega os arquivos externos
    // Certifique-se que 'cabecalho.html' e 'rodape.html' estão na mesma pasta
    loadComponent('header-container', 'cabecalho.html');
    loadComponent('footer-container', 'rodape.html');

});



// script.js

// Função simples para simular adição ao carrinho
function adicionarAoCarrinho(produto) {
    // Aqui você futuramente pode integrar com o backend ou localStorage
    alert(`O produto "${produto}" foi adicionado ao seu carrinho com sucesso!`);
    console.log(`Produto adicionado: ${produto}`);
}

// Inicialização de Tooltips do Bootstrap (caso queira usar no futuro)
document.addEventListener("DOMContentLoaded", function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});