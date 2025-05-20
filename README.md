Starting project for cs 362 :)



The main program in "FileService.py" has 2 main functoins
get_all_files and get_file_by_name

Requesting Data
	get_all_files:
	Is called when a GET request is sento the the Flask program's address at '/getall'
	this function reads all the files contained in the "FileDirectory" as defined in the .env file
	additoinally it reads a file's decription from the "DescriptoinFile" also defined in the .env file
	(note that the DescriptionFile must be a JSON file)
	The functoin then returns an array with the Filename Description pairs. (Descriptoin defaults to the
	filename if none is provided)
	
	get_file_by_name:
	Is called when a GET request with a "?Filename=<file's name>" queary is made to the '/getone' adress. 
	The function returns the requested file using the Flask send_file functoin or '404' if there is no found file. 
	
	Example Calls:
	http://<Flask ip>/getall
	will return a list of files and decriptions. 
	
	http://<Flask ip>/getone?Filename=test.txt
	will return the file test.txt
	
Reciving Data
	get_all_files:
	returns a JSON array with Filename, Descriptoin Pairs
	
	get_file_by_name:
	returns the file requested using the send_file function. the Filename parameter from get_all_files can be used here. 
	




[![Image](https://github.com/user-attachments/assets/0e63f105-f98f-4b63-8281-afcb767dfdd3)]
