import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CodeEditor = () => {
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [jsCode, setJsCode] = useState('');
    const [preview, setPreview] = useState('');
    const [consoleOutput, setConsoleOutput] = useState('');
    const [consoleVisible, setConsoleVisible] = useState(false);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
        <div className="flex flex-row h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-900 text-white py-4">
                <div className="px-4 mb-4">
                    <h2 className="text-lg font-bold mb-2 text-blue-300">Folder View</h2>
                    {/* Add folder structure here */}
                </div>
            </div>
            <div className="w-1/2">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className=' bg-gray-200 h-[10%] font-bold'>
                        <Tab label="HTML" {...a11yProps(0)} />
                        <Tab label="CSS" {...a11yProps(1)} />
                        <Tab label="JavaScript" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0} className=" bg-gray-300 h-[90%]">
                <div className="bg-gray-600 p-4">
                    <h2 className="text-lg font-bold mb-2 text-blue-300">HTML</h2>
                    <CodeMirror
                        value={htmlCode}
                        onChange={(value) => setHtmlCode(value)}
                        theme={okaidia}
                        options={{
                            mode: 'htmlmixed',
                            theme: 'dracula',
                            lineNumbers: true,
                        }}
                    />
                </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1} className=" bg-gray-300 h-[90%]">
                <div className="bg-gray-600 p-4">
                    <h2 className="text-lg font-bold mb-2 text-blue-300">CSS</h2>
                    <CodeMirror
                        value={cssCode}
                        onChange={(value) => setCssCode(value)}
                        theme={okaidia}
                        options={{
                            mode: 'css',
                            theme: 'dracula',
                            lineNumbers: true,
                        }}
                    />
                </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2} className=" bg-gray-300 h-[90%]">
                <div className="bg-gray-600 p-4">
                    <h2 className="text-lg font-bold mb-2 text-blue-300">JavaScript</h2>
                    <CodeMirror
                        value={jsCode}
                        onChange={(value) => setJsCode(value)}
                        theme={okaidia}
                        options={{
                            mode: 'javascript',
                            theme: 'dracula',
                            lineNumbers: true,
                        }}
                    />
                </div>
                </CustomTabPanel>
            </div>
            <div className="w-1/2 h-screen flex flex-col">
                <div className='h-[20%]'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
                        onClick={handleRunCode}
                    >
                        Run
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
                        onClick={toggleConsole}
                    >
                        {consoleVisible ? "Hide Console" : "Show Console"}
                    </button>
                </div>
                <div className='h-[80%]'>
                    <iframe
                        className="w-full h-screen"
                        srcDoc={preview}
                        title="Preview"
                    ></iframe>
                </div>
                {consoleVisible && (
                    <div className="bg-gray-600 p-4 h-[20%]">
                        <h2 className="text-lg font-bold mb-2 text-blue-300">Console</h2>
                        <pre className="text-white p-2 bg-black">{consoleOutput}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeEditor;




