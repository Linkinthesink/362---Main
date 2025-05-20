Microservice A Group 50

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
		
	
	
	

	![Image](https://github.com/user-attachments/assets/0e63f105-f98f-4b63-8281-afcb767dfdd3)



Communication Contract:


    How you will communicate with each other (Canvas? Teams? Discord?)
        Teams
        Fallback is Discord
        Each team member should check Teams daily to stay up-to-date.
    Expectations for responsiveness (e.g., within 24hrs)
        Within 24 hours
    When will a backup plan for microservices go into effect (e.g. if a team member has become unresponsive for over 72 hours)
        48 hours, with deadlines a week a part, people shouldn't wait more than 2 days to switch gears if necessary
    My fourth Ground Rule...
        Ask questions early and often to the team rather than waiting to ask several questions all at once, it'll be easier to help each other if we collaborate on one problem at a time earlier in the week rather than to address many problems later in the week.
    My fifth Ground Rule...
        For microservice A, the developing engineer should adhere to the interface given to them by the main engineer as much as possible. This will allow the main engineer to implement a stubbed service/object that is a stand in for the real thing until its developed. Changing function signatures, data structure interfaces will force the main engineer to either move slowly or repeat work they've already done to accommodate the interface that the microservice A engineer implemented. However, a conversation about modifying the interface is allowed (if not encouraged) when the developing engineer is struggling to understand the proposed interface.





Note that on the ExamplePage.html many browsers do not allow acess to local ip adresses for security reasons. Extentions such as Cross Domain - CORS can be used to disable such protectoins but be careful and re-enable all protections. 
 



