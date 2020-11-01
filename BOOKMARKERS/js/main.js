document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
	
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}


	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	if(localStorage.getItem('bookmarks')=== null){

		var bookmarks = [];
		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));	

	} else {
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));	
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	document.getElementById('myForm').reset();
	
	fetchBookmarks();

	e.preventDefault();
}


// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
  	var name = bookmarks[i].name;
  	var url = bookmarks[i].url;

  	bookmarksResults.innerHTML += '<table class="table table-striped"><thead><tr><th scope="col">Site Name</th><th scope="col">Site URL</th><th scope="col">Action</th></tr></thead><tbody>'+
  	'<tr><td>'+name+
  	'</td><td><a class="btn btn-default btn-primary" target="_blank" href="'+addhttp(url)+'">Visit Website</a> </td>' +
  	'<td><a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> </td>' +
  	'</tr>'+
  	'</table>';
  }
}


// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
  	if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
  }
}
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

function addhttp(url) {
	if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
		url = "http://" + url;
	}
	return url;
}

// Validate Form
function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
		alert('Please fill the Site Name and Site URL');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please Enter a Valid URL');
		return false;
	}

	return true;
}