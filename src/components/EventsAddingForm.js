import React from 'react';
import PropTypes from 'prop-types';
import DrackAndDropBox from './DrackAndDropBox'

const EventsAddingForm = ({ handleSubmit, handleFieldChange, title, content, onDrop, attachmentCounter }) => {
    console.log(attachmentCounter)
    return (
        <div>
            <h3 className="addUL">Add a new training</h3>
            <form onSubmit={handleSubmit} className="addD">
                <div>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleFieldChange}
                    />
                </div>
                <div >
                    <DrackAndDropBox onDrop={onDrop}/>
                    Attachments: {attachmentCounter}
                </div> 
                <div>
                
                    <textarea
                        type="text"
                        name="content"
                        value={content}
                        onChange={handleFieldChange}
                        rows="8"
                        cols="50"
                        placeholder="Add your marks and comments here!"
                    />
              
                </div>
                   
                <button className="button" type="submit">Add event</button>
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