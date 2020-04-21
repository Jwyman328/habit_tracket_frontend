import React from 'react'

    let handleStartDateChange = (date, formData) => {
        let YYYYMMDD_date = formatDate(date)
        let newFormData = {...formData}
        newFormData['start_date'] = YYYYMMDD_date
        setFormData(newFormData)
        setStartDate(date)
    }