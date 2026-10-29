import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=pathname==='/'?'index.html':pathname.slice(1);if(!['index.html','styles.css','app.js'].includes(file)){res.writeHead(404);return res.end('Not found');}res.setHeader('Content-Type',types[path.extname(file)]);res.end(await readFile(file));}catch{res.writeHead(404);res.end('Not found');}}).listen(3000,()=>console.log('Preview: http://localhost:3000'));
