# To Do App

 - Made with : React js
 - For Designing : React Material UI
## Development Document

The app has the following components:

 - Login: To login the user in the task app. - `/login`
 - SignUp: To register a user for the task app. - `/signup`
 - ToDo: To create and View the ToDo List. - `/listform`
 - UserInfo : To view the list of users registered. Only Accessible to Admin. - `/userlist`
 - Header : It is a reusable component, used in every other components.

The app uses stored JWT token in the cookies to create a login session.
In conifg.js where the baseUrl for the back end can be configured.

Constraints: 

 - The user cannot access the `/listform` and `/userlist` unless they are logged in.
 - The user cannot access the `/login` and `/signup` while they are logged in.
 - Non-admin user cannot access `/listform`
 
