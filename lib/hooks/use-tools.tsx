import { marked } from 'marked';
import React, { createContext, useContext } from 'react';
import useDateFormat from './use-date-format';
import { useMarkdown } from './use-markdown';

interface ToolsContext {
  markdown: typeof marked;
  dateFormat: (date: Date | number) => string;
}

const initTools: ToolsContext = {
  markdown: marked,
  dateFormat: (date: Date | number) => '',
};

const toolsContext = createContext<ToolsContext>(initTools);

export function ToolsProvider({ children }: { children: React.ReactNode }) {
  const tools = useProvideTools();
  return <toolsContext.Provider value={tools}>{children}</toolsContext.Provider>;
}

export const useTools = () => {
  return useContext(toolsContext);
};

function useProvideTools() {
  const markdown = useMarkdown();
  const dateFormat = useDateFormat();

  return { markdown, dateFormat };
}
