<script src="https://github.com/steemit/steem-js/releases/download/v0.6.4/steem.min.js"></script> 

//import { Client } from 'dsteem';

const client = new Client('https://api.steemit.com');

function fetchBlog() {
    const query = {
        tag: 'jsj1215',
        limit: 100,
    };
    client.database
        .getDiscussions('blog', query)
        .then(result => {
            var posts = [];
            result.forEach(post => {
                const json = JSON.parse(post.json_metadata);
                const image = json.image ? json.image[0] : '';
                const title = post.title;
                const author = post.author;
                const created = new Date(post.created).toDateString();
                posts.push(
                    `<div class="list-group-item"><h4 class="list-group-item-heading">${title}</h4><p>by ${author}</p><center><img src="${image}" class="img-responsive center-block" style="max-width: 450px"/></center><p class="list-group-item-text text-right text-nowrap">${created}</p></div>`
                );
            });

            document.getElementById('postList').innerHTML = posts.join('');
        })
        .catch(err => {
            alert('Error occured' + err);
        });
}

window.onload = fetchBlog();
