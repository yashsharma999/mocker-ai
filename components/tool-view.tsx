import { ToolInvocation } from 'ai';
import React from 'react';
import RunCodeToolView from './toolViews/run-code';

interface ToolViewProps {
  toolInvocation: ToolInvocation;
}

enum ToolName {
  RUN_CODE = 'runCode',
}

export default function ToolView({ toolInvocation }: ToolViewProps) {
  if (toolInvocation.toolName === ToolName.RUN_CODE) {
    return <RunCodeToolView code={toolInvocation?.args?.code} />;
  }
  return <div>{JSON.stringify(toolInvocation, null, 2)}</div>;
}
