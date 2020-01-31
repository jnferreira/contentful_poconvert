import contentful_management
import json
import polib

import random

def id_generate():
    seed = random.getrandbits(32)
    while True:
       yield seed
       seed += 1

id_entry = id_generate()

po = polib.pofile('main.po')

for entry in po:

    client = contentful_management.Client('CFPAT-_QLbCxDyhpTnTR2FFvUSqrly5QCZxfHQzzNCDQdzroE')

    entry_id = next(id_entry)  # Use `None` if you want the API to autogenerate the ID.

    entry = client.entries('orl9epj4q4ul', 'master').create(entry_id, {
        'content_type_id': 'main',
        "fields": {
            "msgid": {
                "en-US": entry.msgid
            },
            "msgstr": {
                "en-US": entry.msgstr
            }
        }   
    })
    entry.publish()
