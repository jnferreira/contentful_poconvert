from contentful import Client
import contentful_management
import polib
from datetime import datetime
import numpy as np

client = Client(
  'orl9epj4q4ul',
  'zafYKWahCOHBW-wtptywTd74GR6BOoPKNlnnKH1Nzxc',
  environment='master'
)

entries_by_content_type = client.entries({'content_type': 'main', 'limit': 1000, 'order': 'sys.createdAt'})

now = datetime.now()

po = polib.POFile()
po.metadata = {
    'Project-Id-Version': '1.0',
    'Report-Msgid-Bugs-To': 'you@example.com',
    'POT-Creation-Date': now,
    'PO-Revision-Date': now,
    'Last-Translator': 'you <you@example.com>',
    'Language-Team': 'English <yourteam@example.com>',
    'Language': '\n',
    'MIME-Version': '1.0',
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Transfer-Encoding': '8bit',
}


for e in entries_by_content_type:
    print(e.msgid)
    print(e.msgstr)   
    entry = polib.POEntry(
        msgid=e.msgid,
        msgstr=e.msgstr
    )
    po.append(entry)

po.save('new.po')