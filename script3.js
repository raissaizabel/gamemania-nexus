// Aguarda o carregamento completo do DOM (elementos da página)
document.addEventListener("DOMContentLoaded", () => {

    // Seleciona o formulário de newsletter
    const newsletterForm = document.getElementById('newsletterForm');

    // Adiciona um evento de "submit" (envio) ao formulário
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (event) {
            // Previne que a página recarregue
            event.preventDefault();

            // Captura os valores dos campos
            const nomeInput = newsletterForm.querySelector('input[type="text"]');
            const emailInput = newsletterForm.querySelector('input[type="email"]');

            const nome = nomeInput.value;
            const email = emailInput.value;

            // Simples validação e feedback visual
            if (nome && email) {
                alert(`Obrigado, ${nome}! Seu e-mail (${email}) foi cadastrado com sucesso.`);

                // Limpa os campos
                nomeInput.value = '';
                emailInput.value = '';
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        });
    }

    // Exemplo de console log para debug
    console.log("Script da Game Mania carregado com sucesso.");
});








document.addEventListener('DOMContentLoaded', () => {


    /* Carrega Cabeçalho e Rodapé */
    function loadComponent(containerId, filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Erro ao carregar ${filePath}`);
                return response.text();
            })
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
            })
            .catch(error => console.error('Erro:', error));
    }


    loadComponent('header-container', 'cabecalho.html');
    loadComponent('footer-container', 'rodape.html');


    /* Lógica de Busca (Opcional) */
    document.body.addEventListener('keypress', (e) => {
        if (e.target.type === 'search' && e.key === 'Enter') {
            e.preventDefault();
            const valor = e.target.value.trim();
            if (valor) {
                alert(`Indo para página de busca: "${valor}"...`);
            }
        }
    });
});













































