import React from 'react'
    const parseHoursMinutes = (stringTime) => {
        const[dates,times] = stringTime.split('T')
        let [hour,minutes, seconds] =  times.split(':')
        hour = parseInt(hour)
        minutes = parseInt(minutes)
        return [hour,minutes]
    }

export default parseHoursMinutes;