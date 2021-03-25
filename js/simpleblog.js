var posts = [
  {
    title: "SimpleBlog placeholder",
    text: "No post created yet! Why not make one?",
  },
];
/**
 * @type {HTMLDivElement}
 */
var div;
var maxtext = 100;
var p = [];
class SimpleBlog {
  /**
   *
   * @param {JSON} json
   */
  constructor(json) {
    div = json.div;
    posts = json.posts || posts;
    if (json.maxtext) maxtext = json.maxtext;
    if (posts[new URLSearchParams(window.location.search).get("post")])
      this.loadPost(new URLSearchParams(window.location.search).get("post"));
    else this.loadAllPosts();
  }
  loadPost(id) {
    if (!posts[new URLSearchParams(window.location.search).get("post")])
      return this.loadAllPosts();
    let a = posts[new URLSearchParams(window.location.search).get("post")];
    let b = document.createElement("h2");
    let c = document.createElement("p");
    let d = document.createElement("div");
    b.innerHTML = a.title || "Untitled post";
    d.appendChild(b);
    c.innerHTML = a.text;
    d.appendChild(c);
    div.appendChild(d);
  }
  loadAllPosts() {
    for (let post in posts) {
      let d = posts[post];
      let a = document.createElement("div");
      let b = document.createElement("h2");
      b.innerHTML =
        '<a href="?post=' + post + '">' + (d.title || "Untitled post") + "</a>";
      a.appendChild(b);
      let c = document.createElement("p");
      c.innerHTML =
        d.text.length > maxtext - 1
          ? d.text.substring(0, maxtext) + " ..."
          : d.text;
      a.appendChild(c);
      p.push(a);
    }
    p.reverse();
    p.forEach((a) => {
      div.appendChild(a);
    });
  }
}
