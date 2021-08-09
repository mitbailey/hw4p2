/**
 * @file script.js
 * @author Mit Bailey (mitbailey99@gmail.com)
 * @brief JavaScript for website.
 * 
 * @version 0.1
 * @date 2021.07.14
 * 
 * @copyright Copyright (c) 2021
 */

/**
 * @brief Saves a multiplication table into a new tab.
 * 
 * This function creates a new tab and regenerates the current table into it. The interactivity with the table is the
 * same in the tab as the normal once, except you cannot change what its values are. Actively prohibits re-saving the
 * same table.
 * 
 */
function saveTable() {
    var tabs = $("#save_tabs").tabs();

    // Create the tab's name, which is the four multiplication values in CSV format.
    var tab_name = $("#val1").val() + "," + $("#val2").val() + "," + $("#val3").val() + "," + $("#val4").val();

    // Checks if the tab already exists, and denies the user the ability to save the same thing multiple times. This avoids a bug where tabs get horribly messed up if there's multiple with the same ID (and, really, there's just no need).
    if (document.getElementById(tab_name) != null) {
        console.log("Cannot save an already existent tab.");
        return;
    }

    // Appends HTML to create a new tab. This is unfortunately how it has to be done, since they removed the .add() function from the jQuery UI plugin.
    $("#save_tabs_list").append("<li><a href='#" + tab_name + "'>" + tab_name + "</a></li>");
    $("#save_tabs").append("<div class='dynamic-table' id ='" + tab_name + "'><table id='mult-table_" + tab_name + "'></table></div>");

    // Refresh so its drawn properly (jQuery UI adds a bunch of classes).
    $("#save_tabs").tabs("refresh");

    // Everything below this point is just a slightly adjusted submitFormValuesNoValidation().

    // Store the user-input values into an array.
    var values = [document.getElementById("val1").value, document.getElementById("val2").value, document.getElementById("val3").value, document.getElementById("val4").value];

    // Print the input values.
    console.log(values);

    // Convert the values to number type.
    for (var i = 0; i < 4; i++) {
        // Subtract one since the zeroth element is lost in the corner.
        values[i] = Number(values[i]) - 1;
    }

    // Here is where the difference is - we get the ID of the brand-new tab instead of using the dynamic table.
    var mult_table = document.getElementById("mult-table_" + tab_name);
    var y_range = 0;
    var x_range = 0;

    // We also don't bother to clear the table, since we won't be replacing that one.
    // clearTable();

    // Calculate the ranges for...
    // Y-Axis
    if (values[2] < values[3]) { // If y-axis is least to greatest...
        y_range = values[3] - values[2];
    }
    else if (values[2] > values[3]) { // ...greatest to least...
        y_range = values[2] - values[3];
    }
    // ...or equivalent (0 by default).

    // X-Axis
    if (values[0] < values[1]) { // If x-axis is least to greatest...
        x_range = values[1] - values[0];
    }
    else if (values[0] > values[1]) { // ...greatest to least...
        x_range = values[0] - values[1];
    }
    // ...or equivalent (0 by default).

    // Print the ranges.
    console.log("y_range: ", y_range);
    console.log("x_range: ", x_range);

    // To make the range inclusive (ie from "0 to 10" is 11 numbers, which is (10 - 0) + 1).
    x_range += 2;
    y_range += 2;

    // Print the adjusted ranges.
    console.log("y_range (ADJ): ", y_range);
    console.log("x_range (ADJ): ", x_range);

    // Here we fill in all of the cells of the table by using a nested for-loop.
    // First we create and then fill in the value for each cell.
    for (var i = 0; i < y_range; i++) {
        // Add a row for each value of y_range.
        mult_table.appendChild(document.createElement("tr"));

        // Add the cells for each row.
        for (var ii = 0; ii < x_range; ii++) {

            // Check if a cell should be a header or is the top left corner.
            if (i == 0 && ii == 0) { // The top left corner.
                mult_table.children[i].appendChild(document.createElement("td"));
            }
            else if (i == 0) { // Header row.
                mult_table.children[i].appendChild(document.createElement("th"));

                // Also check if the values are least to greatest or greatest to least.
                if (values[0] > values[1]) {
                    mult_table.children[i].children[ii].textContent = values[0] - ii + 2;
                }
                else {
                    mult_table.children[i].children[ii].textContent = ii + values[0];
                }
            }
            else if (ii == 0) { // Header column.
                mult_table.children[i].appendChild(document.createElement("th"));

                if (values[2] > values[3]) {
                    mult_table.children[i].children[ii].textContent = values[2] - i + 2;
                }
                else {
                    mult_table.children[i].children[ii].textContent = i + values[2];
                }
            }
            else { // In the table body.
                mult_table.children[i].appendChild(document.createElement("td"));

                if (values[0] > values[1]) {
                    mult_table.children[i].children[ii].textContent = (values[0] - ii + 2) * (values[2] - i + 2);
                }
                else {
                    mult_table.children[i].children[ii].textContent = (ii + (values[0])) * (i + (values[2]));
                }
            }
        }
    }


}

/**
 * @brief Deletes all saved tables tabs.
 * 
 * It does this by forcibly deleting each child of the <ul> and <div> objects that doesn't exist by default (on boot-up).
 * 
 */
function clearSavedTables() {
    var save_tabs_list = $("#save_tabs_list")[0];

    // While the list has more than one child, remove the last child.
    while (save_tabs_list.children.length > 1) {
        save_tabs_list.children[save_tabs_list.children.length - 1].remove();
    }

    var save_tabs = $("#save_tabs")[0];

    // While the div has more than 2 children, remove the last child.
    while (save_tabs.children.length > 2) {
        save_tabs.children[save_tabs.children.length - 1].remove();
    }

    $("#save_tabs").tabs().tabs("refresh");
}

/**
 * @brief Initializes #save_tabs <div> as the designated tabs object.
 */
$(function () {
    $("#save_tabs").tabs({
        collapsible: false,
    });
});

/**
 * @brief jQuery sliders.
 * 
 * Generates four sliders, one for each text field. Sets their default to 0, max and min to +/-64, and turns on
 * animations. It also sets the text field values when slid.
 * 
 * As a side note - although the sliders end up close to the text fields, I thought it looked nice and signified the
 * connection between the two.
 * 
 */
$(function () {
    $("#val1_slider").slider({
        // Set max, min, and default values.
        value: 0,
        min: -64,
        max: 64,
        // Doesn't do much, but makes it step by 1.
        step: 1,
        // Animates it - looks nicer.
        animate: true,
        // When slid: syncs the text-field value, validates all fields, and submits to generate a table in real-time.
        slide: function (event, ui) {
            $("#val1").val(ui.value);
            $('.dynamic-table-form-set').valid();
            $('.dynamic-table-form-set').submit();
        }
    });
    $("#val2_slider").slider({
        value: 0,
        min: -64,
        max: 64,
        step: 1,
        animate: true,
        slide: function (event, ui) {
            $("#val2").val(ui.value);
            $('.dynamic-table-form-set').valid();
            $('.dynamic-table-form-set').submit();
        }
    });
    $("#val3_slider").slider({
        value: 0,
        min: -64,
        max: 64,
        step: 1,
        animate: true,
        slide: function (event, ui) {
            $("#val3").val(ui.value);
            $('.dynamic-table-form-set').valid();
            $('.dynamic-table-form-set').submit();
        }
    });
    $("#val4_slider").slider({
        value: 0,
        min: -64,
        max: 64,
        step: 1,
        animate: true,
        slide: function (event, ui) {
            $("#val4").val(ui.value);
            $('.dynamic-table-form-set').valid();
            $('.dynamic-table-form-set').submit();
        }
    });
});

/**
 * @brief Sets validation rules, messages, and behaviours.
 * 
 * Sets the rules, messages, and behaviours for all four text fields. On submission, the sliders are moved to sync.
 * Warns if values are too high or low, prohibiting their entry (a downgrade from my previously manual method of error-
 * catching), and outlines the text-field in red while also displaying a red, bold error message adjacent to the
 * offending field.
 * 
 */
$('.dynamic-table-form-set').validate({
    debug: false,
    rules: {
        val1: {
            // This field must be filled in.
            required: true,
            // Sets the minimum and maximum allowable values.
            min: -64,
            max: 64,
        },
        val2: {
            required: true,
            min: -64,
            max: 64,
        },
        val3: {
            required: true,
            min: -64,
            max: 64,
        },
        val4: {
            required: true,
            min: -64,
            max: 64,
        },
    },
    messages: {
        val1: {
            // Overrides the default error messages for these errors.
            required: "Enter a value.",
            min: "Value too low (-64 to 64).",
            max: "Value too high (-64 to 64).",
        },
        val2: {
            required: "Enter a value.",
            min: "Value too low (-64 to 64).",
            max: "Value too high (-64 to 64).",
        },
        val3: {
            required: "Enter a value.",
            min: "Value too low (-64 to 64).",
            max: "Value too high (-64 to 64).",
        },
        val4: {
            required: "Enter a value.",
            min: "Value too low (-64 to 64).",
            max: "Value too high (-64 to 64).",
        },
    },
    // Helps with placement of the messages so that they don't push things around.
    errorPlacement: function (error, element) {
        error.insertBefore(element);
    },
    // Adds the class "invalid" to errored objects.
    errorClass: "invalid",
    // Adds the class "valid" to errored objects (allows us to place the green box).
    validClass: "valid",
    // Makes the error-text use a <samp> element, which gives it a nice text look. Also I never use <samp> so really it just works out.
    errorElement: "samp",
    errorLabel: "error_label",
    // This is fired when things are invalid, just for debugging more or less.
    invalidHandler: function (form) {
        console.log("Invalid handler.");
    },
    // When a valid submission goes through, we update all the sliders to match the text fields and then call our good-old submitFormValues() function - but slightly modified so that none of my previous validation is happening within it.
    submitHandler: function (form) {
        console.log("Submitted!");
        $("#val1_slider").slider("value", $("#val1").val());
        $("#val2_slider").slider("value", $("#val2").val());
        $("#val3_slider").slider("value", $("#val3").val());
        $("#val4_slider").slider("value", $("#val4").val());
        submitFormValuesNoValidation();
    }
});

// Toggle navbar visibility.
function collapseNavbar() {
    var sideNavbar = document.getElementById("side_navbar");
    if (sideNavbar.style.visibility === "visible") {
        sideNavbar.style.visibility = "hidden";
    } else {
        sideNavbar.style.visibility = "visible";
    }
}

// Version of the submit form values which doesn't have validation.
function submitFormValuesNoValidation() {
    // Store the user-input values into an array.
    var values = [document.getElementById("val1").value, document.getElementById("val2").value, document.getElementById("val3").value, document.getElementById("val4").value];

    // Print the input values.
    console.log(values);

    // Convert the values to number type.
    for (var i = 0; i < 4; i++) {
        // Subtract one since the zeroth element is lost in the corner.
        values[i] = Number(values[i]) - 1;
    }

    var mult_table = document.getElementById("mult-table");
    var y_range = 0;
    var x_range = 0;

    // Clear the table, ensuring we don't pile up cells ad infinitum.
    clearTable();

    // Calculate the ranges for...
    // Y-Axis
    if (values[2] < values[3]) { // If y-axis is least to greatest...
        y_range = values[3] - values[2];
    }
    else if (values[2] > values[3]) { // ...greatest to least...
        y_range = values[2] - values[3];
    }
    // ...or equivalent (0 by default).

    // X-Axis
    if (values[0] < values[1]) { // If x-axis is least to greatest...
        x_range = values[1] - values[0];
    }
    else if (values[0] > values[1]) { // ...greatest to least...
        x_range = values[0] - values[1];
    }
    // ...or equivalent (0 by default).

    // Print the ranges.
    console.log("y_range: ", y_range);
    console.log("x_range: ", x_range);

    // To make the range inclusive (ie from "0 to 10" is 11 numbers, which is (10 - 0) + 1).
    x_range += 2;
    y_range += 2;

    // Print the adjusted ranges.
    console.log("y_range (ADJ): ", y_range);
    console.log("x_range (ADJ): ", x_range);

    // Here we fill in all of the cells of the table by using a nested for-loop.
    // First we create and then fill in the value for each cell.
    for (var i = 0; i < y_range; i++) {
        // Add a row for each value of y_range.
        mult_table.appendChild(document.createElement("tr"));

        // Add the cells for each row.
        for (var ii = 0; ii < x_range; ii++) {

            // Check if a cell should be a header or is the top left corner.
            if (i == 0 && ii == 0) { // The top left corner.
                mult_table.children[i].appendChild(document.createElement("td"));
            }
            else if (i == 0) { // Header row.
                mult_table.children[i].appendChild(document.createElement("th"));

                // Also check if the values are least to greatest or greatest to least.
                if (values[0] > values[1]) {
                    mult_table.children[i].children[ii].textContent = values[0] - ii + 2;
                }
                else {
                    mult_table.children[i].children[ii].textContent = ii + values[0];
                }
            }
            else if (ii == 0) { // Header column.
                mult_table.children[i].appendChild(document.createElement("th"));

                if (values[2] > values[3]) {
                    mult_table.children[i].children[ii].textContent = values[2] - i + 2;
                }
                else {
                    mult_table.children[i].children[ii].textContent = i + values[2];
                }
            }
            else { // In the table body.
                mult_table.children[i].appendChild(document.createElement("td"));

                if (values[0] > values[1]) {
                    mult_table.children[i].children[ii].textContent = (values[0] - ii + 2) * (values[2] - i + 2);
                }
                else {
                    mult_table.children[i].children[ii].textContent = (ii + (values[0])) * (i + (values[2]));
                }
            }
        }
    }
}

// Clears the entire table so that nothing appears.
function clearTable() {
    var mult_table = document.getElementById("mult-table");

    // While the table has any children, remove the first child.
    while (mult_table.children.length) {
        mult_table.children[0].remove();
    }
}

// Clears table and all inputs.
function clearAll() {
    // Sets slider and text fields to default.
    $("#val1_slider").slider("value", 0);
    $("#val1").val(0);
    $("#val2_slider").slider("value", 0);
    $("#val2").val(0);
    $("#val3_slider").slider("value", 0);
    $("#val3").val(0);
    $("#val4_slider").slider("value", 0);
    $("#val4").val(0);
    clearTable();
}