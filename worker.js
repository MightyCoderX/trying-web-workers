self.addEventListener('message', async e =>
{
    let functionName = e.data.name;
    functionName = functionName.at(0).toUpperCase() + functionName.substring(1);

    functionName = `on${functionName}`;

    console.log('Calling function', functionName);

    self?.[functionName]?.(e.data.data);
});

async function onFetchJPH(data)
{
    const users = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
    const posts = (await (await fetch('https://jsonplaceholder.typicode.com/posts')).json())
        .map(post =>
        {
            post.user = users.find(user => user.id === post.userId);
            delete post.userId;
            return post;
        });

    console.log(posts);

    const postTemplate = post => `
        <div class="post" id="${post.id}">
            <h1>${post.title}</h1>
            <p>${post.body}</p>
            <small>${post.user.username}</small>
        </div>
    `;

    const template = `
        <div class="posts">
            ${posts?.map?.(postTemplate)?.join?.('')}
        </div>
    `;

    self.postMessage({
        message: 'doneFetching',
        template
    });
}