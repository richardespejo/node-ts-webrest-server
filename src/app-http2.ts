import  fs  from 'fs';
import * as http2 from 'http2';


const server = http2.createSecureServer({ 
        key: fs.readFileSync('./keys/server.key') , 
        cert: fs.readFileSync('./keys/server.crt')
    
    }, (req , res) => {

    console.log(req.url);

    // const data = {
    //     name: 'richard',
    //     age: 40,
    //     ciudad: 'Madrid'
    // }

    // res.writeHead(200 , { 'Content-type': 'application/json'})
    // res.end(JSON.stringify(data));

    if( req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200 , { 'Content-type': 'text/html'});
        res.end( htmlFile );
        return;

    } 

    if( req.url?.endsWith('.js')) {
        res.writeHead(200, {'Content-type': 'application/javascript'});
    } else if( req.url?.endsWith('.css')){
        res.writeHead(200, {'Content-type': 'text/css'});
    }
    
    try {
        const responseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8');
        res.end( responseContent );
    } catch (error) {
        res.writeHead(404 , { 'Content-type': 'text/html'})
        res.end();

        
    }

    


});


server.listen( 8080, () => {
    console.log('Servidor corriendo en el puerto: 8080')
})