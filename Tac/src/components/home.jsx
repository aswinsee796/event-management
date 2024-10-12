import React, { useEffect, useState } from 'react';
import 'flowbite/dist/flowbite.min.css';
import SaveTextarea from './add';

export default function Home({ events, setEvents, initialSelectedDate, initialShowTextArea, startEditing, deleteEvent }) {
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate || '');
  const [showTextArea, setShowTextArea] = useState(initialShowTextArea || false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.5.1/flowbite.min.js';
    script.async = true;
    script.onload = () => {
      const datepickerEl = document.getElementById('datepicker-actions');
      if (datepickerEl) {
        new window.Datepicker(datepickerEl);
        datepickerEl.addEventListener('changeDate', (event) => {
          setSelectedDate(event.detail.date);
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  // Add an event
  const addEvent = (eventText, dateTime) => {
    setEvents([...events, { text: eventText, dateTime }]);
    setShowTextArea(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative max-w-sm">
    
      <button
        type="button"
        onClick={() => setShowTextArea(true)}
        className="mb-4 w-12 h-12 rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        +
      </button>
      </div>

      {showTextArea && (
        <SaveTextarea addEvent={addEvent} selectedDate={selectedDate} />
      )}

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mt-4">
        <h2 className="text-xl font-semibold mb-4">Event List</h2>
        {events.length === 0 ? (
          <p className="text-gray-500">No events added yet.</p>
        ) : (
          <ul>
            {events.map((event, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <div>
                  <span className="block">{event.text}</span>
                  <span className="text-gray-500 text-sm">{new Date(event.dateTime).toLocaleString()}</span>
                </div>
                <div>
                  <button
                    onClick={() => startEditing(index)}
                    className="text-blue-500 hover:underline mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(index)}
                    className="text-red-500 hover:underline"
                  >
                    Completed
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
