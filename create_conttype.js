const contentful = require('contentful-management')

const client = contentful.createClient({
    accessToken: 'CFPAT-_QLbCxDyhpTnTR2FFvUSqrly5QCZxfHQzzNCDQdzroE'
})

// //SPACE NAME
client.getSpace('orl9epj4q4ul')
    .then((space) => space.createContentType({
        //CONTENT TYPE NAME
        name: 'test1',
        displayField: 'msgid',
        fields: [{
                id: 'msgid',
                name: 'msgid',
                type: 'Symbol',
                localized: false,
                required: false,
                validations: [],
                disabled: false,
                omitted: false
            },
            {
                id: 'msgstr',
                name: 'msgstr',
                type: 'RichText',
                localized: false,
                required: false,
                validations: [],
                disabled: false,
                omitted: false
            }
        ]
    }))
    .then((contentType) => {
        contentType.publish()
        console.log("CONTENT TYPE ID: " + contentType.sys.id)
    })
    .catch(console.error)