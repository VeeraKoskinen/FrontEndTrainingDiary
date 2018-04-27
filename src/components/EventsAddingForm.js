import React from 'react';
import PropTypes from 'prop-types'

const EventsAddingForm = ({ handleSubmit, handleFieldChange, title, content }) => {

    return (
        <div>
            <h2>Add a new training</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleFieldChange}
                    />
                </div>
                <div>
                    Comments and notes:
                    <input
                        type="text"
                        name="content"
                        value={content}
                        onChange={handleFieldChange}
                    />
                </div>
                <button type="submit">Add event</button>
            </form>
        </div>
    )


}

EventsAddingForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
}

export default EventsAddingForm