import fs from 'fs';
import path from 'path';
import http from 'http';

const server = http.createServer((request, response) => {
  const main = fs.readFileSync('./public/static/index.html', (err) => {
    if (err) throw err;
  })

  if(request.method === "GET") {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(main);
  } else if (request.method === "POST") {
    let body = "";
    
    request.on('data', (data) => {
      body += data;
      console.log(data, "this is first event")
      const test = new URLSearchParams(body);
      console.log(test);
      const timeData = new Date();
      console.log(timeData);
      // new Data() 인스턴스를 활용한 날짜 데이터 get
      console.log(typeof (timeData.getFullYear()+ "" + "0"))
      const stemp = timeData.getFullYear() + "" + "0" + (timeData.getMonth() + 1) + timeData.getDate() + "-" + timeData.getHours() + "-" + timeData.getMinutes();
      for(const [key, value] of test) {
        console.log(key, "그리고", value);
        fs.writeFile(`./save/ ${stemp}-${key}.txt`, value, (err) => {
          if (err) throw err;
        })
      }
    })
    request.on('end', () => {
      console.log(body, "this is last event");
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(main);
    })
  }
})
server.listen(5588, () => {
  console.log('server running');
})