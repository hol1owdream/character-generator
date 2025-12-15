// ==========================================
//      SYSTEM ZARZĄDZANIA POSTACIĄ
// ==========================================

// Функция создания персонажа
function createCharacter(name, role) {
    // Проверка: имя должно содержать минимум 3 символа
    if (name.length < 3) {
        return null; // если имя слишком короткое, возвращаем null
    }

    // Создаем пустой массив для умений
    let skills = []; 
    // Создаем объект для экипировки: оружие, броня, предметы
    let equipment = {
        weapon: "", // оружие персонажа
        armor: "",  // броня персонажа
        items: []   // массив предметов персонажа
    };

    // Разные стартовые наборы в зависимости от класса
    if (role === "Wojownik") { // если класс "Воин"
        equipment.weapon = "sword"; // стартовое оружие
        equipment.armor = "shield"; // стартовая броня
    } else if (role === "Mag") { // если класс "Маг"
        equipment.weapon = "staff"; // стартовое оружие
        equipment.armor = "robe";   // стартовая броня
    }

    // Возвращаем объект персонажа со всеми начальными параметрами
    return {
        name: name,        // имя персонажа
        role: role,        // класс персонажа
        level: 1,          // начальный уровень
        skills: skills,    // массив умений
        equipment: equipment // объект экипировки
    };
}

// Функция добавления предмета в инвентарь
function addItem(character, item) {
    // Добавляем новый предмет в массив items
    character.equipment.items.push(item);
}

// Функция изучения нового умения
function learnSkill(character, newSkill) {
    // Проверка: у персонажа не может быть больше 5 умений
    if (character.skills.length < 5) {
        // Добавляем новое умение в массив skills
        character.skills.push(newSkill);
    }
}

// Функция повышения уровня персонажа
function levelUp(character) {
    // Увеличиваем уровень на 1
    character.level = character.level + 1;
}

// Функция формирования текстового описания персонажа
function characterDescription(character) {
    // Создаем строку для текста описания
    let description = "=== KARTA POSTACI ===\n";

    // Добавляем основную информацию: имя, класс, уровень
    description += "Imię: " + character.name + "\n";
    description += "Klasa: " + character.role + "\n";
    description += "Poziom: " + character.level + "\n\n";

    // Добавляем список умений
    description += "Umiejętności:\n";
    for (let skill of character.skills) { // перебираем все умения в массиве
        description += "- " + skill + "\n";
    }

    // Добавляем информацию об экипировке
    description += "\nEkwipunek:\n";
    description += "Broń: " + character.equipment.weapon + "\n";
    description += "Zbroja: " + character.equipment.armor + "\n";
    description += "Przedmioty:\n";
    for (let item of character.equipment.items) { // перебираем все предметы
        description += "- " + item + "\n";
    }

    // Возвращаем готовое текстовое описание персонажа
    return description;
}
