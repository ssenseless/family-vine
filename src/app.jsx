import * as React from 'react';
import { createRoot } from 'react-dom/client'
import Example from './components/example.jsx'


const root = createRoot(document.getElementById("root"))
root.render(
    <Example />
)
