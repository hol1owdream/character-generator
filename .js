// ==========================================
//      System zarządzania postacią
// ==========================================

// Funkcja tworzenia nowej postaci
function stworzPostac(name, role) {
    // Sprawdzamy, czy imię ma minimum 3 znaki
    if (name.length < 3) {
        console.error("Imię musi mieć minimum 3 znaki!");
        return null;
    }

    // Początkowy zestaw przedmiotów i umiejętności w zależności od klasy
    let startEquipment = {};
    let startSkills = [];
    switch (role.toLowerCase()) {
        case "wojownik": // wojownik
            startEquipment = { weapon: "miecz", armor: "tarcza", items: ["Mikstura zdrowia"] };
            startSkills = ["Cięcie", "Blok"];
            break;
        case "mag": // mag
            startEquipment = { weapon: "kostur", armor: "szata", items: ["Mikstura many"] };
            startSkills = ["Kula ognia", "Pole lecznicze"];
            break;
        default: // inne klasy
            startEquipment = { weapon: "sztylet", armor: "tkanina", items: [] };
            startSkills = [];
    }

    // Tworzymy obiekt postaci
    return {
        name: name, // Imię postaci
        role: role, // Klasa postaci
        level: 1, // Poziom
        skills: startSkills, // Umiejętności
        equipment: startEquipment // Ekwipunek
    };
}

// Funkcja dodawania przedmiotu do ekwipunku
function dodajPrzedmiot(character, item) {
    character.equipment.items.push(item); // dodajemy do tablicy przedmiotów
}

// Funkcja nauki nowej umiejętności
function nauczUmiejetnosci(character, newSkill) {
    if (character.skills.length >= 5) { // sprawdzenie limitu 5 umiejętności
        console.warn("Postać nie może mieć więcej niż 5 umiejętności!");
        return;
    }
    character.skills.push(newSkill); // dodajemy umiejętność
}

// Funkcja awansowania postaci
function awansuj(character) {
    character.level += 1; // zwiększamy poziom o 1
}

// Funkcja wyświetlania opisu postaci
function opisPostaci(character) {
    let desc = `=== KARTA POSTACI ===\n`;
    desc += `Imię: ${character.name}\n`;
    desc += `Klasa: ${character.role}\n`;
    desc += `Poziom: ${character.level}\n\n`;

    desc += "Umiejętności:\n";
    for (let skill of character.skills) { // iteracja po umiejętnościach
        desc += `- ${skill}\n`;
    }

    desc += "\nEkwipunek:\n";
    desc += `Broń: ${character.equipment.weapon}\n`;
    desc += `Zbroja: ${character.equipment.armor}\n`;
    desc += "Przedmioty:\n";
    for (let item of character.equipment.items) { // iteracja po przedmiotach
        desc += `- ${item}\n`;
    }

    return desc; // zwracamy tekst opisu
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
