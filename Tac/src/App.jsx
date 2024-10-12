import { useEffect, useState } from 'react';
import 'flowbite/dist/flowbite.min.css'; // Import Flowbite CSS
import Bars from './components/bars';
import Home from './components/home';
import SaveTextarea from './components/add';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [showTextArea, setShowTextArea] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.5.1/flowbite.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Add a new event
  const addEvent = (eventText, dateTime) => {
    setEvents([...events, { text: eventText, dateTime }]);
    setShowTextArea(false);
  };

  // Update an existing event
  const updateEvent = (eventText, dateTime) => {
    const updatedEvents = events.map((event, index) =>
      index === editingIndex ? { text: eventText, dateTime } : event
    );
    setEvents(updatedEvents);
    setEditingIndex(null);
    setShowTextArea(false);
  };

  // Delete an event by index
  const startEditing = (index) => {
    setEditingIndex(index);
    setShowTextArea(true);
  };
  
  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <Bars />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-2xl">
          {/* SaveTextarea Component for Adding/Editing Events */}
          {showTextArea && (
            <SaveTextarea
              addEvent={addEvent}
              initialText={editingIndex !== null ? events[editingIndex].text : ''}
              initialDateTime={editingIndex !== null ? events[editingIndex].dateTime : ''}
              onUpdate={editingIndex !== null ? updateEvent : null}
            />
          )}

          {/* Home Component for Displaying Events */}
          <Home
  events={events}
  setEvents={setEvents}
  initialSelectedDate={selectedDate}
  initialShowTextArea={showTextArea}
  startEditing={startEditing}
  deleteEvent={deleteEvent}
/>

        </div>
      </main>

      {/* Footer (Optional) */}
     
    </div>
  );
}

export default App;
