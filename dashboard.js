(function initCharts(){
  const brand = getComputedStyle(document.documentElement);
  const accent = '#7a42f4';
  const green = '#16a34a';
  const muted = '#cbd5e1';

  const ctx1 = document.getElementById('chartBookings');
  const ctx2 = document.getElementById('chartRevenue');
  const ctx3 = document.getElementById('chartFeedback');
  const ctx4 = document.getElementById('chartDemo');
  if (!window.Chart) return;

  if (ctx1) new Chart(ctx1, {
    type: 'line',
    data: { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'], datasets:[{ label:'Bookings', data:[1200,1450,1600,1800,2100,1900,2300], borderColor: accent, tension:.35, fill:false }] },
    options: { plugins:{legend:{display:false}}, scales:{ y:{ grid:{color:muted}}, x:{ grid:{display:false} } } }
  });

  if (ctx2) new Chart(ctx2, {
    type: 'line',
    data: { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'], datasets:[{ label:'Revenue', data:[220,260,280,330,370,340,420], borderColor: green, tension:.35, fill:false }] },
    options: { plugins:{legend:{display:false}}, scales:{ y:{ grid:{color:muted}}, x:{ grid:{display:false} } } }
  });

  if (ctx3) new Chart(ctx3, {
    type: 'bar',
    data: { labels:['5.0','4.0','3.0','2.0','1.0'], datasets:[{ label:'Reviews', data:[1800,2900,900,400,150], backgroundColor:['#06b6d4','#60a5fa','#34d399','#fbbf24','#f87171'] }] },
    options: { plugins:{legend:{display:false}}, scales:{ y:{ grid:{color:muted}}, x:{ grid:{display:false} } } }
  });

  if (ctx4) new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: ['18-35','36-50','51-64','65+'],
      datasets: [
        { label:'Male', data:[1800,1500,1200,600], backgroundColor:'#60a5fa' },
        { label:'Female', data:[2100,1600,1300,700], backgroundColor:'#f472b6' },
        { label:'Others', data:[200,180,120,60], backgroundColor:'#a3a3a3' }
      ]
    },
    options: { scales:{ y:{ grid:{color:muted}}, x:{ stacked:true, grid:{display:false} } }, plugins:{ legend:{ position:'bottom' } } }
  });
})();


