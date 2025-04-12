import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { it } from 'node:test';

import { marked } from 'marked';
import { TextRenderer } from './index.js';
import assert from 'node:assert';

const testRoot = resolve(import.meta.dirname, '..', 'test');
const testFile = await readFile(join(testRoot, 'test.md'), 'utf-8');
const boring = await readFile(join(testRoot, 'boring.output.txt'), 'utf-8');
const fancy = await readFile(join(testRoot, 'fancy.output.txt'), 'utf-8');

it('renders a simple text', async () => {
  const output = marked.parse(testFile, {
    renderer: new TextRenderer(false)
  });

  assert.strictEqual(output, boring, 'The output should be plain');
});

it('renders a fancy text', async () => {
  const output = marked.parse(testFile, {
    renderer: new TextRenderer(true)
  });

  assert.strictEqual(output, fancy, 'The output should be fancy');
});
