## Installation

Khởi tạo dự án với Vite

```bash
npm create vite
```

Select a framework: React
Select a variant: JavaScript + SWC

## Available Scripts

```bash
npm install
```

In the project directory, you can run:

```bash
npm run dev
```

Runs the app in the development mode.

```bash
npm run build
```

Builds the app for production to the `dist` folder

## Install code formatter Prettier

```bash
npm install prettier
```

add script to package.json

```json
"format": "prettier --write ."
```

create file .prettierrc to root project

```javascript
{
   "arrowParens": "always",
   "bracketSameLine": false,
   "bracketSpacing": true,
   "embeddedLanguageFormatting": "auto",
   "htmlWhitespaceSensitivity": "css",
   "insertPragma": false,
   "jsxSingleQuote": false,
   "printWidth": 120,
   "proseWrap": "preserve",
   "quoteProps": "as-needed",
   "requirePragma": false,
   "semi": true,
   "singleQuote": true,
   "tabWidth": 3,
   "trailingComma": "all",
   "useTabs": false,
   "vueIndentScriptAndStyle": false
}
```

Create folder .vscode/settings.json to root
to auto format when save before commit

```javascript
{
   "editor.formatOnSave": true,
   "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Config vite.config.js

vite.config.js on root project
to alias to src when '~'

```javascript
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         '~': '/src',
      },
   },
});
```

## Config jsconfig.json

create jsconfig.json on root project
to show all file on folder to easy import

```javascript
{
   "compilerOptions": {
      "baseUrl": ".",
      "paths": {
         "~/*": ["src/*"]
      }
   }
}
```

## Librarys && Scripts

```bash
npm install normalize.css
npm install sass
npm install classnames
npm install react-router-dom
```

# Icon

```bash
npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
```
