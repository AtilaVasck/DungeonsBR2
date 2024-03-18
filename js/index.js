document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('chk');
    const body = document.body;
    const Tiamat = document.querySelector('.Tiamat');
    const navBar = document.querySelector('.navBar');
    const SubCaixa = document.querySelector('.SubCaixa');
    const Entrar = document.querySelector('.Entrar');
    const main = document.querySelector('.main');
    const div = document.querySelector('.caixa_alta');
    const container = document.querySelector('.container');
    const mainFooter = document.querySelector('.main_footer');
    const footerArrow = document.querySelector('.footer-arrow');
    const main_footer_copy = document.querySelector('.main_footer_copy');
    const fim = document.querySelector('.fim'); // Aqui estamos selecionando o elemento correto
    const bottomMain = document.querySelectorAll('.bottomMain');
    const h2 = document.querySelectorAll('h2');
    const p = document.querySelectorAll('p');
    const limitador = document.querySelectorAll('.limitador');

    checkbox.addEventListener('change', () => {
        body.classList.toggle('dark');
        Tiamat.classList.toggle('dark');
        navBar.classList.toggle('dark');
        SubCaixa.classList.toggle('dark');
        Entrar.classList.toggle('dark');
        main.classList.toggle('dark');
        div.classList.toggle('dark');
        container.classList.toggle('dark');
        main_footer_copy.classList.toggle('dark');
        mainFooter.classList.toggle('dark');
        footerArrow.classList.toggle('dark');

        bottomMain.forEach(btn => btn.classList.toggle('dark'));
        p.forEach(paragrafo => paragrafo.classList.toggle('dark'));
        h2.forEach(megaTexto => megaTexto.classList.toggle('dark'));
        limitador.forEach(linha => linha.classList.toggle('dark'));

        // Verifica se o modo escuro está ativado
        if (body.classList.contains('dark')) {
            // Se estiver, aplica a cor de fundo do modo escuro ao elemento .fim
            fim.style.backgroundColor = 'var(--dark-blue)';
        } else {
            // Caso contrário, volta para a cor original
            fim.style.backgroundColor = ''; // Retorna ao estilo padrão definido no CSS
        }

        const shapeFill = footerArrow.querySelector('.shape-fill');
        if (shapeFill) {
            shapeFill.classList.toggle('dark');
        }

        const svgIcon = footerArrow.querySelector('svg');
        if (svgIcon) {
            svgIcon.style.fill = body.classList.contains('dark') ? 'var(--very-dark-blue)' : 'initial';
        }

        if (body.classList.contains('dark')) {
            Tiamat.src = './images/NoturnoDesktop.png';
        } else {
            Tiamat.src = './images/Tiamat_D&D.png';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".lista_img img");
    const backButton = document.getElementById("back-button");
    const characterInfo = document.getElementById("character-info");
    const checkbox = document.querySelector(".checkbox");

    // Adiciona um ouvinte de evento de mudança para o checkbox do modo escuro
    checkbox.addEventListener("change", () => {
        // Se o checkbox estiver marcado, ativa o modo escuro, caso contrário, desativa
        if (checkbox.checked) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    });

    images.forEach(image => {
        image.addEventListener("click", function () {
            const className = this.dataset.class; // Obtém o nome da classe da imagem clicada
            const raceName = this.dataset.race; // Obtém o nome da raça da imagem clicada

            // Oculta todas as imagens e o botão "voltar"
            images.forEach(img => img.style.display = "none");
            backButton.style.display = "block";

            // Exibe apenas a imagem clicada e o botão "voltar"
            this.style.display = "block";

            // Limpa as informações do personagem
            characterInfo.innerHTML = "";

            // Busca informações da classe na API
            fetch(`https://www.dnd5eapi.co/api/classes/${className}`)
                .then(response => response.json())
                .then(classData => {
                    // Exibe informações da classe
                    characterInfo.innerHTML += `<h3>${classData.name}</h3>`;
                    characterInfo.innerHTML += `<p>Dado de acerto: ${classData.hit_die}</p>`;
                })
                .catch(error => console.error("Error fetching class data:", error));

            // Busca informações da raça na API
            fetch(`https://www.dnd5eapi.co/api/races/${raceName}`)
                .then(response => response.json())
                .then(raceData => {
                    // Exibe informações da raça
                    characterInfo.innerHTML += `<h3>${raceData.name}</h3>`;
                    characterInfo.innerHTML += `<p>Bonus de habilidade: ${raceData.ability_bonuses.join(', ')}</p>`;
                })
                .catch(error => console.error("Error fetching race data:", error));
        });
    });

    // Adiciona um ouvinte de evento de clique para o botão "voltar"
    backButton.addEventListener("click", function () {
        // Exibe todas as imagens novamente e oculta o botão "voltar"
        images.forEach(img => img.style.display = "block");
        backButton.style.display = "none";

        // Limpa as informações do personagem
        characterInfo.innerHTML = "";
    });
});