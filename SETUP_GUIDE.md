# Setup Guide: Form Backend & Analytics Configuration

This guide will help you configure the form backend (Formspree) and Google Analytics tracking for your website.

## 1. Form Backend Setup (Formspree)

### Step 1: Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create a New Form
1. In your Formspree dashboard, click "New Form"
2. Give your form a name (e.g., "Joon Kim Contact Form")
3. Copy the form ID (it will look like `xrgjabrg`)

### Step 3: Update the Form Action
1. Open `contact.html`
2. Find this line:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID
4. Example: `action="https://formspree.io/f/xrgjabrg"`

### Step 4: Test the Form
1. Upload your updated files to your web server
2. Fill out and submit the contact form
3. Check your Formspree dashboard to see if the submission was received
4. Check your email for the form submission notification

## 2. Google Analytics Setup

### Step 1: Create Google Analytics Account
1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. Click "Start measuring"
4. Follow the setup wizard to create your account and property

### Step 2: Get Your Measurement ID
1. In your Google Analytics dashboard, go to Admin (gear icon)
2. Under "Property", click "Data Streams"
3. Click on your web stream
4. Copy the Measurement ID (it will look like `G-XXXXXXXXXX`)

### Step 3: Update Analytics Code
1. Open all HTML files (`index.html`, `services.html`, `about.html`, `contact.html`)
2. Find this line in each file:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```
3. Replace `GA_MEASUREMENT_ID` with your actual Measurement ID
4. Also update this line:
   ```html
   gtag('config', 'GA_MEASUREMENT_ID');
   ```
5. Example: `gtag('config', 'G-XXXXXXXXXX');`

### Step 4: Verify Analytics
1. Upload your updated files to your web server
2. Visit your website
3. Go to Google Analytics Real-Time reports
4. You should see your visit being tracked

## 3. Enhanced Analytics Events

The website now tracks the following events automatically:

### Page Views
- Tracks when users visit each page
- Includes page title and URL

### Navigation Clicks
- Tracks when users click navigation links
- Helps understand which pages are most popular

### CTA Button Clicks
- Tracks when users click call-to-action buttons
- Helps measure conversion effectiveness

### Service Card Interactions
- Tracks when users click on service cards
- Helps understand which services generate most interest

### Form Interactions
- **Form Submission**: When users submit the contact form
- **Form Success**: When form submission is successful
- **Form Error**: When form submission fails

## 4. Analytics Dashboard Setup

### Recommended Google Analytics Reports
1. **Audience Overview**: See total visitors and page views
2. **Behavior Flow**: Understand how users navigate your site
3. **Events**: View all tracked interactions
4. **Conversions**: Set up goals for form submissions

### Setting Up Goals
1. In Google Analytics, go to Admin → Goals
2. Create a new goal for "Contact Form Submission"
3. Set the goal type to "Event"
4. Configure it to track the "form_success" event

## 5. Formspree Features

### Email Notifications
- You'll receive an email for each form submission
- Includes all form data in a structured format

### Spam Protection
- Formspree includes built-in spam filtering
- Suspicious submissions are automatically flagged

### Form Analytics
- View submission statistics in your Formspree dashboard
- See which fields are most commonly filled out

## 6. Testing Checklist

Before going live, test the following:

### Form Functionality
- [ ] Form submits successfully
- [ ] You receive email notifications
- [ ] Form validation works (required fields, email format)
- [ ] Success/error messages display correctly
- [ ] Form resets after successful submission

### Analytics Tracking
- [ ] Page views are tracked in Google Analytics
- [ ] Navigation clicks are recorded
- [ ] CTA button clicks are tracked
- [ ] Form submissions are tracked
- [ ] Events appear in Google Analytics Real-Time reports

### Mobile Responsiveness
- [ ] Form works correctly on mobile devices
- [ ] Analytics tracking works on mobile
- [ ] All interactive elements are touch-friendly

## 7. Troubleshooting

### Form Not Working
- Check that your Formspree form ID is correct
- Verify your Formspree account is active
- Check browser console for JavaScript errors

### Analytics Not Tracking
- Verify your Measurement ID is correct
- Check that the gtag script is loading (browser network tab)
- Ensure you're not blocking analytics with ad blockers

### Email Notifications Not Received
- Check your spam folder
- Verify your email address in Formspree settings
- Check Formspree dashboard for submission status

## 8. Privacy Considerations

### GDPR Compliance
- Consider adding a privacy policy page
- Inform users about analytics tracking
- Provide opt-out options if required

### Cookie Consent
- Consider adding a cookie consent banner
- Inform users about tracking cookies
- Provide clear opt-out mechanisms

## 9. Performance Monitoring

### Regular Checks
- Monitor form submission rates
- Track analytics for unusual patterns
- Check for broken links or functionality

### Monthly Review
- Review analytics reports
- Analyze form submission quality
- Identify areas for improvement

---

**Need Help?** If you encounter any issues during setup, refer to:
- [Formspree Documentation](https://formspree.io/docs/)
- [Google Analytics Help Center](https://support.google.com/analytics/)
- Your web developer for technical assistance 