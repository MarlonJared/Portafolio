document.addEventListener("DOMContentLoaded", function () {
    console.log("El script se está ejecutando correctamente.");

    // Datos de habilidades (nombre y año de inicio)
    const skills = {
        design: [
            { name: "Graphics Design", startYear: 2017 },
            { name: "2D Animation (After Effects)", startYear: 2017 },
            { name: "3D Modeling (3DS Max, Mudbox, Blender)", startYear: 2017 },
            { name: "UX/UI Design", startYear: 2019 },
            { name: "Video Editing & Motion Graphics", startYear: 2018 },
            { name: "Advertising Design (Banners, Social Media, Print)", startYear: 2018 },
            { name: "Digital Marketing & Branding", startYear: 2018 },
            { name: "Character Design (2D/3D)", startYear: 2017 },
            { name: "Web Design", startYear: 2018 },
            { name: "Texturing & Digital Sculpting", startYear: 2017 },
            { name: "3D Animation (3DS Max, Maya, Blender)", startYear: 2018 },
            { name: "Rigging & Skinning", startYear: 2019 }
        ],
        coding: [
            { name: "Unity (C#)", startYear: 2018 },
            { name: "Game Level Design", startYear: 2019 },
            { name: "Game Mechanics Programming", startYear: 2019 },
            { name: "Unreal Engine (Blueprints, C++)", startYear: 2021 },
            { name: "Game Optimization & Performance", startYear: 2020 },
            { name: "AI for Games", startYear: 2021 }
        ],
        tech: [
            { name: "C#", startYear: 2018 },
            { name: "C++", startYear: 2020 },
            { name: "Interactive Prototyping", startYear: 2019 },
            { name: "HTML/CSS", startYear: 2019 }
        ],
        sound: [
            { name: "Music Composition & Production", startYear: 2015 },
            { name: "Sound Design for Games", startYear: 2017 },
            { name: "Digital Communication", startYear: 2018 },
            { name: "UX Strategy", startYear: 2019 }
        ]
    };

    // Función para calcular años de experiencia
    function calculateYears(startYear) {
        const currentYear = new Date().getFullYear();
        return currentYear - startYear;
    }

    // Función para encontrar el máximo global de años de experiencia
    function findGlobalMaxYears(skills) {
        let maxYears = 0;
        for (const category in skills) {
            skills[category].forEach(skill => {
                const years = calculateYears(skill.startYear);
                if (years > maxYears) {
                    maxYears = years;
                }
            });
        }
        return maxYears;
    }

    // Función para crear una barra de progreso normalizada al 90%
    function createProgressBar(years, maxYears) {
        const progressPercent = (years / maxYears) * 90; // Normalizado al 90%
        return `
            <div class="progress" style="width: ${progressPercent}%;"></div>
        `;
    }

    // Función para renderizar habilidades
    function renderSkills(skillList, containerId, maxYears) {
        const container = document.getElementById(containerId);
        let html = "";
        skillList.forEach(skill => {
            const years = calculateYears(skill.startYear);
            html += `
                <div class="progress-detail">
                    <div class="progress-name">${skill.name}</div>
                    <div class="progress-percent">${years} años</div>
                </div>
                <div class="progress-bar">
                    ${createProgressBar(years, maxYears)}
                </div>
            `;
        });
        console.log(html); // Verifica que el HTML se esté generando correctamente
        container.innerHTML = html;
    }

    // Encontrar el máximo global de años de experiencia
    const globalMaxYears = findGlobalMaxYears(skills);

    // Renderizar todas las habilidades usando el máximo global
    renderSkills(skills.design, "design-skills", globalMaxYears);
    renderSkills(skills.coding, "coding-skills", globalMaxYears);
    renderSkills(skills.tech, "tech-skills", globalMaxYears);
    renderSkills(skills.sound, "sound-skills", globalMaxYears);
});