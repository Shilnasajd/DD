import { Dialog } from '@headlessui/react';
import { useState } from 'react';

export default function BookingModal({ isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="w-full max-w-5xl bg-white rounded-xl shadow-lg flex overflow-hidden">
          {/* Left Column */}
          <div className="w-1/3 bg-gray-50 p-6 space-y-4">
            <h2 className="text-xl font-semibold">Sigma Camera Lens</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              📅 <span>5/6/2025</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ⏰ <span>03:00 PM – 04:00 PM (60 min)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              📍 <span>CHALAVARA</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-2/3 p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Select date & time</h3>
            {/* Calendar */}
            <div className="flex gap-6">
              <div>
                <input type="date" className="border px-2 py-1 rounded-md" />
              </div>

              {/* Time Slots */}
              <div className="flex-1 max-h-60 overflow-y-auto border rounded-md p-2 space-y-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-3 py-2 rounded-md border hover:bg-blue-100"
                  >
                    {`${i.toString().padStart(2, '0')}:00 ${i < 12 ? 'AM' : 'PM'}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-auto">
              <button onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Book
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
