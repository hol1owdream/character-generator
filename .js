// ==========================================
//      Система управления персонажем
// ==========================================

// Функция создания новой персонажа
function stworzPostac(name, role) {
    // Проверяем, что имя состоит минимум из 3 символов
    if (name.length < 3) {
        console.error("Imię musi mieć minimum 3 znaki!");
        return null;
    }

    // Начальный набор предметов и умений в зависимости от класса
    let startEquipment = {};
    let startSkills = [];

    switch (role.toLowerCase()) {
        case "wojownik": // класс «wojownik»
            startEquipment = { weapon: "miecz", armor: "tarcza", items: ["Mikstura zdrowia"] };
            startSkills = ["Cięcie", "Blok"];
            break;
        case "mag": // класс «mag»
            startEquipment = { weapon: "kostur", armor: "szata", items: ["Mikstura many"] };
            startSkills = ["Kula ognia", "Pole lecznicze"];
            break;
        default: // неизвестная или общая роль
            startEquipment = { weapon: "sztylet", armor: "tkanina", items: [] };
            startSkills = [];
    }

    // Создаем объект персонажа
    return {
        name: name, // имя персонажа
        role: role, // класс персонажа
        level: 1, // уровень
        skills: startSkills, // умения
        equipment: startEquipment // экипировка
    };
}

// Функция добавления предмета в инвентарь
function dodajPrzedmiot(character, item) {
    character.equipment.items.push(item); // добавляем предмет в список предметов
}

// Функция изучения нового умения
function nauczUmiejetnosci(character, newSkill) {
    // Проверяем лимит: максимум 5 умений
    if (character.skills.length >= 5) {
        console.warn("Postać nie może mieć więcej niż 5 umiejętności!");
        return;
    }
    character.skills.push(newSkill); // добавляем новое умение
}

// Функция повышения уровня
function awansuj(character) {
    character.level += 1; // увеличиваем уровень на 1
}

// Функция генерации описания персонажа
function opisPostaci(character) {
    // Формируем текст описания
    let desc = `=== KARTA POSTACI ===\n`;
    desc += `Imię: ${character.name}\n`;
    desc += `Klasa: ${character.role}\n`;
    desc += `Poziom: ${character.level}\n\n`;

    desc += "Umiejętności:\n";
    for (let skill of character.skills) { // перебираем умения
        desc += `- ${skill}\n`;
    }

    desc += "\nEkwipunek:\n";
    desc += `Broń: ${character.equipment.weapon}\n`;
    desc += `Zbroja: ${character.equipment.armor}\n`;
    desc += "Przedmioty:\n";
    for (let item of character.equipment.items) { // перебираем предметы
        desc += `- ${item}\n`;
    }

    return desc; // возвращаем описание персонажа
}

// ==========================================
//          ПРИМЕР ИСПОЛЬЗОВАНИЯ
// ==========================================

// Создаем персонажа
const mojaPostac = stworzPostac("Gandalf", "Mag");

// Добавляем предметы
dodajPrzedmiot(mojaPostac, "Różdżka");
dodajPrzedmiot(mojaPostac, "Księga zaklęć");

// Изучаем новое умение
nauczUmiejetnosci(mojaPostac, "Teleportacja");

// Повышаем уровень
awansuj(mojaPostac);

// Выводим описание персонажа
console.log(opisPostaci(mojaPostac));

// ==========================================
//          ДОПОЛНИТЕЛЬНЫЕ ТЕСТЫ
// ==========================================

// Тестируем валидацию имени
console.log("\n=== TESTY WALIDACJI ===");
console.log("Test: Imię 'Ab' (za krótkie)");
const invalidChar = stworzPostac("Ab", "Mag");
console.log("Wynik:", invalidChar); // null

// Тестируем лимит умений
console.log("\nTest: Limit umiejętności (5)");
const testChar = stworzPostac("Test", "Mag");
nauczUmiejetnosci(testChar, "Skill1");
nauczUmiejetnosci(testChar, "Skill2");
nauczUmiejetnosci(testChar, "Skill3");
nauczUmiejetnosci(testChar, "Skill4");
nauczUmiejetnosci(testChar, "Skill5");
nauczUmiejetnosci(testChar, "Skill6"); // не добавит
console.log("Umiejętności:", testChar.skills);

// Тестируем роль wojownik
console.log("\nTest: Rola 'wojownik'");
const wojownik = stworzPostac("Warrior", "wojownik");
console.log("Broń:", wojownik.equipment.weapon);
console.log("Zbroja:", wojownik.equipment.armor);
console.log("Umiejętności:", wojownik.skills);

// Тестируем неизвестную rolę
console.log("\nTest: Nieznana rola");
const unknown = stworzPostac("Unknown", "Unknown");
console.log("Broń:", unknown.equipment.weapon);
console.log("Zbroja:", unknown.equipment.armor);
console.log("Umiejętności:", unknown.skills);

// Тестируем многократное повышение уровня
console.log("\nTest: Wielokrotne awanse");
awansuj(wojownik);
awansuj(wojownik);
console.log("Poziom:", wojownik.level);

// Тестируем добавление предметов и описание
console.log("\nTest: Ekwipunek + opis");
dodajPrzedmiot(wojownik, "Extra Item");
console.log(opisPostaci(wojownik));
