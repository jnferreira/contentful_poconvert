const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');
const contentful = require('contentful-management');

var PO = require('pofile');

// API KEY Contentful managment
const client = contentful.createClient({
    accessToken: 'CFPAT-_QLbCxDyhpTnTR2FFvUSqrly5QCZxfHQzzNCDQdzroE'
})

// .po FILE
PO.load('mini.po', function(err, po) {

    for (let i = 0; i < po.items.length; i++) {

        let item = po.items[i].msgstr[0]
        let item2 = po.items[i].msgid


        let document = richTextFromMarkdown(item)

        document = document.then(function(result) {
            console.log(result)
                // SPACE ID & Content type ID
            client.getSpace('orl9epj4q4ul').then((space) => space.getEnvironment('master'))
                .then((environment) => environment.createEntry('d6HSkqUurqCzsKQqm82pg', {
                    fields: {
                        msgid: { 'en-US': item2 },
                        msgstr: { 'en-US': result }

                    }
                })).then((entry) => entry.publish()).catch(console.error)
        })
    }

});