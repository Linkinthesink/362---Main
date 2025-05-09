import json
import os
import time

currentGroup = "TestGroup"
currentPage = -1

userData = {
    "userName": "",
    "userPassword": "",
    "groups": [],

}
file = "userInfo.json"

def initiate_userinfo():
    with open(file, 'w') as json_file:
        dumpData = userData
        dumpData.update({"groups": [[currentGroup, currentPage]]})
        json.dump(dumpData, json_file)
        json_file.close()
        time.sleep(1)



def get_current_page(readGroup):
    if not os.path.exists(file):
        initiate_userinfo()
    time.sleep(2)
    print("getting current page")
    groupInfo = None
    with open(file, 'r', encoding='utf-8') as jsonFile:
        info = json.loads(jsonFile.read())
        print(info)
        groupInfo = info.get('groups')

    if groupInfo == []:
        return -1
    for group in groupInfo:
        if readGroup == group[0]:
            return group[1]



#print(get_current_page("TestGroup"))

initiate_userinfo()
def update_current_page(readGroup):
    global currentPage
    currentPage = 100
    userInfo = None
    with open(file, 'r', encoding='utf-8') as jsonFile:
        userInfo = json.load(jsonFile)
        jsonFile.close()
    currentGroups = userInfo.get('groups')
    if currentGroups == []:
        userInfo.update({"groups": [readGroup, currentPage]})
    else:
        groupFound = False
        for group in currentGroups:
            print(group[0], readGroup[0])
            if group[0] == readGroup:
                groupFound = True
                group[1] = currentPage
                userInfo.update({"groups": currentGroups})
        if not groupFound:
            userInfo.update({"groups": currentGroups + [readGroup, currentPage]})

    with open(file, 'w') as json_file:
        json.dump(userInfo, json_file)
        json_file.close()
        time.sleep(1)



print(update_current_page("TestGroup"))