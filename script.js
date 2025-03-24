// JavaScript séparé
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling pour les liens d'anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
            }
        });
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Menu mobile
    const mobileMenu = document.querySelector('.menu-mobile');
    const desktopMenu = document.querySelector('.desktop-menu');

    if (window.innerWidth <= 768) {
        mobileMenu.style.display = 'block';
        desktopMenu.style.display = 'none';
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenu.style.display = 'none';
            desktopMenu.style.display = 'flex';
        } else {
            mobileMenu.style.display = 'block';
        }
    });

    // Gestion du formulaire de contact
    document.querySelector('#contact form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre message! Je vais bientôt vous répondre.');
    });
});

    // Gestion du mode sombre
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Vérifier le mode actuel dans le localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Icône lune pour le mode sombre
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Icône soleil pour le mode clair
    }

    // Basculer entre les modes
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Icône lune pour le mode sombre
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Icône soleil pour le mode clair
        }
    });

// Fonction pour agrandir l'image
function agrandirImage(img) {
    // Récupérer la boîte modale et l'élément image agrandie
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("image-agrandie");

    // Afficher la boîte modale
    modal.style.display = "block";
    // Définir la source de l'image agrandie
    modalImg.src = img.src;
}

// Fonction pour fermer la boîte modale
function fermerModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; // Cacher la boîte modale
}


/* Mes Projets */
// Filtrage des TP par thème
const filters = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.card');

filters.forEach(button => {
    button.addEventListener('click', () => {
        // Active le bouton cliqué
        filters.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filtre les cartes
        const filter = button.getAttribute('data-filter');
        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-theme') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Barre de recherche
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

/* Forcer le téléchargement des fichiers */
function forceDownload(url, fileName) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur de réseau : ${response.statusText}`);
            }
            return response.blob();
        })
        .then(blob => {
            // Crée un lien temporaire pour le téléchargement
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName; // Nom du fichier téléchargé
            document.body.appendChild(link); // Ajoute le lien au DOM
            link.click(); // Déclenche le téléchargement
            document.body.removeChild(link); // Supprime le lien du DOM
            URL.revokeObjectURL(link.href); // Libère la mémoire
        })
        .catch(error => {
            console.error('Erreur lors du téléchargement :', error);
        });
}

// Appliquer à tous les liens de téléchargement
document.querySelectorAll('.card a[download]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche l'ouverture du fichier
        const fileUrl = link.getAttribute('href'); // URL du fichier
        const fileName = link.getAttribute('download') || fileUrl.split('/').pop(); // Nom du fichier
        forceDownload(fileUrl, fileName); // Force le téléchargement
    });
});