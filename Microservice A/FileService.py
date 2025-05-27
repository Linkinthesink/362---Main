from flask import Flask, send_file, request
from flask_cors import CORS, cross_origin
import os
from dotenv import load_dotenv
import json
app = Flask(__name__)
CORS(app)

app.config['CORS_ORIGINS'] = '127.0.0.1:5000' #configure as needed 
app.config['CORS_METHODS'] = ['GET']

load_dotenv()
workingDirectory = os.path.join(os.getcwd(), os.environ.get("FileDirectory"))
descriptionFile = os.environ.get("DescriptionFile")

fileCache = None #Use static descriptions filled here or load them from a json
fileList = os.listdir(workingDirectory)

def get_all_files():
    """
    Returns a list of all files in the working directory

    Returns: Array of dictionaries containing Filename, Description pairs
    """
    global workingDirectory
    global fileCache

    fileArr =[]
    files = os.listdir(workingDirectory)

    for file in files:
        filePair = None
        for item in fileCache:
            if file == item.get('Filename'):
                #serch through the cache array for descriptions
                filePair = {'Filename': file, 'Description': item.get('Description')}
                break
        if filePair == None:
            #defaults to filename if no description
            filePair = {'Filename': file, 'Description': str(file)[:-4]}

        fileArr.append(filePair)

    return fileArr

def get_file_by_name(filename):
    """
    Returns a file from the working directory
    :param filename: string name of the file
    :return: response code 200 if found 404 otherwise
    """
    returnFile = os.path.join(workingDirectory, filename)
    try:
        #send the file to the user
        returnVal = send_file(returnFile)
    except FileNotFoundError:
        #return error
        returnVal = "404"

    return returnVal

def updatecache():
    """
    Updates the cache that holds the Filename Description pairs
    """
    global fileCache
    global descriptionFile
    global fileList
    global workingDirectory

    #check if a new file has been added
    if fileList != os.listdir(workingDirectory):
        print("updating cache")
        fileList = os.listdir(workingDirectory)
    if fileCache is None:
        #reads the descriptions for the file form the descriptionFile
        with open(descriptionFile, "r") as file:
            fileCache = json.load(file)

    return

@app.route('/getall')
@cross_origin(origin='*', methods=['GET'])
def get_all():
    updatecache()
    return get_all_files()

@app.route('/getone')
@cross_origin(origin='*', methods=['GET'])
def get_one():
    updatecache()
    fileName = request.args.get('Filename')
    print(fileName)
    if fileName:
        return get_file_by_name(fileName)
    else:
        return "404"


if __name__ == '__main__':
    app.run()

