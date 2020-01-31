const contentfuldev = require('contentful');
const contentful = require('contentful-management')

const client = contentfuldev.createClient({
    accessToken: 'IfUBVgs52y85AtYPV_lebMwFyOj5yM-FdVMZpjyaSb8',
    space: 'diyk7s6za88t',
    environment: 'master',
    rateLimit: 200
})


const clientm = contentful.createClient({
    accessToken: 'CFPAT-_QLbCxDyhpTnTR2FFvUSqrly5QCZxfHQzzNCDQdzroE'
})


async function deleted(id) {


    const space = await clientm.getSpace('diyk7s6za88t')
        .then((space) => space.getEnvironment('master'))
        .then((environment) => environment.getEntry(id))
        .then((entry) => {
            entry.delete()

        })
        .catch(console.error)

    return "Deleted";
}


clientm.getSpace('diyk7s6za88t')
    .then((space) => space.getEntries({
        limit: 1000
    }))
    .then((response) => {
        console.log(response.items.length)
        for (let i = 0; i < response.items.length; i++) {
            let id = response.items[i].sys.id
            console.log(id)
            deleted(id)

        }

    }).catch(console.error)