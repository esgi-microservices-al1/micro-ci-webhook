const stompit = require('stompit')
 
stompit.connect({ host: 'localhost', port: 61613 }, (err, client) => {
 
    client.subscribe({ destination: 'WEBHOOK_QUEUE' }, (err, msg) => {

        msg.readString('UTF-8', (err, body) => {
            const input = JSON.parse(body)
            console.log(input[0]);
            client.disconnect()
        })

    })
 
})