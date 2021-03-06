# Initial Planning Document

Some things were changed in the actual implementation

## React Frontend

### URL Routes:

1. /  
   This is the main landing page of the app. Show the Navbar, the animation, the paragraph of text explaining the app, and the footer. Include a "Get Started" button after the paragraph.
2. /posts  
   This is the page where the user creates posts, and manages existing posts. Show the Navbar, The users existing posts, and a button to create a post.

### React Components:

1. [Navbar](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/react-frontend/src/components/Navbar.tsx)

   - Left side contains name of app \(tbd\).
   - Clicking on left side redirects to the landing page.
   - Right Side contains "Sign in with Google" button if not signed in.
   - Right Side contains user's display name and profile picture in a box if signed in. When this box is clicked, "Sign out" button drops down.
   - If the user is signed in and on the lading page, clicking the box causes the "My Posts" option to drop down in addition to the "Sign out", which redirects the user to their posts.

2. [ClassroomAnimation](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/react-frontend/src/components/ClassroomAnimation.tsx)

   - The SVG animation which is meant to look like the Google Classroom UI.

3. [DescriptionParagraph](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/react-frontend/src/components/DescriptionParagraph.tsx)

   - Paragraph containing brief desription of the app and its functions. "Get Started" button is below the paragraph.

4. Footer

   - Contains copyright of the website.

5. [Post](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/react-frontend/src/components/Announcement.tsx)

   - Shows the information returned from the /posts backend route in a clean, organized way.
   - Contains the title of the post and a different icon based on if the post is an announcement or a question.
   - When this component is clicked, it changes into the CreateAnnouncement component or the CreateQuestion component based on what type it is.

6. [CreateAnnouncement](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/react-frontend/src/components/CreateAnnouncement.tsx)

   - Contains required title field, which turns red and shows error message if left blank. This title is not shown on Google Classroom, but is show on this app.
   - Contains required text field, titled "Announce something to your class", which turns red and shows error message if left blank.
   - Contains the PostOptions component below the text field.

7. [CreateQuestion](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/react-frontend/src/components/CreateQuestion.tsx)

   - Contians required title field, which turns red and shows error message if left blank. This title is displayed on Google Classroom.
   - Contains optional description field.
   - Contains menu to choose between multiple choice and short answer question.
   - If multiple choice question is selected, users can add and remove multiple choice options.
   - Contians field for Due Date, which can be none, custom, or date of posting.
   - Contians field for Due Time, which must be specified if Due Date is not none.
   - Contains field for Topic, which is optional.

8. [PostOptions](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/react-frontend/src/components/PostOptions.tsx)

   - Contains checkboxes for all of the user's classes.
   - Contians a field to select the schedule for posting the post, in the form on: \[days\] at \[time\].
   - Contians a field to select the day with options of "every day", "every weekday", or "custom" which shows a list of checkboxes for every day of the week.
   - Contains a time input to select the time that the post is posted.

9. AddDate

   - Used for adding dates to automated posts. For example, making the title of each question be that day's date.
   - Contains checkbox with lable "Use a date".
   - If checkbox is clicked, show drop down of different date formats such as dayofweek-month-day, month-day, month-day-year, dayofweek-month-day-year.
   - Under the selected option is an example of how that option would look. For example if dayofweek-month-day is selected, "Monday, May 3rd" is displayed.

10. [Home](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/react-frontend/src/components/Home.tsx)

- Wraps all of the components that are shown on the / url.
- Centers all of the content horizontally.

11. [Posts](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/react-frontend/src/components/Posts.tsx)

- Wraps all of the components that are shown on the /posts url.
- Manages requests to the backend.
- Contains button for user to create a new post which drops down a menu with options of Announcement and Assignment.
- Manages turning Post components into CreateAnnouncement or CreateQuestion components when the post is clicked.
- If the user has no courses, display a message that tells them to make one before creating any posts.

## Node Backend

### Structure:

- Express Router for api routes for managing posts and makes GET requests to Google Classroom.
- Node-schedule service for reading the database and making POST requests to Google Classroom.
- The Express routes write to and read from the database and the node-schedule service reads from the database and uses that data to make requests to the Google Classroo API.

### Postgres Tables:

1. [Users](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/node-backend/sql/users.sql)
   - id - the Google id of the user
   - refresh_token - the refresh token that is obtained when the user signs in.
2. [Sessions](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/node-backend/sql/sessions.sql)
   - stores the sessions and is automatically managed with the connect-pg-simple and express-session npm packages.
3. [Announcements](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/node-backend/sql/annoucements.sql)
   - announcement_id - primary key unique identifier of the announcement.
   - user_id - foreign key Google id of the user who posts tbe announcement.
   - course_ids - array of courseids for the courses that the announcement is posted to
   - title - the title of the annoucement only used in the app, not in Google Classroom.
   - announcement_text - the text of the announcement.
   - scheduled_time - time to post the announcement. Stored as VARCHAR\(5\) in form hh:mm.
   - posting_days - days of the week to post the question. Stored as array of VARCHAR\(3\).
4. [Short_Answer_Questions](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/node-backend/sql/short_answer_questions.sql)
   - question_id - primary key unique identifier of the announcement.
   - user_id - foreign key Google id of the user who posts tbe announcement.
   - course_ids - array of courseids for the courses that the announcement is posted to
   - topic_id - id of the topic to post the question to. It is nullable.
   - title - the title of the question used on Google Classroom.
   - description - the description of the question. It is nullable.
   - posting_days - days of the week to post the question. Stored as array of VARCHAR\(3\).
   - scheduled_time - time to post the question. Stored as VARCHAR\(5\) in form hh:mm.
   - due_date - date to post the question. Stored as VARCHAR\(10\) in form yyyy-mm-dd or "DAY-POSTED". It is nullable if due_time is nullable.
   - due_time - time to post the question. Stored as VARCHAR\(5\) in form hh:mm. It is nullable if due_date is nullable.
   - submission_modification_mode - decides if answers can be modified after submitting. It is nullable.
   - max_points - maximum number of points that are possible to receive. It is nullable.
5. [Multiple_Choice_Questions](https://github.com/MatthewGreenspun/Automate-Google-Classroom/blob/main/node-backend/sql/multiple_choice_questions.sql)
   - question_id - primary key unique identifier of the announcement.
   - user_id - foreign key Google id of the user who posts tbe announcement.
   - course_ids - array of courseids for the courses that the announcement is posted to
   - topic_id - id of the topic to post the question to. It is nullable.
   - title - the title of the question used on Google Classroom.
   - description - the description of the question. It is nullable.
   - posting_days - days of the week to post the question. Stored as array of VARCHAR\(3\).
   - scheduled_time - time to post the question. Stored as VARCHAR\(5\) in form hh:mm.
   - due_date - date to post the question. Stored as VARCHAR\(10\) in form yyyy-mm-dd or "DAY-POSTED". It is nullable if due_time is nullable.
   - due_time - time to opst the question. Stored as VARCHAR\(5\) in form hh:mm. It is nullable if due_date is nullable.
   - submission_modification_mode - decides if answers can be modified after submitting. It is nullable.
   - max_points - maximum number of points that are possible to receive. It is nullable.
   - choices - array of possible choices for the question.

### URL Routes:

1. /login

   - Uses passport.authenticate method with Google strategy which redirects user to the sign in with google oauth page, where they can select their google accound.
   - Scopes are profile, email, classroom announcements, classroom courses, classroom coursework.
   - Google redirects users to /posts route after user signs in.

2. /posts
   - Uses passport.authenticate method to make sure that the user accessing the route is authenticated.
   - Queries all the information from the Announcements, Short_Answer_Questions, and Multiple_Choice_Questions tables and sends it to the frontend.
