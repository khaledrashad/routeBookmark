var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var submitBtn = document.querySelector("#formSubmit")

var bookmarkList = []

if(localStorage.getItem("bookmarks") != null){
    bookmarkList = JSON.parse(localStorage.getItem("bookmarks"))
    showBookmark()
}

submitBtn.addEventListener("click", addBookmark)

function addBookmark() {
    var bookmark = {
        name: siteName.value,
        url: siteUrl.value
    }
    bookmarkList.push(bookmark)
    siteName.value = ""
    siteUrl.value = ""
    showBookmark()
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))
}

function showBookmark() {
    var temp = ""
    for (var i = 0; i < bookmarkList.length; i++) {
        temp += `  
    <tr>
        <td>`+i+`</td>
        <td>`+bookmarkList[i].name+`</td>
        <td><a href=""><button class="btn btn-outline-danger">Visit</button></a></td>
        <td><button onclick="removeBookmark(`+i+`)" class="btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById("myContent").innerHTML = temp
}

function removeBookmark (index){
    bookmarkList.splice(index,"1")
    showBookmark()
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))
}
