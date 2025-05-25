import { ToolInvocation } from 'ai';
import React from 'react';
import RunCodeToolView from './toolViews/run-code';
import SchemaView from './toolViews/schema_view';
import FileDownload from './toolViews/file-download';
import Loader from './toolViews/schem-view-loader';

interface ToolViewProps {
  toolInvocation: ToolInvocation;
}

enum ToolName {
  RUN_CODE = 'runCode',
  UPLOADTOSTORAGE = 'uploadToStorage',
}

export default function ToolView({ toolInvocation }: ToolViewProps) {
  if (toolInvocation.toolName === ToolName.RUN_CODE) {
    if (toolInvocation?.state === 'result') {
      return <RunCodeToolView code={toolInvocation?.args?.code} />;
    } else {
      return <div>Generating Python Code...</div>;
    }
  }
  if (toolInvocation.toolName === 'generateSchema') {
    if (toolInvocation?.state === 'result') {
      return <SchemaView schema={toolInvocation?.result} />;
    } else {
      return <Loader />;
    }
  }
  if (toolInvocation.toolName === ToolName.UPLOADTOSTORAGE) {
    if (toolInvocation?.state === 'result') {
      return (
        <FileDownload
          url={toolInvocation?.result?.filePath}
          format={toolInvocation?.args?.filePath?.split('.').pop()}
          name={toolInvocation?.args?.filePath?.split('.')[0] || 'DataFile'}
        />
      );
    } else {
      return <div>Uploading to storage...</div>;
    }
  }
  return <div>{JSON.stringify(toolInvocation, null, 2)}</div>;
}
