
import React, { useState, useEffect } from 'react';

const SaveTextarea = ({ addEvent, selectedDate, initialText, initialDateTime, onUpdate }) => {
  const [eventText, setEventText] = useState(initialText || '');
  const [dateTime, setDateTime] = useState(initialDateTime || selectedDate || '');

  useEffect(() => {
    setEventText(initialText || '');
    setDateTime(initialDateTime || selectedDate || '');
  }, [initialText, initialDateTime, selectedDate]);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventText.trim()) {
      if (onUpdate) {
        onUpdate(eventText, dateTime);
      } else {
        addEvent(eventText, dateTime);
      }
      setEventText('');
      setDateTime('');
    }
  };

  // Handle date and time change
  const handleDateChange = (e) => {
    setDateTime(e.target.value);
  };
const handleSave = (eventText, dateTime, index) => {
  const updatedEvents = events.map((event, i) =>
    i === index ? { text: eventText, dateTime } : event
  );
  setEvents(updatedEvents);
  setShowTextArea(false);
  setEditingIndex(null);
};

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <textarea
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          rows="4"
          placeholder="Enter event details"
        />
        <div className="mt-2">
          <input
            type="datetime-local"
            value={dateTime}
            onChange={handleDateChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {onUpdate ? 'Update Event' : 'Add Event'}
        </button>
      </form>
    </div>
  );
};

export default SaveTextarea;
