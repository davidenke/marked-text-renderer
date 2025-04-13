# marked-text-renderer

[Github](https://github.com/davidenke/marked-render-to-text) |
[NPM](https://www.npmjs.com/package/marked-text-renderer)

Forked from https://github.com/edazpotato/marked-render-to-text

A custom renderer for [Marked](https://github.com/markedjs/marked) that renders
markdown to plain text. Can be useful for when you want to show a preview
snippet of an article (or anything written in markdown) without any rich
formatting.

## Installation

```bash
npm install -s marked-text-renderer
```

## Usage

### Global usage

By replacing the renderer entirely.

```ts
import { marked } from 'marked';
import { TextRenderer } from 'marked-text-renderer';

const testText = `# Title\n**bold text**\n- A\n- List\n- *of*\n- ~~things~~`;
const renderer = new TextRenderer();

marked.use({ renderer });
console.log(marked(testText)); // Note that it preseves newlines - you need to remove those yourself
/*
Title
bold text
A
List
of
things

*/
```

### One-time usage

By providing the renderer as an option to the marked function.

```ts
import { marked } from 'marked';
import { TextRenderer } from 'marked-text-renderer';

const testText = `# Title\n**bold text**\n- A\n- List\n- *of*\n- ~~things~~`;
const renderer = new TextRenderer();
console.log(marked(testText, { renderer }));
```

## Options

You can enable fancy mode by passing `true` as the first argument when initialising the class.

```ts
import { marked } from 'marked';
import { TextRenderer } from 'marked-text-renderer';

const testText = `# Title\n**bold text**\n- A\n- List\n- *of*\n- ~~things~~`;
const renderer = new TextRenderer(true);

const testText = `# Title\n**bold text**\n- A\n- List\n- *of*\n- ~~things~~`;
marked.use({ renderer });
console.log(marked(testText));
/*

Title

BOLD TEXT
- A
- List
- *of*
- ~things~

*/
```

You can pass any normal marked renderer options as the second paramater (if you don't want to enable fancy mode, you should pass `false` as the first parameter when doing this).
