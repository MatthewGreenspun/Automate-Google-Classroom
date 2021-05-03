# Automate Google Classroom App

This is a web app that allows users to schedule automatic posting of repeated Google Classroom questions. For example, posting an attendance question on every Monday, Wednesday, and Thursday, which is currently not supported on Google Classroom.

## React Frontend

### URL Routes:

1. /  
   This is the main landing page of the app. Show the Navbar, the animation, the paragraph of text explaining the app, and the footer. Include a "Get Started" button after the paragraph.
2. /posts  
   This is the page where the user creates posts, and manages existing posts. Show the Navbar, The users existing posts, and a button to create a post.

### React Components:

1. Navbar

   - Left side contains name of app\(tbd\).
   - Clicking on left side redirects to the landing page.
   - Right Side contains "Sign in with Google" button if not signed in.
   - Right Side contains user's display name and profile picture in a box if signed in. When this box is clicked, "Sign out" button drops down.
   - If the user is signed in and on the lading page, clicking the box causes the "My Posts" option to drop down in addition to the "Sign out", which redirects the user to their posts.

2. ClassroomAnimation

   - The SVG animation which is meant to look like the Google Classroom UI.

3. DescriptionParagraph

   - Paragraph containing brief desription of the app and its functions. "Get Started" button is below the paragraph.

4. Footer

   - Contains copyright of website.

5. CreateAnnouncement

   - Contains required title field, which turns red and shows error message if left blank. This title is not shown on Google Classroom, but is show on this app.
   - Contains required text field, titled "Announce something to your class", which turns red and shows error message if left blank.
   - Contains the PostOptions component below the text field.

6. CreateQuestion

   - Contians required title field, which turns red and shows error message if left blank. This title is displayed on Google Classroom.
   - Contains optional description field.
   - Contains menu to choose between multiple choice and short answer question.
   - If multiple choice question is selected, users can add and remove multiple choice options.
   - Contians field for Due date, which can be none, custom, or date of posting.

7. PostOptions

   - Contains checkboxes for all of the user's classes.
   - Contians a field to select the schedule for posting the post, in the form on: \[days\] at \[time\].
   - Contians a field to select the day with options of "every day", "every weekday", or "custom" which shows a list of checkboxes for every day of the week.
   - Contains a time input to select the time that the post is posted.

8. AddDate

   - Used for adding dates to automated posts. For example, making the title of each question be that day's date.
   - Contains checkbox with lable "Use a date".
   - If checkbox is clicked, show drop down of different date formats such as dayofweek-month-day, month-day, month-day-year, dayofweek-month-day-year.
   - Under the selected option is an example of how that option would look. For example if dayofweek-month-day is selected, "Monday, May 3rd" is displayed.

## Node Backend

### Structure:

- Express Router for api routes for managing posts and makes GET requests to Google Classroom.
- Node-schedule service for reading the database and making POST requests to Google Classroom.
- The Express routes write to and read from the database and the node-schedule service reads from the database and uses that data to make requests to the Google Classroo API.

### Postgres Tables:

1. Users
   - id - the Google id of the user
   - refresh_token - the refresh token that is obtained when the user signs in.
2. Sessions
   - stores the sessions and is automatically managed with the connect-pg-simple and express-session npm packages.
3. Announcements
   - announcement_id - primary key unique identifier of the announcement.
   - user_id - foreign key Google id of the user who posts tbe announcement.
   - course_ids - array of courseids for the courses that the announcement is posted to
   - title - the title of the annoucement only used in the app, not in Google Classroom.
   - announcement_text - the text of the announcement.
   - scheduled_time - time to post the announcement.

### URL Routes:

1. /login

   - Uses passport.authenticate method with Google strategy which redirects user to the sign in with google oauth page, where they can select their google accound.
   - Scopes are profile, email, classroom announcements, classroom courses, classroom coursework.
   - Google redirects users to /posts route after user signs in.
