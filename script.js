document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. DATA ATUAL DINÂMICA NO FOOTER
    // ==========================================
    const anoElemento = document.getElementById('ano-atual');
    if (anoElemento) {
        anoElemento.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 2. SUBMENUS (ABRIR / FECHAR)
    // ==========================================
    const btnSobre = document.getElementById('btn-sobre');
    const menuVerticalSobre = document.getElementById('menu-vertical-sobre');

    const btnContato = document.getElementById('btn-contato');
    const menuVerticalContato = document.getElementById('menu-vertical-contato');

    const btnEmpresa = document.getElementById('Empresa');
    const submenuEmpresa = document.getElementById('subtesteEmpresa');
    const btnClientes = document.getElementById('Clientes');
    const submenuClientes = document.getElementById('subtesteClientes');
    const btnTelefones = document.getElementById('Telefones');
    const submenuTelefones = document.getElementById('subtesteTelefones');
    const btnEmail = document.getElementById('Email');
    const submenuEmail = document.getElementById('subtesteEmail');

    function abreMenu(event, menu) {
        event.preventDefault();
        menu.classList.toggle('active');
    }

    function fechaMenu(event, menu, btn) {
        if (menu && btn && !menu.contains(event.target) && event.target !== btn) {
            menu.classList.remove('active');
        }
    }

    if (btnSobre && menuVerticalSobre) {
        btnSobre.addEventListener('click', function(event) {
            abreMenu(event, menuVerticalSobre);
        });
    }

    if (btnContato && menuVerticalContato) {
        btnContato.addEventListener('click', function(event) {
            abreMenu(event, menuVerticalContato);
        });
    }

    if (btnEmpresa && submenuEmpresa) {
        btnEmpresa.addEventListener('click', function(event) {
            event.preventDefault();
            submenuEmpresa.hidden = false;
            if (submenuClientes) submenuClientes.hidden = true;
            if (submenuTelefones) submenuTelefones.hidden = true;
            if (submenuEmail) submenuEmail.hidden = true;
        });
    }

    if (btnClientes && submenuClientes) {
        btnClientes.addEventListener('click', function(event) {
            event.preventDefault();
            submenuClientes.hidden = false;
            if (submenuEmpresa) submenuEmpresa.hidden = true;
            if (submenuTelefones) submenuTelefones.hidden = true;
            if (submenuEmail) submenuEmail.hidden = true;
        });
    }

    if (btnTelefones && submenuTelefones) {
        btnTelefones.addEventListener('click', function(event) {
            event.preventDefault();
            submenuTelefones.hidden = false;
            if (submenuEmpresa) submenuEmpresa.hidden = true;
            if (submenuClientes) submenuClientes.hidden = true;
            if (submenuEmail) submenuEmail.hidden = true;
        });
    }

    if (btnEmail && submenuEmail) {
        btnEmail.addEventListener('click', function(event) {
            event.preventDefault();
            submenuEmail.hidden = false;
            if (submenuEmpresa) submenuEmpresa.hidden = true;
            if (submenuClientes) submenuClientes.hidden = true;
            if (submenuTelefones) submenuTelefones.hidden = true;
        });
    }

    [menuVerticalSobre, menuVerticalContato].forEach(function(menu) {
        if (menu) {
            menu.querySelectorAll('.submenu-link').forEach(function(link) {
                link.addEventListener('click', function() {
                    menu.classList.remove('active');
                });
            });
        }
    });

    document.addEventListener('click', function(event) {
        fechaMenu(event, menuVerticalSobre, btnSobre);
        fechaMenu(event, menuVerticalContato, btnContato);
        if (submenuEmpresa && btnEmpresa
            && !submenuEmpresa.contains(event.target)
            && !btnEmpresa.contains(event.target)) {
            submenuEmpresa.hidden = true;
        }
        if (submenuClientes && btnClientes
            && !submenuClientes.contains(event.target)
            && !btnClientes.contains(event.target)) {
            submenuClientes.hidden = true;
        }
        if (submenuTelefones && btnTelefones
            && !submenuTelefones.contains(event.target)
            && !btnTelefones.contains(event.target)) {
            submenuTelefones.hidden = true;
        }
        if (submenuEmail && btnEmail
            && !submenuEmail.contains(event.target)
            && !btnEmail.contains(event.target)) {
            submenuEmail.hidden = true;
        }
    });

    // ==========================================
    // 3. SIMULAÇÃO DE AGENDAMENTO (agendamento.html)
    // ==========================================
    const formAgendamento = document.getElementById('formAgendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o recarregamento da página

            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const servicoSelect = document.getElementById('servico');
            const servicoText = servicoSelect.options[servicoSelect.selectedIndex].text;
            const data = document.getElementById('data').value;
            const hora = document.getElementById('hora').value;

            // Salva temporariamente no navegador
            const novoAgendamento = { nome, telefone, servico: servicoText, data, hora };
            localStorage.setItem('ultimoAgendamento', JSON.stringify(novoAgendamento));

            alert(`🎉 AGENDAMENTO REALIZADO COM SUCESSO!\n\n👤 Nome: ${nome}\n📱 Telefone: ${telefone}\n✂️ Serviço: ${servicoText}\n🗓️ Data: ${data}\n🕒 Horário: ${hora}\n\nSeu horário foi reservado no sistema!`);

            formAgendamento.reset();
        });
    }

    // ==========================================
    // 4. SIMULAÇÃO DE CADASTRO (cadastro.html)
    // ==========================================
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById('cad-nome') ? document.getElementById('cad-nome').value.trim() : 'Usuário';
            const email = document.getElementById('cad-email') ? document.getElementById('cad-email').value.trim() : '';
            const senha = document.getElementById('cad-senha') ? document.getElementById('cad-senha').value : '';

            // Salva o usuário no localStorage para poder fazer login depois
            const usuario = { nome, email, senha };
            localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));

            alert(`✅ CADASTRO REALIZADO COM SUCESSO!\n\nBem-vinda, ${nome}!\nVocê já pode fazer o login para acessar a conta.`);
            
            // Redireciona para a página de login
            window.location.href = 'login.html';
        });
    }

    // ==========================================
    // 5. SIMULAÇÃO DE LOGIN (login.html)
    // ==========================================
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = document.getElementById('login-email') ? document.getElementById('login-email').value.trim() : '';
            const senhaInput = document.getElementById('login-senha') ? document.getElementById('login-senha').value : '';

            // Busca o usuário salvo durante o cadastro
            const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioCadastrado'));

            if (usuarioSalvo && usuarioSalvo.email === emailInput && usuarioSalvo.senha === senhaInput) {
                alert(`🔓 LOGIN REALIZADO COM SUCESSO!\n\nSeja bem-vinda de volta, ${usuarioSalvo.nome}!`);
                window.location.href = 'index.html';
            } else {
                // Caso não tenha cadastro prévio, aceita qualquer login para testes
                alert(`🔓 LOGIN SIMULADO COM SUCESSO!\n\nEntrando no sistema com o e-mail: ${emailInput}`);
                window.location.href = 'index.html';
            }
        });
    }

});S
