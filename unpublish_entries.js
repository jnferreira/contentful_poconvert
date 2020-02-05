const contentfuldev = require('contentful');
const contentful = require('contentful-management')

const client = contentfuldev.createClient({
    accessToken: 'IfUBVgs52y85AtYPV_lebMwFyOj5yM-FdVMZpjyaSb8',
    space: 'diyk7s6za88t',
    environment: 'master'
})


const clientm = contentful.createClient({
    accessToken: 'CFPAT-Cn7TNTxIW3PmGIPUFZTFrOcLObnQfxWnsAy7qq4nT6I'
})

async function unpublish(id) {


    await clientm.getSpace('orl9epj4q4ul')
        .then((space) => space.getEnvironment('master'))
        .then((environment) => environment.getEntry(id))
        .then((entry) => {
            entry.unpublish()

        })
        .catch(console.error)

    return "Unpublished";
}

clientm.getSpace('orl9epj4q4ul')
    .then((space) => space.getEntries({
        limit: 1000
    }))
    .then((response) => {
        console.log(response.items.length)
        for (let i = 0; i < response.items.length; i++) {
            let id = response.items[i].sys.id
            console.log(id)

            let time = i * 1000
            setTimeout(() => unpublish(id), time)

        }

    }).catch(console.error)