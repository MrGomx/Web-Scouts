document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const currentYear = 2024;

    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const monthNames = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'];

    const events = {
        "2024-01-03": { title: "Dia de grup", description: "Lloc: Cubil<br>Hora: 10.00" },
        "2024-01-15": { title: "Evento 2", description: "Descripción del Evento 2" },
        "2024-02-03": { title: "Dia de grup", description: "Pos tot el dia per ahi donant pel cul" },
        "2024-02-20": { title: "Dia de grup", description: "Pos tot el dia per ahi donant pel cul" },
        "2024-02-15": { title: "Dia de grup", description: "Pos tot el dia per ahi donant pel cul" },
        "2024-02-14": { title: "Dia de grup", description: "Pos tot el dia per ahi donant pel cul" },
        "2024-02-09": { title: "Dia de grup", description: "Pos tot el dia per ahi donant pel cul" },
        // ... otros eventos
    };

    function showEventPopup(eventInfo) {
        const container = document.getElementById('event-info-container');
        container.innerHTML = `
            <div class="event-info-content">
                <h3>${eventInfo.title}</h3>
                <p>${eventInfo.description}</p>
            </div>
        `;
        container.style.display = "block";
    }

    function generateCalendar(month, year) {
        let titleOutput = `<div id="calendar-title-${month}" class="calendar-title">${monthNames[month]} ${year}</div>`;
        calendar.innerHTML += titleOutput;

        const firstDay = (new Date(year, month)).getDay() - 1;
        let date = 1;
        const monthDays = new Date(year, month + 1, 0).getDate();

        let output = `<table>
            <thead>
                <tr>${dayNames.map(day => `<th>${day}</th>`).join('')}</tr>
            </thead>
            <tbody>`;
        
        for (let i = 0; i < 6; i++) {
            let weekOutput = "";
            let emptyCells = 0;

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay || date > monthDays) {
                    weekOutput += '<td></td>';
                    emptyCells++;
                } else {
                    let eventDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
                    const cell = document.createElement('td');

                    if(events[eventDate]) {
                        cell.className = "event";
                        cell.dataset.eventDate = eventDate;
                    }
                    cell.innerHTML = `${date}<br>${events[eventDate] ? events[eventDate].title : ''}`;
                    weekOutput += cell.outerHTML;
                    date++;
                }
            }
            
            if (emptyCells < 7) {
                output += '<tr>' + weekOutput + '</tr>';
            }
        }
        output += `</tbody></table>`;
        calendar.innerHTML += output;
    }

    for(let i = 0; i < 12; i++) {
        generateCalendar(i, currentYear);
    }

    calendar.addEventListener("click", function (e) {
        if (e.target.classList.contains("event")) {
            const eventDate = e.target.dataset.eventDate;
            if (events[eventDate]) {
                showEventPopup(events[eventDate]);
            }
        }
    });

    let currentMonthIndex = 0;

    function showInitialMonth() {
        const tables = document.querySelectorAll("#calendar table");
        const titles = document.querySelectorAll(".calendar-title");

        tables.forEach(table => table.style.display = "none");
        titles.forEach(title => title.style.display = "none");

        titles[currentMonthIndex].style.display = "block";
        tables[currentMonthIndex].style.display = "block";
    }

    function showPrevMonth() {
        const tables = document.querySelectorAll("#calendar table");
        const titles = document.querySelectorAll(".calendar-title");
        if (currentMonthIndex > 0) {
            titles[currentMonthIndex].style.display = "none";
            tables[currentMonthIndex].style.display = "none";
            currentMonthIndex--;
            titles[currentMonthIndex].style.display = "block";
            tables[currentMonthIndex].style.display = "block";
        }
    }

    function showNextMonth() {
        const tables = document.querySelectorAll("#calendar table");
        const titles = document.querySelectorAll(".calendar-title");
        if (currentMonthIndex < 11) {
            titles[currentMonthIndex].style.display = "none";
            tables[currentMonthIndex].style.display = "none";
            currentMonthIndex++;
            titles[currentMonthIndex].style.display = "block";
            tables[currentMonthIndex].style.display = "block";
        }
    }

    document.getElementById("prev-month").addEventListener("click", showPrevMonth);
    document.getElementById("next-month").addEventListener("click", showNextMonth);

    showInitialMonth();
});
