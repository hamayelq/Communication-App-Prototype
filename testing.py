from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep
import string
import random

testIDs = ["Hamayel", "Gang", "Secretspy", "Masterchef", "Pinnocio", "Drumpf"]

driver = webdriver.Chrome(
    executable_path="C:/Users/Hamayel/Desktop/chromedriver.exe")


def generateRandomLength():
    randLength = random.randrange(3, 20)
    return randLength


def generateRandomString():
    randString = ''.join(random.choices(
        string.ascii_uppercase + string.ascii_lowercase + string.digits, k=generateRandomLength()))
    return randString


for index, ID in enumerate(testIDs):
    driver.get('localhost:3000/')
    sleep(1)

    # try putting name in
    try:
        username = driver.find_element_by_id('nameInput')
        username.click()
        username.send_keys(ID)
        sleep(0.5)
        print(ID + " username enter succesful")
    except:
        print(ID + " username enter fail, ending test")
        continue

    # try putting room in
    try:
        room = driver.find_element_by_id('roomInput')
        room.click()
        room.send_keys("Test")
        sleep(0.5)
        print(ID + " succesfully entered room name ")
    except:
        print(ID + " room enter fail, ending test")
        continue

    # try signing in to room
    try:
        signIn = driver.find_element_by_id("signIn")
        signIn.click()
        sleep(2)
        print(ID + " signed in succesfully")
    except:
        print("Sign in failed, ending test")

    # try sending random string messages 10 times
    for i in range(0, 10):
        randString = generateRandomString()
        try:
            textInput = driver.find_element_by_id("chat-box")
            textInput.click()
            sleep(0.1)
            textInput.send_keys(randString)
            sleep(0.1)
            textInput.send_keys(Keys.ENTER)
            print(ID + " sent message: " + randString)
        except:
            print(ID + "failed to send message: " + randString + " ending test")
            pass

    if (index > 0):
        try:
            textInput = driver.find_element_by_id("chat-box")
            textInput.click()
            sleep(0.1)
            textInput.send_keys(
                "/whisper " + testIDs[index - 1] + " test whisper ")
            sleep(0.1)
            textInput.send_keys(Keys.ENTER)
            print(ID + "whispered succesfully")
        except:
            print(ID + "failed to whisper :(")
            continue

    print("Tests for user " + ID + " completed succesfully")

    if index == 5:
        try:
            closeIcon = driver.find_element_by_id("close-button")
            closeIcon.click()
            print(ID + " closed out of chat. Test completed and succesful.")
        except:
            print(ID + " failed to close out of chat. Ending test.")
            pass
        print("All tests completed succesfully")


driver.quit()
