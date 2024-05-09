# Burn It!

- HIIT Training App - UOP Web Pro 2024 Coursework.
- Setup the Database by running `npm setup`
- Start the script by running `npm start`

## Home Page

* An set of inputs at the top of the page denoting a name, working time, rest time and the number of sets.
* A save button that saves the workout to a database.
* Uses the home page to display all workouts the user has saved.
* There is no limit to the number of workouts the user has saved as the user is not expected to create a very large amount of workouts.
* Users may delete workouts from their list at any time by hitting the delete button.
* As the creation of workouts is simple, The edit button has been decided against as it would prove redundant.

## Workout Page

* The workout page consists of the workout displayed at the top, a timer for both rest and working time and a controls section.
* `Start`, `Stop` and `Pause` exist at the bottom of the timer which allow the user to control the starting, stopping and pausing of the workout. 
* If the workout is stopped it can no longer be started again and the user can only go back to the home page.
* If the user pauses the workout, it may be started again with the start button.
* There is a circular timer aswell as a text based timer that completes itself according to the percentage of time that has passed.
* Once the circle is completed, if there is more than 1 set, a rest period will begin and the user will be able to see this through the rest textbox.
* Once the workout is fully complete the user can hear an alarm sound playing, notifying them that the workout is complete.

## Granted more time:

* I underplanned with the start of my project and dove in without doing any prior research, this led me to create several first attempts that were far too problematic with their structure. 
* If i had planned better and put my ideas out id have been able to deliver more features that I had in mind aswell as further polish the features I have in place.
* If i had to do this again I would have revisited the planning phase and put all my ideas on paper with a proper timeline.
* Changed listing the workouts to use `<tspan>` instead of a list.

## Future Features

* More complex workouts, allowing for users to fully personalize the workout experience by adding fields such as intensity, type of workout and the nature of the users goal and including the estimate amount of calories burned in the workout.
* More audio cues to allow the user to know what to do without having to look directly at the screen.
* a Login page that allows users to personalize their accounts more securely.
* Badges for achievements made by the user.
* an Improved UI/UX.
* Possible interactions between users of the application allowing for a friends and leaderboard feature.

## Storage

* Workouts are saved using a database.
* The menu works using API routes to send and pull data back and forth between the database.

## Bad Coding Habits

* Constantly using QuerySelectors on the same item over and over again in the same file, Leading to alot of clutter.
* Reusing the same bits of code in a redundant way.
* Leaving exposed lets and consts at the top of the page instead of oraganizing them into objects.
* Poor modularization.
* Very messy HTML that caused lots of issues with styling.
* Badly formatted syling and poor consideration of UX.


### Server Routes
## GET

```
/workout
/workouts
/workout/:id
/remove/:id
/user/:username
```

## POST

```
/workout
/user
```

## Known Bugs
If the text item for the name is larger than others it unaligns the buttons. 
The display for the workout is buggs with line breaks and displays half of it on a lower line and the other half on the upper line.

## AI
The use of AI development of this project was attempted to be kept to a minimum.
## Prompts
  How can I add a 0 to my Minutes and Seconds in order to display it as 0X:0Y:0Z
  Response:
  timeParts[0] = workingSet.hour.toString().padStart(2, '0') + ' Hour ';
  timeParts[1] = workingSet.mins.toString().padStart(2, '0') + ' Min ';
  timeParts[2] = workingSet.secs.toString().padStart(2, '0') + ' Sec ';

  Can you draw me a basic circle SVG and give me the code.

  How can i force my buttons within my li to stay on the right hand of the screen?
  Response:
  #workoutList {
    list-style: none;
    padding: 0;
    font-size: 26px;
  }
  
  .workout-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #controls {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 22px;
  }

## Assets Used

*iPhone alarm ringtone by IonutHe - Download on ZEDGETM | 7815. (n.d.). Zedge. Retrieved April 30, 2024, from https://www.zedge.net/ringtone/abb638cd-7ec4-42b2-8e1e-72ebdd4c7815
