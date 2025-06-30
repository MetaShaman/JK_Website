# Setup Guide: Google Forms Backend, Calendly Integration & Analytics Configuration

This guide will help you configure the form backend (Google Forms), Calendly scheduling integration, and Google Analytics tracking for your website.

## 1. Form Backend Setup (Google Forms)

### Step 1: Create Google Forms
1. Go to [forms.google.com](https://forms.google.com)
2. Sign in with your Google account
3. Click the "+" button to create a new form
4. Give your form a title (e.g., "Joon Kim - Land Stewardship Consultation Request")

### Step 2: Add Form Questions
Add the following questions to your Google Form:

1. **Name** (Short answer, Required)
2. **Email** (Short answer, Required)
3. **Phone** (Short answer, Optional)
4. **Land Location** (Short answer, Optional)
5. **Land Size** (Multiple choice, Optional)
   - Under 1 acre
   - 1-5 acres
   - 5-10 acres
   - 10+ acres
6. **Services of Interest** (Checkboxes, Optional)
   - Structural Repairs & Maintenance
   - Landscape & Garden Projects
   - Design Support & Implementation
   - Project Tracking & Oversight
   - Regulatory Compliance & Permitting
7. **Project Timeline** (Multiple choice, Optional)
   - Immediate (within 1 month)
   - Short-term (1-3 months)
   - Medium-term (3-6 months)
   - Long-term (6+ months)
   - Ongoing stewardship
8. **Message** (Paragraph, Required)

### Step 3: Get Form Entry IDs
1. In your Google Form, click the "Send" button
2. Click the "Link" tab
3. Copy the form URL (it will look like `https://docs.google.com/forms/d/1ABC123DEF456/viewform`)
4. Extract the form ID from the URL (the part between `/d/` and `/viewform`)
5. For each question, you need to get the entry ID:
   - Right-click on each question and select "Inspect"
   - Look for `entry.` followed by numbers in the HTML
   - Note down each entry ID

### Step 4: Update the Form Action
1. Open `contact.html`
2. Find this line:
   ```html
   <form id="contactForm" action="https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse" method="POST" target="hidden_iframe">
   ```
3. Replace `YOUR_ACTUAL_FORM_ID` with your actual Google Form ID
4. Example: `action="https://docs.google.com/forms/d/e/1FAIpQLSf1ABC123DEF456/formResponse"`

### Step 5: Update Entry IDs
Replace the placeholder entry IDs in `contact.html` with your actual entry IDs:

```html
<!-- Replace these with your actual entry IDs -->
<input type="text" name="entry.YOUR_NAME_ENTRY_ID" required>      <!-- Name -->
<input type="email" name="entry.YOUR_EMAIL_ENTRY_ID" required>   <!-- Email -->
<input type="tel" name="entry.YOUR_PHONE_ENTRY_ID">              <!-- Phone -->
<input type="text" name="entry.YOUR_LOCATION_ENTRY_ID">          <!-- Land Location -->
<select name="entry.YOUR_SIZE_ENTRY_ID">                         <!-- Land Size -->
<input type="checkbox" name="entry.YOUR_SERVICES_ENTRY_ID">      <!-- Services -->
<select name="entry.YOUR_TIMELINE_ENTRY_ID">                     <!-- Timeline -->
<textarea name="entry.YOUR_MESSAGE_ENTRY_ID" required>           <!-- Message -->
```

### Step 6: Configure Form Settings
1. In your Google Form, click the settings icon (gear)
2. Enable "Collect email addresses" if you want to collect respondent emails
3. Enable "Limit to 1 response" if you want to prevent spam
4. Click "Responses" tab to view submissions

### Step 7: Set Up Email Notifications
1. In your Google Form, click the "Responses" tab
2. Click the three dots menu (⋮)
3. Select "Get email notifications for new responses"
4. Enter your email address (ivanjoonkim@gmail.com)
5. Choose notification frequency (immediate, daily, or weekly)

### Step 8: Test the Form
1. Upload your updated files to your web server
2. Fill out and submit the contact form
3. Check your Google Form responses tab
4. Check your email for the form submission notification

## 2. Calendly Integration Setup

### Step 1: Create Calendly Account
1. Go to [calendly.com](https://calendly.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Consultation Event Type
1. In your Calendly dashboard, click "Create" → "Event Type"
2. Choose "One-on-One" event type
3. Configure the event:
   - **Name**: "Land Stewardship Consultation"
   - **Duration**: 30 minutes
   - **Description**: "Complimentary consultation to discuss your land stewardship needs and explore how I can help you achieve your goals."
   - **Location**: Video call (Zoom/Google Meet)
   - **Calendar**: Connect your Google Calendar

### Step 3: Customize Event Settings
1. **Scheduling**: Set your available hours (e.g., 9 AM - 5 PM, Monday-Friday)
2. **Buffer Time**: Add 15 minutes before/after if needed
3. **Advance Notice**: Require 2 hours advance notice
4. **Cancellation**: Allow cancellation up to 2 hours before
5. **Questions**: Add custom questions:
   - "What type of land do you have?" (Short answer)
   - "What are your main challenges?" (Short answer)
   - "Preferred contact method?" (Multiple choice: Email, Phone, Video)

### Step 4: Get Calendly Link
1. In your event type settings, click "Share"
2. Copy the event link (looks like: `https://calendly.com/yourusername/consultation`)
3. Note your Calendly username (the part after `calendly.com/`)

### Step 5: Update Website with Calendly
1. Open `contact.html`
2. Find this line:
   ```html
   <div class="calendly-inline-widget" data-url="https://calendly.com/YOUR_CALENDLY_USERNAME/consultation" style="min-width:320px;height:700px;"></div>
   ```
3. Replace `YOUR_CALENDLY_USERNAME` with your actual Calendly username
4. Replace `consultation` with your actual event type slug

### Step 6: Test Calendly Integration
1. Upload your updated files to your web server
2. Visit the contact page
3. Click on the Calendly widget
4. Test the booking flow
5. Verify that events appear in your calendar

## 3. Google Analytics Setup

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

## 4. Enhanced Analytics Events

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

### Calendly Interactions
- **Calendly Widget Load**: When the scheduling widget loads
- **Booking Initiated**: When users start the booking process

## 5. Analytics Dashboard Setup

### Recommended Google Analytics Reports
1. **Audience Overview**: See total visitors and page views
2. **Behavior Flow**: Understand how users navigate your site
3. **Events**: View all tracked interactions
4. **Conversions**: Set up goals for form submissions and bookings

### Setting Up Goals
1. In Google Analytics, go to Admin → Goals
2. Create a new goal for "Contact Form Submission"
3. Set the goal type to "Event"
4. Configure it to track the "form_success" event
5. Create another goal for "Consultation Booking"
6. Set the goal type to "Event"
7. Configure it to track Calendly booking events

## 6. Google Forms Features

### Email Notifications
- You'll receive an email for each form submission
- Includes all form data in a structured format
- Can be configured for immediate, daily, or weekly notifications

### Response Management
- View all submissions in the Google Forms dashboard
- Export responses to Google Sheets
- Download responses as CSV files

### Spam Protection
- Google Forms includes built-in spam protection
- Can limit responses to one per person
- Can require Google account sign-in

### Form Analytics
- View response statistics in your Google Forms dashboard
- See which questions are most commonly answered
- Track form completion rates

## 7. Calendly Features

### Automated Scheduling
- Clients can book consultations 24/7
- Automatic calendar integration
- Time zone handling
- Buffer time management

### Customization Options
- Branded scheduling pages
- Custom questions for clients
- Multiple event types
- Team scheduling

### Integration Benefits
- Seamless booking experience
- Reduced back-and-forth emails
- Professional presentation
- Mobile-friendly interface

## 8. Testing Checklist

Before going live, test the following:

### Form Functionality
- [ ] Form submits successfully to Google Forms
- [ ] You receive email notifications
- [ ] Form validation works (required fields, email format)
- [ ] Success messages display correctly
- [ ] Form resets after successful submission

### Calendly Integration
- [ ] Calendly widget loads correctly
- [ ] Users can select available time slots
- [ ] Booking flow works smoothly
- [ ] Events appear in your calendar
- [ ] Email confirmations are sent

### Analytics Tracking
- [ ] Page views are tracked in Google Analytics
- [ ] Navigation clicks are recorded
- [ ] CTA button clicks are tracked
- [ ] Form submissions are tracked
- [ ] Calendly interactions are tracked
- [ ] Events appear in Google Analytics Real-Time reports

### Mobile Responsiveness
- [ ] Form works correctly on mobile devices
- [ ] Calendly widget is mobile-friendly
- [ ] Analytics tracking works on mobile
- [ ] All interactive elements are touch-friendly

## 9. Troubleshooting

### Form Not Working
- Check that your Google Form ID is correct
- Verify that entry IDs match your form questions
- Check browser console for JavaScript errors
- Ensure the form action URL is correct

### Calendly Not Loading
- Verify your Calendly username is correct
- Check that the event type slug matches
- Ensure Calendly scripts are loading
- Check browser console for errors

### Analytics Not Tracking
- Verify your Measurement ID is correct
- Check that the gtag script is loading (browser network tab)
- Ensure you're not blocking analytics with ad blockers

### Email Notifications Not Received
- Check your spam folder
- Verify email notification settings in Google Forms
- Check Google Form responses tab for submissions
- Verify Calendly email settings

## 10. Privacy Considerations

### GDPR Compliance
- Consider adding a privacy policy page
- Inform users about analytics tracking
- Provide opt-out options if required

### Cookie Consent
- Consider adding a cookie consent banner
- Inform users about tracking cookies
- Provide clear opt-out mechanisms

## 11. Performance Monitoring

### Regular Checks
- Monitor form submission rates
- Track consultation booking rates
- Monitor analytics for unusual patterns
- Check for broken links or functionality

### Monthly Review
- Review analytics reports
- Analyze form submission quality
- Review consultation conversion rates
- Identify areas for improvement

---

**Need Help?** If you encounter any issues during setup, refer to:
- [Google Forms Help Center](https://support.google.com/forms/)
- [Calendly Help Center](https://help.calendly.com/)
- [Google Analytics Help Center](https://support.google.com/analytics/)
- Your web developer for technical assistance 