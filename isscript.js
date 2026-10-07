document.addEventListener('DOMContentLoaded', () => {

    // 1. DATA ATUAL NO RODAPÉ
    const dateSpan = document.getElementById('current-date');
    if (dateSpan) {
        const hoje = new Date();
        dateSpan.textContent = hoje.toLocaleDateString('pt-BR');
    }

    // 2. CONTROLE DOS SUBMENUS
    const btnSobre = document.getElementById('btn-sobre');
    const submenuSobre = document.getElementById('submenu-sobre');
    const btnContato = document.getElementById('btn-contato');
    const submenuContato = document.getElementById('submenu-contato');

    // Abre e fecha o submenu Sobre
    if (btnSobre && submenuSobre) {
        btnSobre.addEventListener('click', (e) => {
            e.preventDefault(); // Trava a navegação apenas no botão 'Sobre ▾'
            submenuSobre.classList.toggle('show');
            if (submenuContato) submenuContato.classList.remove('show');
        });
    }

    // Abre e fecha o submenu Contato
    if (btnContato && submenuContato) {
        btnContato.addEventListener('click', (e) => {
            e.preventDefault(); // Trava a navegação apenas no botão 'Contato ▾'
            submenuContato.classList.toggle('show');
            if (submenuSobre) submenuSobre.classList.remove('show');
        });
    }

    // 3. CORREÇÃO DOS LINKS INTERNOS (Clientes, Telefones, Email)
    document.querySelectorAll('.submenu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Se for um link de navegação interna (#)
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                // Se a seção correspondente não existir na página, exibe um alerta explicativo
                if (!targetElement) {
                    e.preventDefault();
                    alert(`Navegação para a seção "#${targetId}":\n\nEsta página ainda não possui a seção de conteúdo para #${targetId}.`);
                }
            }

            // Esconde o submenu ao clicar no item
            if (submenuSobre) submenuSobre.classList.remove('show');
            if (submenuContato) submenuContato.classList.remove('show');
        });
    });

    // Fecha os submenus se o usuário clicar fora do menu
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-submenu')) {
            if (submenuSobre) submenuSobre.classList.remove('show');
            if (submenuContato) submenuContato.classList.remove('show');
        }
    });

});