import highlighted from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import java from 'highlight.js/lib/languages/java';
import js from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import ts from 'highlight.js/lib/languages/typescript';
import yaml from 'highlight.js/lib/languages/yaml';
import { marked } from 'marked';
import { useMemo } from 'react';

export function useMarkdown() {
  return useMemo(() => {
    // trying to use dynamic import but seemed not work
    highlighted.registerLanguage('jsx', js);
    highlighted.registerLanguage('javascript', js);
    highlighted.registerLanguage('typescript', ts);
    highlighted.registerLanguage('python', python);
    highlighted.registerLanguage('ruby', ruby);
    highlighted.registerLanguage('bash', bash);
    highlighted.registerLanguage('java', java);
    highlighted.registerLanguage('json', json);
    highlighted.registerLanguage('yaml', yaml);

    return marked.setOptions({
      highlight: function (code, lang) {
        return highlighted.highlightAuto(code, [lang]).value;
      },
      // gfm: true,
      // breaks: true,
      silent: false,
    });
  }, []);
}
