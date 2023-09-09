import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';


const CodeEditor = () => {
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [jsCode, setJsCode] = useState('');
    const [preview, setPreview] = useState('');
    const [consoleOutput, setConsoleOutput] = useState('');
    const [consoleVisible, setConsoleVisible] = useState(false);

    const onChangeHtml = React.useCallback((value, viewUpdate) => {
       setHtmlCode(value)
    }, []);
    const onChangeCss = React.useCallback((value, viewUpdate) => {
       setHtmlCode(value)
    }, []);
    const onChangeJs = React.useCallback((value, viewUpdate) => {
       setHtmlCode(value)
    }, []);

    const handleRunCode = () => {
        const combinedCode = `<style>${cssCode}</style>\n<script>${jsCode}</script>\n${htmlCode}`;
        setPreview(combinedCode);
        setConsoleOutput('');

        // Split the JavaScript code by lines
        const lines = jsCode.split('\n');

        // Execute each line individually
        lines.forEach((line, lineNumber) => {
            try {
                const iframe = document.querySelector('iframe');
                const iframeWindow = iframe.contentWindow;

                // Redirect console.log to capture output
                iframeWindow.console.log = function (message) {
                    // Prepend line number and file name to the message
                    const logMessage = `[JavaScript:${lineNumber + 1}] ${message}`;
                    setConsoleOutput((prevOutput) => prevOutput + logMessage + '\n');
                };

                // Evaluate the current line of code
                iframeWindow.eval(line);
            } catch (error) {
                // Handle any errors here
                console.error(error);
            }
        });
    };

    const toggleConsole = () => {
        setConsoleVisible(!consoleVisible);
    };

    return (
        <>
            <div className='flex flex-col h-screen'>
                <div className='h-[10%] w-screen flex flex-row bg-neutral-800'>
                    <div className='flex flex-row'>
                        <svg className='ms-3 stroke-white' xmlns="http://www.w3.org/2000/svg" width="48.237" height="48.464" id="visual-studio-code"><path fill="#0179cb" d="M17.172 29.664 5.215 38.981 0 36.384V12.1l5.195-2.617 11.874 9.338L35.869 0l12.368 4.927v38.528l-12.306 5.009ZM35.5 32.942V15.523l-11.255 8.72ZM5.628 29.808l5.916-5.38-5.916-5.9Z" data-name="visual studio code"></path></svg>
                        <h1 className=' font-serif font-bold mt-3 ms-4 text-white'>Sushil Singh Rathore</h1>
                    </div>
                    <div>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded"
                            onClick={handleRunCode}
                            aria-label="Run Code"
                        >
                            Sign Up
                        </button>
                        <button
                            className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 m-2 rounded"
                            onClick={toggleConsole}
                            aria-label={consoleVisible ? "Hide Console" : "Show Console"}
                        >
                            Log In
                        </button>
                    </div>
                </div>
                <div className="flex flex-row h-[80%]">
                    <div className="w-[30%] bg-black flex flex-col">
                        <div className="p-4 mb-1 h-1/3 bg-gray-900 overflow-auto">
                            <div className='flex flex-row'>
                                <svg className='h-7 w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" id="html5"><path fill="#E44D26" d="M19.037 113.876l-10.005-112.215h109.936l-10.016 112.198-45.019 12.48z"></path><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878h-44.937z"></path><path fill="#EBEBEB" d="M64 52.455h-18.212l-1.258-14.094h19.47v-13.762h-34.511l.33 3.692 3.382 37.927h30.799zM64 88.198l-.061.017-15.327-4.14-.979-10.975h-13.817l1.928 21.609 28.193 7.826.063-.017z"></path><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zM63.952 24.599v13.762h33.244l.276-3.092.628-6.978.329-3.692z"></path></svg>
                                <h2 className="text-lg font-bold mb-2 text-blue-300">HTML</h2>
                            </div>
                            <CodeMirror
                                value={htmlCode}
                                onChange={(value) => setHtmlCode(value)}
                                extensions={[html({ jsx: true })]}
                            />
                        </div>
                        <div className="bg-gray-900 p-4 mb-1 h-1/3 overflow-auto">
                            <div className='flex flex-row'>
                                <svg className='h-7 w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="css-alt"><path fill="#2062AF" d="M20.667 21.666 12 24l-8.667-2.334L1.333 0h21.333l-1.999 21.666z"></path><path fill="#3C9CD7" d="M12 1.755v20.384l.02.005 7.013-1.889 1.619-18.501L12 1.755z"></path><path fill="#FFF" d="M11.992 7.172 5.789 9.756l.206 2.558 5.997-2.564 6.38-2.728.264-2.616-6.644 2.766z"></path><linearGradient id="a" x1="-1227.603" x2="-1227.603" y1="-1146.988" y2="-1148.095" gradientTransform="translate(5707.182 5336.404) scale(4.6418)" gradientUnits="userSpaceOnUse"><stop offset=".387" stop-color="#d1d3d4" stop-opacity="0"></stop><stop offset="1" stop-color="#d1d3d4"></stop></linearGradient><path fill="url(#a)" d="m5.789 9.756.206 2.558 5.997-2.564V7.172L5.789 9.756z"></path><linearGradient id="b" x1="-1226.219" x2="-1226.219" y1="-1147.54" y2="-1148.691" gradientTransform="translate(5707.182 5336.404) scale(4.6418)" gradientUnits="userSpaceOnUse"><stop offset=".387" stop-color="#d1d3d4" stop-opacity="0"></stop><stop offset="1" stop-color="#d1d3d4"></stop></linearGradient><path fill="url(#b)" d="m18.636 4.405-6.644 2.767v2.577l6.38-2.728.264-2.616z"></path><linearGradient id="c" x1="-1228.269" x2="-1225.609" y1="-1146.494" y2="-1146.494" gradientTransform="translate(5707.182 5336.404) scale(4.6418)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e8e7e5"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><path fill="url(#c)" d="m5.799 9.756.206 2.558 9.202.029-.206 3.41-3.028.852-2.911-.735-.176-2.117H6.181l.353 4.086 5.468 1.617 5.439-1.588.706-8.114H5.799z"></path><path d="M11.992 9.756H5.789l.206 2.558 5.997.019V9.756zm0 6.841-.029.008-2.91-.735-.176-2.117H6.171l.353 4.086 5.468 1.617v-2.859z" opacity=".05"></path><linearGradient id="d" x1="-1228.392" x2="-1225.504" y1="-1148.41" y2="-1148.41" gradientTransform="translate(5707.182 5336.404) scale(4.6418)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e8e7e5"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><path fill="url(#d)" d="M5.231 4.405h13.406l-.264 2.616H5.554l-.323-2.616z"></path><path d="M11.992 4.405H5.231l.323 2.616h6.438V4.405z" opacity=".05"></path></svg>
                                <h2 className="text-lg font-bold mb-2 text-blue-300">CSS</h2>
                            </div>
                            <CodeMirror
                                value={cssCode}
                                onChange={(value) => setCssCode(value)}   
                                extensions={[css({ jsx: true })]}
                            />
                        </div>
                        <div className="bg-gray-900 p-4 h-1/3 overflow-auto">
                            <div className='flex flex-row resize-y'>
                                <svg className='h-7 w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="javascript"><path fill="#F0D91F" d="M0 0h24v24H0z"></path><path d="M19.784 18.629c-.255-.961-2.251-1.185-3.616-2.205-1.38-.93-1.709-3.18-.569-4.471.39-.48 1.034-.84 1.71-1.005l.705-.089c1.365-.031 2.204.329 2.834 1.034.182.179.316.36.586.78-.721.449-.721.449-1.755 1.125-.226-.48-.586-.78-.976-.9-.6-.18-1.365.014-1.515.66-.059.195-.045.375.046.705.243.555 1.061.795 1.797 1.14 2.115.858 2.828 1.778 3.003 2.873l-.046-.067c.166.945-.045 1.56-.074 1.65-.781 2.67-5.131 2.76-6.871 1.004-.36-.42-.6-.629-.81-1.109l1.83-1.051c.495.75.944 1.156 1.755 1.336 1.096.135 2.206-.24 1.966-1.41zm-11.651.347c.017 0 .064.091.127.196.233.389.434.659.83.855.386.121 1.236.209 1.566-.48.201-.348.138-1.479.138-2.711 0-1.941.009-3.867.009-5.805h2.248l-.004.056c0 2.07.012 4.125 0 6.179.005 1.276.113 2.416-.397 3.346-.353.72-1.028 1.185-1.811 1.411-1.203.27-2.352.105-3.207-.405-.574-.345-1.019-.887-1.324-1.517l1.825-1.125z"></path></svg>
                                <h2 className="text-lg font-bold mb-2 text-blue-300">JavaScript</h2>
                            </div>                  
                            <CodeMirror
                                value={jsCode}
                                onChange={(value) => setJsCode(value)}
                                extensions={[javascript({ jsx: true })]}
                            />
                        </div>
                    </div>
                    <div className="w-[70%] flex flex-col border shadow-xl overflow-auto">
                        <div>
                            <iframe
                                className="w-full h-screen"
                                srcDoc={preview}
                                title="Preview"
                            ></iframe>
                        </div>
                    </div>
                </div>
                {consoleVisible && (
                    <div className="bg-gray-600 p-4 h-[20%]">
                        <h2 className="text-lg font-bold mb-2 text-blue-300">Console</h2>
                        <pre className="text-white p-2 bg-black">{consoleOutput}</pre>
                    </div>
                )}
                <div className='h-[10%] w-screen flex flex-row bg-neutral-800'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
                        onClick={handleRunCode}
                        aria-label="Run Code"
                    >
                        Run
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
                        onClick={toggleConsole}
                        aria-label={consoleVisible ? "Hide Console" : "Show Console"}
                    >
                        {consoleVisible ? "Hide Console" : "Show Console"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default CodeEditor;




