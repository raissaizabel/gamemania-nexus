/* =================================================================
   SCRIPT.JS - Lógica Principal do Site
   Organizado por: Inicialização -> Componentes -> Funcionalidades
================================================================= */

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Carrega os Componentes (Header e Footer)
    loadComponents();

    // 2. Inicia funcionalidades globais que não dependem do Header
    initGlobalFeatures();

});

/* =================================================================
   FUNÇÕES DE CARREGAMENTO (HEADER/FOOTER)
================================================================= */

function loadComponents() {
    // --- Carregar Cabeçalho ---
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        fetch('cabecalho.html')
            .then(response => {
                if (!response.ok) throw new Error("Erro ao carregar cabeçalho");
                return response.text();
            })
            .then(data => {
                headerContainer.innerHTML = data;
                
                // IMPORTANTE: Só iniciamos o menu mobile DEPOIS que o HTML do cabeçalho existir
                initMobileMenu(); 
            })
            .catch(error => console.error('Erro Header:', error));
    }

    // --- Carregar Rodapé ---
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('rodape.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error('Erro Footer:', error));
    }
}

/* =================================================================
   FUNCIONALIDADES DO SITE
================================================================= */

function initGlobalFeatures() {
    
    // --- A. Lógica da Busca (Event Delegation) ---
    // Usamos delegation no body para funcionar mesmo com Header carregado via Fetch
    document.body.addEventListener('keypress', (e) => {
        if (e.target && e.target.matches('.search-container input') && e.key === 'Enter') {
            e.preventDefault();
            const valor = e.target.value.trim();
            if(valor) {
                alert(`Pesquisando por: "${valor}"...`);
                // window.location.href = `busca.html?q=${valor}`;
            }
        }
    });

    // --- B. Animação Botão Comprar (Simulação de Carrinho) ---
    // Aplica a todos os botões de compra existentes na página
    const botoesComprar = document.querySelectorAll('.btn-buy, .btn-dark-blue');
    
    botoesComprar.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efeito visual no botão
            let textoOriginal = this.innerText;
            this.innerText = "ADICIONADO!";
            this.style.backgroundColor = "#28a745"; // Verde sucesso
            this.style.color = "#fff";
            
            // Atualiza o contador do carrinho (se existir no header)
            const badgeCarrinho = document.querySelector('.action-icons .badge');
            if(badgeCarrinho) {
                let qtd = parseInt(badgeCarrinho.innerText) || 0;
                badgeCarrinho.innerText = qtd + 1;
                
                // Pequena animação no badge
                badgeCarrinho.style.transform = "scale(1.5)";
                setTimeout(() => badgeCarrinho.style.transform = "scale(1)", 200);
            }

            // Restaura o botão após 1.5s
            setTimeout(() => {
                this.innerText = textoOriginal;
                this.style.backgroundColor = ""; // Volta ao original do CSS
                this.style.color = "";
            }, 1500);
        });
    });
}

function initMobileMenu() {
    // --- C. Fechar Menu Mobile ao Clicar ---
    // Esta função é chamada apenas após o cabeçalho carregar
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('menuMobile'); // ID do collapse no seu HTML
    
    if (menuToggle && typeof bootstrap !== 'undefined') {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
        
        navLinks.forEach((l) => {
            l.addEventListener('click', () => {
                if(menuToggle.classList.contains('show')){
                    bsCollapse.hide();
                }
            });
        });
    }
}

/* =================================================================
   FUNÇÃO UTILITÁRIA: RENDERIZAR GRID (SE PRECISAR DE PRODUTOS DINÂMICOS)
   Você pode chamar esta função se tiver uma lista de produtos JSON
================================================================= */
function renderGrid(products, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    container.innerHTML = '';

    if (!products || products.length === 0) {
        container.innerHTML = "<p class='text-center w-100'>Nenhum produto encontrado.</p>";
        return;
    }

    products.forEach(p => {
        // Tratamento de imagem
        let imgPath = p.image || 'img/placeholder.jpg';
        if (!imgPath.includes('http') && !imgPath.includes('img/')) {
            imgPath = `img/${p.image}`; // Ajuste o caminho conforme sua pasta
        }

        // Lógica de Preço (De/Por)
        let priceHtml = `<span class="price-val" style="font-size:1.1rem; font-weight:800; color:#000;">R$ ${p.price.toFixed(2)}</span>`;
        if (p.oldPrice > p.price) {
            priceHtml = `
                <small style="text-decoration:line-through; color:#999; font-size:0.8rem;">R$ ${p.oldPrice.toFixed(2)}</small>
                <br>
                <span class="price-val" style="color:#e74c3c; font-size:1.2rem; font-weight:800;">R$ ${p.price.toFixed(2)}</span>
            `;
        }

        const html = `
        <div class="col">
            <div class="card h-100 product-card border-0 shadow-sm">
                ${p.isHot ? '<span class="badge badge-custom bg-dark">MAIS BUSCADO!</span>' : ''}
                
                <div class="card-img-wrapper d-flex align-items-center justify-content-center" style="height: 180px;">
                    <img src="${imgPath}" class="card-img-top p-3" style="max-height: 100%; width: auto;" alt="${p.name}">
                </div>

                <div class="card-body d-flex flex-column text-center">
                    <div class="text-warning mb-2 small">
                        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                    </div>

                    <h6 class="card-title text-muted small mb-2 text-truncate">${p.name}</h6>

                    <div class="mt-auto">
                        ${priceHtml}
                        <p class="price-installments text-muted small mb-3">OU 10x de <strong>R$ ${(p.price/10).toFixed(2)}</strong></p>
                        <a href="#" class="btn btn-dark btn-buy w-100 rounded-pill">COMPRAR</a>
                    </div>
                </div>
            </div>
        </div>`;
        
        container.innerHTML += html;
    });
}