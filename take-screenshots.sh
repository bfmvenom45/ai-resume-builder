#!/bin/bash

# Script для створення скріншотів AI Resume Builder
# Використання: ./take-screenshots.sh

echo "🚀 Створення скріншотів для AI Resume Builder..."

# Перевіряємо чи запущений dev server
if ! curl -s http://localhost:5173 > /dev/null; then
    echo "❌ Dev server не запущений. Запустіть 'npm run dev' спочатку."
    exit 1
fi

# Створюємо папку screenshots якщо її немає
mkdir -p screenshots

echo "📸 Відкриваємо браузер..."
open -a "Google Chrome" http://localhost:5173

echo "⏱️  Чекаємо 3 секунди для завантаження..."
sleep 3

echo "📱 Інструкція:"
echo "1. Зробіть скріншот головної сторінки (Cmd+Shift+4)"
echo "2. Збережіть як screenshots/app-homepage.png"
echo "3. Перейдіть на сторінку upload"
echo "4. Зробіть скріншот і збережіть як screenshots/app-upload.png"
echo "5. Завантажте тестове резюме і зробіть скріншот результатів"
echo "6. Збережіть як screenshots/app-analysis.png"

echo ""
echo "🎯 Або використовуйте DevTools для автоматичного скріншота:"
echo "1. Відкрийте DevTools (F12 або Cmd+Option+I)"
echo "2. Cmd+Shift+P"
echo "3. Введіть 'screenshot'"
echo "4. Виберіть 'Capture full size screenshot'"

echo ""
echo "✅ Готово! Не забудьте оновити посилання в README.md"
