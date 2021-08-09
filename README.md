# Homework Assignment 4 Part 2
## Notes
___
The assignment sheet states that  

>*Each time you create a new table, display it in a new tab and label that tab with the four parameters used to create it.*  

and  

>*In addition, your table should update dynamically when either the slider is changed or a new text value is entered.*  

These two statements are mutually exclusive: creating a new tab each time a new table is generated, if the tables are generated dynamically in real-time as values are changed, would very quickly crash the browser with a great many new tabs. To reconcile this, I have decided to implement my tab system in the following manner:  
A dedicated tab exists to show the dynamic table - the one which changes in real-time as the user moves sliders or confirms text-field inputs. If the user wishes to save the current table, they must press the "SAVE" button. The table is then saved to a new tab.

___

Moving the sliders instantly changes the text-field values.

Text-fields must be submitted to update the sliders.


___
## Links
_Repository_

https://github.com/mitbailey/hw4p2

_GitHub Pages_

https://mitbailey.github.io/hw4p2/

_Javascript_

https://github.com/mitbailey/hw4p2/blob/master/src/script.js

_CSS (see lines 332-)_

https://github.com/mitbailey/hw4p2/blob/master/css/style.css
___

## References
https://www.w3schools.com/

https://api.jqueryui.com/

https://jqueryvalidation.org/



___
___

# Homework Assignment 3  
  
The file can be found at  
https://github.com/mitbailey/hw3/blob/master/index.html  
  
The repository can be found at
https://github.com/mitbailey/hw3  
  
The containing folder can be found at  
https://github.com/mitbailey/hw3  
  
The webpage can be found at  
https://mitbailey.github.io/hw3/  

The simple example found in requirement 10 under the "What You Are To Do" section was not viewed. 
  
The headers use "position: sticky;" styling to stay visible when scrolling.   

CSS styling for Assignment 3 begins under the 'PAGE SPECIFIC FORMATTING' section, and is labeled 'ASSIGNMENT 3'.  
### This is at line 215.  

CSS:  
https://github.com/mitbailey/hw3/blob/master/css/style.css  

JavaScript:  
https://github.com/mitbailey/hw3/blob/master/src/script.js  

### Error Handling
Value Invalid  
If the value is text or NULL, an error message, "Invalid value!," will appear under the offending box(es).  

Value Out of Bounds  
If the value is too large or small, it is clamped to a maximum of 64 or a minimum of -64.  

Positive & Negative  
Values can be either positive or negative.  

Table Too Large  
The table always fits within the main area of the page. The user is presented with scrollbars to navigate the table when necessary.  

Axis Ordering  
Axes can be ordered from greatest to least or least to greatest, it works either way.  
