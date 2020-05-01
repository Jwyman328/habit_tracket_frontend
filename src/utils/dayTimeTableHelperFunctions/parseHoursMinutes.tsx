import React from 'react'

    const parseHoursMinutes = (stringTime: string) => {
        const[dates,times] = stringTime.split('T')
        let [hour,minutes, seconds] =  times.split(':')
        const hourNumber = parseInt(hour)
        const minutesNumber = parseInt(minutes)
        return [hourNumber,minutesNumber]
    }

export default parseHoursMinutes;