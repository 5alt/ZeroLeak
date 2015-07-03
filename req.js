//by md5_salt
function isEffective(url) {
   try {
     var xmlhttp;
     if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
       xmlhttp = new XMLHttpRequest();
     } else { // code for IE6, IE5
       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
     }
     xmlhttp.open("get", url, false);
     xmlhttp.send();
     if (xmlhttp.status/100 == 2) {//2xx
       return true;
     } else {
       return false;
     }
   } catch (e) {
     return false;
   }
 }

path = window.location.pathname
base_url = window.location.href.slice(0,window.location.href.indexOf(window.location.hostname)+window.location.hostname.length) + '/'

package_ext = new Array('.rar', '.zip', '.tar', '.tar.gz')
backup_filename = new Array('web', 'wwwroot', window.location.hostname)
recursive_check_list = new Array('.svn/entries', '.git/config', 'robots.txt', '.DS_Store')

urls = Array()

for(p in package_ext){
  for(b in backup_filename){
    urls.push(base_url + backup_filename[b] + package_ext[p])
  }
}

paths_full = window.location.pathname.split('/')
for(i=1; i<paths_full.length; i++){
  paths_full[i] = paths_full[i-1] + '/' + paths_full[i]
}
paths_full.pop()

paths_part = window.location.pathname.split('/')

for( p=0; p< (paths_full.length >3 ? 3: paths_full.length); p++){
  for (l in recursive_check_list){
    urls.push(base_url + paths_full[p] + '/' + recursive_check_list[l]) 
  }
  if(paths_full[p]){
    for(ext in package_ext){
      urls.push(base_url + paths_full[p] + '/' + paths_part[p] + package_ext[ext])
    } 
  }
}

document.open();
document.clear();
document.close();

result = document.createElement("div")
result.setAttribute('id', 'result')
document.body.appendChild(result)

for(u in urls){
  if(isEffective(urls[u])){
      p = document.createElement("p");
      node = document.createElement("a")
      node.innerHTML = urls[u]
      node.setAttribute('href', urls[u])
      node.setAttribute('target', '_blank')
      p.appendChild(node)
      document.getElementById('result').appendChild(p)
  }
}
alert(window.location.hostname+' done!')


