import React from 'react'



    /**
     * Set the form data to the newFormData state object when form data is changed.
     * @param {Object} e -- event for when form input is changed
     */
    const handleInputChange = (e, setFormData, formData)=> {
        let name = e.target.name
        let value = e.target.value 
        let newFormData = {...formData}
        newFormData[name] = value
        setFormData(newFormData)
    }

    export default handleInputChange;