# task-rahul
A Django + React based contact management app.

# App-Login Credentials
 Username: rahul
 Password: rahul123

# This project comprises of Three parts:

contacts: the Django project containing the REST API, along with all the back-end database code;
core: the Django project that deals with the User Authentication and token validation for login.
frontend: the React webpacks project, with all Node dependencies, configs, and front-end codes.

# Running it locally
In order to run the projects locally, it is needed to have installed Node, npm and Python on your machine.

# Running the backend project
Make sure you have python3 installed in your machine.

# First, let's create the python virtual environment to isolate our projects:

On Linux:

python3 -m venv environments

Then, activate it:

source environments/bin/activate

On Windows(Check pip is installed, generally comes with python3):

pip install virtualenv
virtualenv env

   On Windows, virtualenv (venv) creates a batch file called 
      
      \env\Scripts\activate.bat

   To activate virtualenv on Windows, and activate the script is in the Scripts folder :
          
          \pathto\env\Scripts\activate
    
   Example: C:\Users\'Username'\venv\Scripts\activate.bat

   Install VirtualEnvWrapper-win
    
           git clone git://github.com/davidmarble/virtualenvwrapper-win.git
   
   We then cd to the virtualenvwrapper-win folder and run: 
          
          python setup.py install  

# After virtual environment for python project is setup:
We can clone the project from GitHub. So, cd into the venv and run:
        
        git clone https://github.com/rahulsups/task-rahul.git

# Now, we need to add the Djano dependencies:

        pip install django
        djangorestframework
        djangorestframework-jwt
        django-cors-headers

# Now, we run the project. For this, cd into the task-rahul folder and run:
        python manage.py runserver
That's it. We can now access the address http://localhost:8000/api/contacts/ and check for the API up and running.

# Running the React project
First, cd the frontend directory and run:
         
        npm install

Then, we just need to run the app via:

        npm start

Hope you liked it!
