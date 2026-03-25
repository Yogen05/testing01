<!DOCTYPE html>
<html>
<head>
  <title>Queue Admin Panel</title>
  <style>
    body{font-family:sans-serif;padding:20px;}
    table{border-collapse:collapse;width:100%;}
    th, td{border:1px solid #ccc;padding:8px;}
    input{width:100%;}
  </style>
</head>
<body>

<h2>Queue Admin Panel</h2>
<table id="queueTable">
  <thead>
    <tr>
      <th>Queue</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Remark</th>
      <th>Status</th>
      <th>Description</th>
      <th>Update</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

<script>
const backendURL = "https://script.google.com/macros/s/AKfycbw1yNyJ8d3o6CwHXLKWC7_b9URa0rt3WQZlHskK8BLOeGWK_ShxpdnVDx5Bg9MccA_7Ow/exec";

async function fetchQueue(){
  const resp = await fetch(backendURL + "?action=getQueue");
  const data = await resp.json();
  const tbody = document.querySelector("#queueTable tbody");
  tbody.innerHTML = "";

  data.forEach(q=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${q.queueNumber}</td>
      <td>${q.name}</td>
      <td>${q.phone}</td>
      <td>${q.remark}</td>
      <td><input id="status-${q.queueNumber}" value="${q.status}"></td>
      <td><input id="desc-${q.queueNumber}" value="${q.description}"></td>
      <td><button onclick="update(${q.queueNumber})">Save</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function update(queueNumber){
  const status = document.getElementById("status-"+queueNumber).value;
  const description = document.getElementById("desc-"+queueNumber).value;

  await fetch(backendURL,{
    method:"POST",
    body: JSON.stringify({queueNumber, status, description})
  });

  alert("Updated!");
  fetchQueue();
}

fetchQueue();
setInterval(fetchQueue, 5000);
</script>

</body>
</html>
