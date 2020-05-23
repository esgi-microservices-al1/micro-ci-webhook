const stompit = require('stompit')

stompit.connect({ host: 'localhost', port: 61613 }, (err, client) => {
    frame = client.send({ destination: 'WEBHOOK_QUEUE' })

    jsonSample = 
        [   
            "260227559",
            "testCI",
            "Marcohiro/testCI",
            "2020-05-16T14:02:53Z",
            "234bebd7f6c0624edc446413b62b50f7170116ea",
            "test1",
            "elbaraka.amine2@gmail.com",
            "MrBarak45",
            [],
            [],
            "test.txt" 
        ]

    frame.write(Buffer.from(JSON.stringify(jsonSample)))

    frame.end()

    client.disconnect()
})