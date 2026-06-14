alert("Сайт запущен!");

function checkServerStatus() {
    // Используем API mc-api.net — он лучше справляется с Атерносом
    const ip = 'top_vanila.aternos.me';
    
    fetch(`https://api.mcstatus.io/v2/status/java/${ip}`)
        .then(response => {
            if (!response.ok) throw new Error('Ошибка сети');
            return response.json();
        })
        .then(data => {
            const onlineElement = document.getElementById("online");
            
            if (onlineElement) {
                // Проверяем, запущен ли сервер
                if (data.online === true) {
                    // Показываем реальный онлайн из полученных данных
                    onlineElement.innerText = "Онлайн: " + data.players.online;
                } else {
                    onlineElement.innerText = "Оффлайн";
                }
            }
        })
        .catch(error => {
            console.error("Ошибка API:", error);
            // Если этот API перегружен, пробуем запасной (mcsrvstat)
            fetch(`https://api.mcsrvstat.us/2/${ip}`)
                .then(res => res.json())
                .then(data => {
                    const onlineElement = document.getElementById("online");
                    if (onlineElement && data.online) {
                        onlineElement.innerText = "Онлайн: " + data.players.online;
                    }
                });
        });
}

// Запуск при загрузке
checkServerStatus();

// Обновление каждые 30 секунд
setInterval(checkServerStatus, 30000);