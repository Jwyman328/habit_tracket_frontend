import React from "react";

/**
 * Return the date selected into a more readable YYYY-MM-DD format.
 * @param {Date} date -- Date selected on the form
 * @return            -- return a YYYY-MM-DD string of the date param
 */
function formatDate(date: Date): string {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

export default formatDate;
