# web.components.mailSignature

## Prod

### 1. Install and register custom component

#### Use npm to install package:

``` shell
npm install web.components.mailSignature
```

#### 2. Register

```js
import {register} from './lib/index.js'

// to registre custom component
register()
```

#### Or manually

#### 1. Copy dist directory in docs/dist/ to your project and import

#### 2. Register

```html
<script type="module" src="./your-script.js"></script>
```

#### and register component in your script js file

```js
// to registre custom component
register()
```

### 2. use directly in your html app

```html
<mail-signature></mail-signature>
```


## Dev

To custom project

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
