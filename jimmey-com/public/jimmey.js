function ajax(method, url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(request);
        }
      }
    };
    request.send();
  });
}
ajax("get", "http://qq.com:8888/friends.json").then(response => {
  console.log("这是 AJAX");
  console.log(response);
});
function jsonp(url) {
  return new Promise((resolve,reject)=>{
    const callbackName = 'jimmeyCallback'+Math.random;
    window[callbackName] = data => {
      resolve(data);
    }
    const script = document.createElement("script");
    script.src = `${url}?callback=${callbackName}`;
    document.body.appendChild(script);
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    }
  })
}
jsonp("http://qq.com:8888/friends.js").then(data => {
  console.log(data);
});
