
import React from 'react'

        /**
         * Return an integer of minutes from a string containing hours and minutes.
         * @param {String} total_time -- A string containing hours and minutes
         * @return {Int} -- return an integer of the minutes from the hours/minutes passed.
         */
        const totalTimeToMinutes = (total_time: string) => {
            let [hours,minutes,seconds] = total_time.split(':')
            let hoursToMinutes = parseInt(hours) * 60
            let minutesNumber = parseInt(minutes) + hoursToMinutes
            return minutesNumber
        }

export default totalTimeToMinutes;