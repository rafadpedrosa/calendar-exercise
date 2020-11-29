<template>
    <div class="home offset-lg-2 col-lg-8 offset-md-1 col-md-10 text-justify">
        <div class="text-center">
            <img alt="Vue logo" src="../assets/logo.png">
            <h3>Front-end Javascript Challenge</h3>
            <h4>Description</h4>
        </div>

        <p >This project is designed to test your knowledge of front-end web technologies and assess your
        ability to create front-end UI products with attention to details, cross-browser compatibility,
        standards, and reusability.
        Assignment
        The goal of this exercise is to create a demo calendar application using React, Vue or Angular.
        You should start by rendering a single month view of a calendar for the current month – along
        with the lines of the below illustration:
        </p>

        <h4>Assignment</h4>
        <p>The goal of this exercise is to create a demo calendar application using React, Vue or Angular. <br>
        You should start by rendering a single month view of a calendar for the current month – along
        with the lines of the below illustration:</p>

        <img alt="Vue logo" style="width: 100%;" src="../assets/calendar.png">

        <h4>Mandatory Features</h4>
        <hr>
        <p class="text-success">● Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also,
            include a city.</p>
        <p class="text-success">● Display reminders on the calendar view in the correct time order.</p>
        <p class="text-success">● Allow the user to select color when creating a reminder and display it appropriately.</p>
        <p class="text-success">● Ability to edit reminders – including changing text, city, day, time and color.</p>
        <p class="text-danger">● Add a weather service call from a free API such as Open Weather Map, and get the
        weather forecast (ex. Rain) for the date of the calendar reminder based on the city.</p>
        <p class="text-info">● Unit test the functionality: Ability to add a new "reminder" (max 30 chars) for a user</p>
        entered day and time. Also, include a city.
        <h4>Bonus (Optional)</h4>
        <hr>
        <p class="text-success" >● Expand the calendar to support more than the current month.</p>
        <p class="text-danger">● Properly handle overflow when multiple reminders appear on the same date.</p>
        <p  class="text-info">● Functionality to delete one or ALL the reminders for a specific day</p>
        <h4>Considerations</h4>
        <hr>
        <p class="text-success">● Redux (or any other state manager) structure of the calendar.</p>
        <p class="text-success">● The project is totally focused on the front-end; please ignore the back-end.</p>
        <p class="text-success">● Keep your code versioned with Git.</p>
        <p class="text-success">● Feel free to use small helper libraries for:</p>
        <p class="text-success pl-4">○ UI Elements.</p>
        <p class="text-success pl-4">○ Date/Time handling.</p>
        <p class="text-success">● You must create the calendar component yourself. Do not use calendar libraries like
        FullCalendar or Bootstrap Calendar.</p>
        <p class="text-success">● If you use an external API, make sure to provide working API keys.</p>
        <h4>Deliverables</h4>
        <hr>
        When you finish the assignment, send a zip file (don’t forget to include the .git/ folder.) or upload
        your project to your Git repo (Github, BitBucket, etc...) and share the repository link with your
        initial contact via email. Indicate which, if any, of the bonus tasks you completed.
        If you didn’t manage to finish everything, please tell us which parts you completed.
    </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: 'Description',
}
</script>
