const dates = [
    {day:'07', month:'Jul', year:'2026', weekday:'Tuesday'},
    {day:'08', month:'Jul', year:'2026', weekday:'Wednesday'},
    {day:'09', month:'Jul', year:'2026', weekday:'Thursday'},
    {day:'10', month:'Jul', year:'2026', weekday:'Friday'},
    {day:'11', month:'Jul', year:'2026', weekday:'Saturday'},
    {day:'12', month:'Jul', year:'2026', weekday:'Sunday'},
  ];

  const slotDefs = [
    {label:'MAA4', time:'08:45 AM - 18:45 PM'},
    {label:'MAA4', time:'18:45 PM - 04:45 AM'},
  ];

  // seed availability data per date (1 = available, 0 = booked/full)
  const availability = {
    '07': [1,1],
    '08': [1,1],
    '09': [1,1],
    '10': [1,1],
    '11': [0,1],
    '12': [0,1],
  };

  const dateGrid = document.getElementById('dateGrid');
  dates.forEach(d => {
    const el = document.createElement('div');
    el.className = 'date-pill';
    el.id = 'date-' + d.day;
    el.innerHTML = `
      <div class="check">✓</div>
      <div class="day-num">${d.day}</div>
      <div class="month">${d.month}</div>
      <div class="year">${d.year}</div>
      <div class="weekday">${d.weekday}</div>
    `;
    el.onclick = () => {
      document.getElementById('group-' + d.day).scrollIntoView({behavior:'smooth', block:'start'});
    };
    dateGrid.appendChild(el);
  });

  const container = document.getElementById('slotsContainer');
  dates.forEach(d => {
    const bar = document.createElement('div');
    bar.className = 'date-group-bar';
    bar.id = 'group-' + d.day;
    bar.textContent = `${d.day}-${d.month}-${d.year}`;
    container.appendChild(bar);

    const row = document.createElement('div');
    row.className = 'slots-row';

    slotDefs.forEach((s, idx) => {
      const avail = availability[d.day][idx];
      const card = document.createElement('div');
      card.className = 'slot-card' + (avail === 0 ? ' booked' : '');
      card.id = `slot-${d.day}-${idx}`;
      card.innerHTML = `
        <div class="slot-label">${s.label}</div>
        <div class="slot-time">${s.time}</div>
        <div class="slot-avail">(Available - <span class="avail-num">${avail}</span>)</div>
        <button class="slot-btn ${avail === 0 ? 'revoke' : 'book'}">${avail === 0 ? 'Revoke Now' : 'Book Now'}</button>
      `;
      const btn = card.querySelector('button');
      btn.onclick = () => handleClick(d.day, idx, card);
      row.appendChild(card);
    });

    container.appendChild(row);
  });

  function handleClick(day, idx, card){
    const btn = card.querySelector('button');
    const availSpan = card.querySelector('.avail-num');
    const isBooking = btn.classList.contains('book');

    if(isBooking){
      availability[day][idx] = 0;
      availSpan.textContent = '0';
      btn.textContent = 'Revoke Now';
      btn.classList.remove('book');
      btn.classList.add('revoke');
      card.classList.add('booked');
      showToast('Your slot booked successfully!');
    } else {
      availability[day][idx] = 1;
      availSpan.textContent = '1';
      btn.textContent = 'Book Now';
      btn.classList.remove('revoke');
      btn.classList.add('book');
      card.classList.remove('booked');
      showToast('Booking revoked.');
    }
  }

  function showToast(msg){
    alert(msg);
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 2200);
  }

  function scrollDates(dir){
    dateGrid.parentElement.scrollBy({left: dir*150, behavior:'smooth'});
  }
