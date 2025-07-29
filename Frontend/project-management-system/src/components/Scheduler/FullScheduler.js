// import React from 'react';
// import FullCalendar from '@fullcalendar/react';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction'; // for selectable
// import dayGridPlugin from '@fullcalendar/daygrid';

// const FullScheduler = ({ appointments, onDateClick, onEventAdd }) => {
//   // Convert appointments to FullCalendar events
//   const events = appointments.map((a, i) => ({
//     id: i,
//     title: a.title,
//     start: new Date(`${a.date}T${a.session === 'Morning' ? '09:00:00' : '17:00:00'}`),
//     end: new Date(`${a.date}T${a.session === 'Morning' ? '12:00:00' : '19:00:00'}`),
//   }));

//   return (
//     <div className="p-4 bg-white shadow rounded-lg">
//       <FullCalendar
//         plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
//         initialView="timeGridWeek"
//         slotMinTime="08:00:00"
//         slotMaxTime="20:00:00"
//         slotDuration="03:00:00"
//         allDaySlot={false}
//         selectable={true}
//         events={events}
//         height="auto"
//         headerToolbar={{
//           left: 'prev,next today',
//           center: 'title',
//           right: 'timeGridWeek,dayGridMonth'
//         }}
//         dateClick={(info) => {
//           const hour = new Date(info.date).getHours();
//           const session = hour < 12 ? 'Morning' : 'Evening';
//           onDateClick({ date: info.dateStr.split('T')[0], session });
//         }}
//         eventClick={(info) => {
//           alert(`Appointment: ${info.event.title}`);
//         }}
//       />
//     </div>
//   );
// };

// export default FullScheduler;
