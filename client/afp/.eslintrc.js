module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true, // Добавляем поддержку Node.js окружения
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "import"
    ],
    "rules": {
        "import/no-cycle": ["error", {"maxDepth": 1}], // Предотвращает циклические зависимости. Опция maxDepth указывает, насколько глубоко он должен искать циклы (по умолчанию Infinity)
        "import/no-self-import": "error", //  Предотвращает импорт файла самим собой, что иногда может быть источником циклов.
        "@typescript-eslint/no-explicit-any": "off",
        "no-mixed-spaces-and-tabs": "off"
    },
    "settings": {
        "react": {
            "version": "detect" // Автоматически определяет версию React
        },
        "import/resolver": {
            "typescript": { // Подключаем поддержку TypeScript
                project: "./tsconfig.json"
            }
        }
    }
}
