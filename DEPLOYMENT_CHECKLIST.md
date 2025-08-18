# 🚀 Deployment Checklist

## Перед деплоєм:

### ✅ Code Quality
- [ ] Код перевірено на помилки (`npm run typecheck`)
- [ ] Проект збирається без помилок (`npm run build`)
- [ ] Всі файли додано до git
- [ ] README.md оновлено з правильними посиланнями

### ✅ Assets & Content
- [ ] Скріншоти створено та збережено в `screenshots/`
- [ ] Favicon додано (`public/favicon.ico`)
- [ ] Мета-теги для соціальних мереж налаштовано
- [ ] Опис проекту в package.json оновлено

### ✅ Configuration Files
- [ ] `vercel.json` налаштовано
- [ ] `netlify.toml` налаштовано  
- [ ] `Dockerfile` перевірено
- [ ] `.gitignore` включає всі потрібні файли
- [ ] Environment variables налаштовано (якщо потрібно)

## Платформи для деплою:

### 🟢 Vercel (Рекомендовано)
1. Створіть акаунт на [vercel.com](https://vercel.com)
2. Підключіть GitHub репозиторій
3. Vercel автоматично виявить React Router проект
4. Деплой займе 2-3 хвилини

### 🟠 Netlify
1. Створіть акаунт на [netlify.com](https://netlify.com)
2. Підключіть GitHub репозиторій
3. Build settings: `npm run build`, Publish directory: `build/client`
4. Деплой займе 3-5 хвилин

### 🟡 Railway
1. Встановіть CLI: `npm install -g @railway/cli`
2. Авторизуйтесь: `railway login`
3. Деплой: `railway up`
4. Railway автоматично налаштує домен

### 🔵 Render
1. Створіть акаунт на [render.com](https://render.com)
2. Підключіть GitHub репозиторій
3. Виберіть "Static Site"
4. Build Command: `npm run build`
5. Publish Directory: `build/client`

## Після деплою:

### ✅ Testing
- [ ] Сайт відкривається на production URL
- [ ] Всі сторінки працюють правильно
- [ ] Upload форма функціонує
- [ ] Responsive design працює на мобільних
- [ ] Всі assets завантажуються (іконки, зображення)

### ✅ Documentation
- [ ] Live demo посилання додано до README.md
- [ ] Посилання додано до GitHub About секції
- [ ] Проект додано до portfolio
- [ ] Соціальні мережі оновлено з посиланням

### ✅ SEO & Analytics
- [ ] Google Analytics додано (опціонально)
- [ ] Meta описи налаштовано
- [ ] Open Graph теги додано
- [ ] Sitemap.xml створено (опціонально)

## Корисні команди:

```bash
# Локальна перевірка перед деплоєм
npm run build && npm run start

# Створення скріншотів
npm run screenshots

# Перевірка типів
npm run typecheck

# Тестування production білду локально
npx serve build/client -s
```

## Troubleshooting:

### ❌ Build fails
- Перевірте `npm run typecheck`
- Перевірте всі imports та exports
- Очистіть node_modules: `rm -rf node_modules && npm install`

### ❌ Routes не працюють на production
- Переконайтесь що налаштовано redirects в конфігурації хостингу
- Для SPA потрібен fallback на index.html

### ❌ Assets не завантажуються
- Перевірте шляхи до файлів (absolut vs relative)
- Перевірте public folder структуру
- Перевірте build output directory

## 📞 Support
Якщо виникли проблеми:
1. Перевірте документацію платформи деплою
2. Перегляньте логи білду
3. Порівняйте з working examples онлайн
