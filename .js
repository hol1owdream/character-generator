// ==========================================
//      Система управления персонажем
// ==========================================

// Функция создания новой postaci
function stworzPostac(name, role) {
    // Проверяем, что имя минимум 3 символа
    if (name.length < 3) {
        console.error("Имя должно быть минимум 3 символа!");
        return null;
    }

    // Начальный набор предметов и умений в зависимости от класса
    let startEquipment = {};
    let startSkills = [];
    switch (role.toLowerCase()) {
        case "wojownik": // воин
            startEquipment = { weapon: "sword", armor: "shield", items: ["Health potion"] };
            startSkills = ["Slash", "Block"];
            break;
        case "mag": // маг
            startEquipment = { weapon: "staff", armor: "robe", items: ["Mana potion"] };
            startSkills = ["Fireball", "Healing field"];
            break;
        default: // остальные классы
            startEquipment = { weapon: "dagger", armor: "cloth", items: [] };
            startSkills = [];
    }

    // Создаем объект postaci
    return {
        name: name, // Имя персонажа
        role: role, // Класс персонажа
        level: 1, // Уровень
        skills: startSkills, // Умения
        equipment: startEquipment // Экипировка
    };
}

// Функция добавления предмета в ekwipunek
function dodajPrzedmiot(character, item) {
    character.equipment.items.push(item); // добавляем в массив предметов
}

// Функция обучения новой umiejętności
function nauczUmiejetnosci(character, newSkill) {
    if (character.skills.length >= 5) { // проверка лимита 5 умений
        console.warn("Персонаж не может иметь больше 5 умений!");
        return;
    }
    character.skills.push(newSkill); // добавляем умение
}

// Функция повышения уровня postaci
function awansuj(character) {
    character.level += 1; // увеличиваем уровень на 1
}

// Функция вывода описания персонажа
function opisPostaci(character) {
    let desc = `=== KARTA POSTACI ===\n`;
    desc += `Имя: ${character.name}\n`;
    desc += `Класс: ${character.role}\n`;
    desc += `Уровень: ${character.level}\n\n`;

    desc += "Умения:\n";
    for (let skill of character.skills) { // перебор умений
        desc += `- ${skill}\n`;
    }

    desc += "\nEkwipunek:\n";
    desc += `Оружие: ${character.equipment.weapon}\n`;
    desc += `Броня: ${character.equipment.armor}\n`;
    desc += "Предметы:\n";
    for (let item of character.equipment.items) { // перебор предметов
        desc += `- ${item}\n`;
    }

    return desc; // возвращаем текст описания
}

// ==========================================
//          ПРИМЕР ИСПОЛЬЗОВАНИЯ
// ==========================================

// Создаем персонажа
const mojaPostac = stworzPostac("Gandalf", "Mag");

// Добавляем предметы
dodajPrzedmiot(mojaPostac, "Różdżka");
dodajPrzedmiot(mojaPostac, "Księga zaklęć");

// Обучаем новому умению
nauczUmiejetnosci(mojaPostac, "Teleportacja");

// Повышаем уровень
awansuj(mojaPostac);

// Выводим описание персонажа
console.log(opisPostaci(mojaPostac));

// ==========================================
//          ДОПОЛНИТЕЛЬНЫЕ ТЕСТЫ
// ==========================================

console.log("\n=== ТЕСТЫ ВАЛИДАЦИИ ===");

// Тест: Имя короче 3 символов
console.log("Тест: Имя 'Ab' (короче 3 символов)");
const invalidChar = stworzPostac("Ab", "Mag");
console.log("Результат:", invalidChar); // Должен быть null

// Тест: Лимит умений (5 умений)
console.log("\nТест: Лимит умений (5 умений)");
const testChar = stworzPostac("Test", "Mag");
nauczUmiejetnosci(testChar, "Skill1");
nauczUmiejetnosci(testChar, "Skill2");
nauczUmiejetnosci(testChar, "Skill3");
nauczUmiejetnosci(testChar, "Skill4");
nauczUmiejetnosci(testChar, "Skill5"); // Должен добавить
nauczUmiejetnosci(testChar, "Skill6"); // Не должен добавить, предупреждение
console.log("Умения после попытки добавить 6-е:", testChar.skills);

// Тест: Разные роли - Wojownik
console.log("\nТест: Роль 'wojownik'");
const wojownik = stworzPostac("Warrior", "wojownik");
console.log("Оружие:", wojownik.equipment.weapon); // sword
console.log("Броня:", wojownik.equipment.armor); // shield
console.log("Умения:", wojownik.skills); // ["Slash", "Block"]

// Тест: Неизвестная роль
console.log("\nТест: Неизвестная роль 'Unknown'");
const unknown = stworzPostac("Unknown", "Unknown");
console.log("Оружие:", unknown.equipment.weapon); // dagger
console.log("Броня:", unknown.equipment.armor); // cloth
console.log("Умения:", unknown.skills); // []

// Тест: Множественные повышения уровня
console.log("\nТест: Множественные повышения уровня");
awansuj(wojownik);
awansuj(wojownik);
console.log("Уровень после 2 повышений:", wojownik.level); // 3

// Тест: Добавление предметов и вывод описания
console.log("\nТест: Добавление предметов и вывод описания");
dodajPrzedmiot(wojownik, "Extra Item");
console.log(opisPostaci(wojownik));
