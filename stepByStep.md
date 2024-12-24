-first create-react-app
-setup tailwindCSS (https://tailwindcss.com/docs/guides/create-react-app)
-





# features to be built
Page 1: Login Page
Create a login page
Requirements:
● Email Validation: Ensure the email field is validated.
● Messages: Display appropriate messages for login success and failure.
● API Integration: Integrate with XANO for authentication.
● Redirection: Upon successful login, redirect the user to the Form Page.

Page 2: Forgot Password Page
Create a Forgot password page
Requirements:
● Functionality: Create a simple page for users to request a password reset. No API
integration required.
Page 3: Multi-Step Form with Progreh Progress Indicator
Requirements:
● Authentication: Only accessible to authenticated users.
● API Integration: Integrate with XANO to handle form data submission.
● Progress Indicator: Display a progress bar that updates as users complete each step.
Form Steps:
1. Basic Details:
○ Fields: User's Name, Email, and Phone Number
2. Address:
○ Fields: Address Line 1, Address Line 2, City, State, Pincode, Country
3. File Upload:
○ Allow users to upload one file (valid types: PNG, PDF)
4. Multi File Upload:
○ Allow users to upload multiple files (valid types: PNG, PDF; upload limit: 5 files)
○ Geolocation Status Field: Automatically record and display the user's geolocation
during this step.
5. Status:
○ Display a message indicating the success or failure of the form submission.

Guidelines
● Field Validation: Implement thorough validation for all form fields
● Phone Field: Include a dropdown for country codes with flags, defaulting to the Indian
flag.
● Responsiveness: Ensure the application is responsive across mobile, tablet, and
desktop devices.
● Design: Maintain a clean and minimal design throughout the application.
● User should be able to navigate back and forth between the form steps
Submission
● GitHub Repository: Submit your completed assignment through a GitHub URL.
● Form Submission: Fill out the submission form provided with the required details.
● Deployment: Please make sure the assignment is deployed on Netlify or Vercel
