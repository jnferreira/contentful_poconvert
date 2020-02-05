const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const contentfuldev = require('contentful');
const TurndownService = require('turndown');

var PO = require('pofile');

var turndownService = new TurndownService({ headingStyle: 'atx', keepReplacement: '' })

var currentDate = new Date();

console.log(currentDate)

const client = contentfuldev.createClient({
    accessToken: 'IfUBVgs52y85AtYPV_lebMwFyOj5yM-FdVMZpjyaSb8',
    space: 'orl9epj4q4ul',
    environment: 'master',
})

// Content type ID
client.getEntries({

    content_type: '3dKApSm7tDizlFdAlD9P64',
    order: 'fields.msgid',
    limit: 1000

}).then((response) => {

    let po = new PO()
    po.comments = ["SOME DESCRIPTIVE TITLE.", "Copyright (C) 2018 NLnetLabs", "This file is distributed under the same license as the Internet.nl package.", "", ", fuzzy"]
    po.headers = {
        "Project-Id-Version": "PACKAGE VERSION",
        "Report-Msgid-Bugs-To": "",
        "POT-Creation-Date": currentDate,
        "PO-Revision-Date": "2019-12-18 14:08:50.894106",
        "Last-Translator": "",
        "Language-Team": "",
        "Language": "",
        "MIME-Version": "1.0",
        "Content-Type": "text/plain; charset=UTF-8",
        "Content-Transfer-Encoding": "8bit",
        "Plural-Forms": "nplurals=2; plural=(n != 1);"
    }

    for (let i = 0; i < response.items.length; i++) {

        let document = response.items[i].fields.msgstr
        let htmldoc = documentToHtmlString(document)
        console.log(htmldoc)
        var markdown = turndownService.turndown(htmldoc)

        let item = new PO.Item()
        item.msgstr = markdown
        item.msgid = response.items[i].fields.msgid
        po.items.push(item)

    }
    // .po file name
    po.save('after_contentful.po', function(err) {
        if (err != null) {
            console.log(err)
        }

    });

}).catch(console.error)