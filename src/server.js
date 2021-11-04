const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const app = express()

const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00",
    },
];

app.get('/', (req, res) =>{
    res.send("inicio")
})

app.get('/pdf', (request, response) => {

    const filePath = path.join(__dirname, "print.ejs")
    ejs.renderFile(filePath, { passengers }, (err, html) => {
        if(err) {
            return response.send('Erro na leitura do arquivo')
        }

        const options = {
            format: 'A4',
            border: {
                right: '8'
            }
            // height: "11.25in",
            // width: "8.5in",
            // header: {
            //     height: "20mm"
            // },
            // footer: {
            //     height: "20mm"
            // }
        }

        //criar o pdf
        // pdf.create(html, options).toFile(`./uploads/report${Date.now()}.pdf`, (err, data) => {
        //     if (err) {
        //         return response.send("Erro ao gerar o PDF")
        //     }
           
        //     // enviar para o navegador
        //     return response.send(html)
        // })

        pdf.create(html, options).toBuffer( (err, buffer)=>{
            if(err){
                console.log(err);
            }
            console.log(buffer);
            return response.send(buffer);
        })
        
        // pdf.create(html, options).toStream( (err, stream)=>{
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log(stream);
           
        // })
       

    })
   
})

app.listen(3000, () =>{
    console.log('sevidor rodando');
})
