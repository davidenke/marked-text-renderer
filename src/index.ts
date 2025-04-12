import { Renderer, type MarkedOptions, type Tokens } from 'marked';

export class TextRenderer extends Renderer {
  #fancyMode = false;

  constructor(fancyMode = false, options?: MarkedOptions) {
    super(options);
    this.#fancyMode = Boolean(fancyMode);
  }

  code(tokens: Tokens.Code) {
    if (!this.#fancyMode) return tokens.text;

    let output = '';
    if (tokens.lang) {
      output = `${tokens.lang}:\n`;
    }

    tokens.text.split('\n').forEach(line => {
      output = `${output}\t${line}\n`;
    });

    return output;
  }

  blockquote({ tokens }: Tokens.Blockquote) {
    const quote = this.parser.parse(tokens);
    let parsedQuote = quote;
    if (parsedQuote.endsWith('\n')) {
      parsedQuote = parsedQuote.slice(0, -1);
    }
    if (!this.#fancyMode) return `"${quote}"\n`;

    return `\n\t"${quote
      .split('\n')
      .map((line, i) => {
        if (i === 0) return line;
        if (line === '\t') return '';
        if (line === '') return '';
        return `\t${line}`;
      })
      .join('\n')}"\n`;
  }

  html() {
    return '';
  }

  heading(tokens: Tokens.Heading) {
    const text = tokens.text;
    if (this.#fancyMode) {
      if (tokens.depth === 1) {
        return `\n${text}\n\n`;
      } else if (tokens.depth === 2) {
        return `\n${text}\n`;
      }
    }

    return `${text}\n`;
  }

  hr() {
    if (!this.#fancyMode) return '\n';
    return `${'-'.repeat(25)}\n`; // 25 hyphens
  }

  list({ items }: Tokens.List) {
    return `${items.map(item => this.listitem(item)).join('\n')}\n`;
  }

  listitem(tokens: Tokens.ListItem) {
    return `- ${tokens.text}`;
  }

  checkbox(tokens: Tokens.Checkbox) {
    if (!this.#fancyMode) return '';
    return tokens.checked ? '[x]\n' : '[ ]\n';
  }

  paragraph({ tokens }: Tokens.Paragraph) {
    return `${this.parser.parseInline(tokens)}\n`;
  }

  table(tokens: Tokens.Table) {
    return `${tokens.header}\n${tokens.rows
      .flatMap(cells => cells.map(cell => cell.text))
      .join('\n')}\n`;
  }

  tablerow(tokens: Tokens.TableRow) {
    if (!this.#fancyMode) return `\n${tokens.text}\n`;
    return tokens.text.slice(1) + ' |\n';
  }

  tablecell(tokens: Tokens.TableCell) {
    if (!this.#fancyMode) return tokens.text;
    return ` | ${tokens.text}`;
  }

  // span level renderer
  strong(tokens: Tokens.Strong) {
    if (!this.#fancyMode) return tokens.text;
    return tokens.text.toUpperCase();
  }

  em({ tokens }: Tokens.Em) {
    if (!this.#fancyMode) return this.parser.parseInline(tokens);
    return `*${this.parser.parseInline(tokens)}*`;
  }

  codespan(tokens: Tokens.Codespan) {
    if (!this.#fancyMode) return tokens.text;
    return `\`${tokens.text}\``;
  }

  br() {
    return '\n';
  }

  del(tokens: Tokens.Del) {
    if (!this.#fancyMode) return tokens.text;

    return `~${tokens.text}~`;
  }

  link(tokens: Tokens.Link) {
    if (!this.#fancyMode) return tokens.text;

    const { href, title, text } = tokens;
    return `${text} (${title ? `${title} ` : ''}${href})`;
  }

  image(tokens: Tokens.Image) {
    if (!this.#fancyMode) return tokens.text;

    const { href, title, text } = tokens;
    return `${text}(${title ? `${title} ` : ''}${href})`;
  }

  text(tokens: Tokens.Text) {
    return tokens.text;
  }
}
