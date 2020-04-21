    import React from 'react'
    
    /**
     * Take in minutes and return a rem total with each minute equal to .25rem
     * @param {Number} minutes -- Minutes for an activities total_time, AKA start_time - end_time.
     * @return {String} the rem height total that represents the amount of minutes of this activity.
     */
    const generateHeightOfDayTimeTable = (minutes) => {
        //take in minutes, return rem
        let totalRem = minutes * .25
        //totalRem = Math.round(totalRem)
        totalRem = `${totalRem}rem`
        return totalRem
    }

export default  generateHeightOfDayTimeTable;