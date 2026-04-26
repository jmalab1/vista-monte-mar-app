import React, { ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Handle the Tab key press
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = textareaRef.current!.selectionStart;
      const end = textareaRef.current!.selectionEnd;
      const newValue = code.substring(0, start) + '\t' + code.substring(end);
      textareaRef.current!.value = code = newValue;

      setTimeout(() => {
        textareaRef.current!.selectionStart = end + 1;
        textareaRef.current!.selectionEnd = end + 1;
      }, 0);
    }
  };

  // Handle scrolling the textarea
  const handleScroll = (): void => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Function to generate line numbers based on code length
  const generateLineNumbers = () => {
    const lineCount = code.split('\n').length;
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  };

  // Sync line numbers height with textarea height
  useEffect(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.style.height = `${textareaRef.current.clientHeight}px`;
    }
  }, [code]); // Re-run effect when code changes (lines may change)

  return (
    <div className="relative">
      {/* Wrapper for line numbers and textarea, both scroll together */}
      <div className="relative flex">
        {/* Line Numbers Container */}
        <div
          ref={lineNumbersRef}
          className="absolute top-0 left-0 w-12 text-gray-500 text-sm font-mono"
          style={{
            lineHeight: '24px', // Match textarea line height
            paddingTop: '16px', // Match textarea padding
            paddingBottom: '16px', // Match textarea padding
            overflow: 'hidden', // Ensure the line numbers div is not scrollable
          }}
        >
          <div className="line-numbers">
            {generateLineNumbers().map((lineNumber) => (
              <div
                key={lineNumber}
                className="text-right"
                style={{ lineHeight: '24px' }}
              >
                {lineNumber}
              </div>
            ))}
          </div>
        </div>

        {/* Textarea Container */}
        <div className="flex-1 ml-14 overflow-auto">
          <textarea
            ref={textareaRef}
            rows={24}
            className="w-full p-4 bg-gray-900 border text-white border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="Write your code here..."
            value={code}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll} // Sync scroll with line numbers
            style={{
              lineHeight: '24px', // Match line numbers line height
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
