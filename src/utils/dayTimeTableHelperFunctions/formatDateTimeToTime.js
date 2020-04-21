
import React from 'react'

        /**
         * Strip a string datetime and put it in a string that only shows hours and minutes.
         * @param {Date} dateTime -- a string containing information of a date
         * @return {String} -- Return a string only containing the hours and minutes of the dateTime.
         */
        const formatDateTimetoTime = (dateTime) => {
            if (dateTime){
                let [date, time] = dateTime.split('T')
                let [hours,minutes,seconds] = time.split(':')
                let formatedTime = `${hours}:${minutes}`
                return formatedTime }
             else{
                return dateTime
            }
        }

export default formatDateTimetoTime;